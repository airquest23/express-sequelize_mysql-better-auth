import fs from 'fs';
import path from 'path';
import logger from '../logger';
import { escapeHTML, isObject, isString } from '../utils';
import { ressources } from '../../ressources/languages';

const templateCache = new Map();
const isProd = process.env.NODE_ENV === 'production';

////////////////////////////////////////////
export function parseTemplate(filePath: string, options: any, m: any = {}) {
  console.log(templateCache);

  const props = m.props ? m.props : m;
  const model = m.model ? m.model : null;

  const language = options.language;
  const viewsDir = options.settings.views;

  //////////////////////
  // 1. Check cache first (production only)
  const cacheKey = `${path.basename(filePath).replace('.html', '')}:${options.body}:${language}`;
  
  if (isProd && templateCache.has(cacheKey))
    return templateCache.get(cacheKey)(model, escapeHTML);
  
  //////////////////////
  // 2. Recursive resolver
  const resolveStructure = (input: string, depth = 0): string => {
    if (depth > 15) return '';

    // A. Process partials (static HTML injection)
    let processed = input.replace(/(?<!\\)@{view\('(.*?)'\)}/g, (match, name) => {
      try {
        const partialPath = path.join(viewsDir, `${name.replace('~', '')}.html`);
        if (!fs.existsSync(partialPath)) {
          logger.warn(`[Parser] Partial not found at: ${partialPath}`);
          return ''; 
        };
        return resolveStructure(fs.readFileSync(partialPath, 'utf8'), depth + 1);
      } catch (e) {
        logger.error("[Parser] Partial resolution error:", e);
        return '';
      };
    });

    // B. Process components (in-place evaluation of sub-models)
    processed = processed.replace(/(?<!\\)@{component\(({.*?})\)}/gs, (match, rawObject) => {
      try {
        const innerModel = new Function('return ' + rawObject + ';')();
        if (!innerModel || !isObject(innerModel)) {
          logger.warn(`[Parser] Invalid component object: ${rawObject}`);
          return '';
        };

        if (!innerModel._path) {
          logger.warn(`[Parser] Missing '_path' prop in component: ${rawObject}`);
          return '';
        };
        const compPath = path.join(viewsDir, `${innerModel._path.replace('~', '')}.html`);
        if (!fs.existsSync(compPath)) {
          logger.warn(`[Parser] Component not found at: ${compPath}`);
          return '';
        };

        let component = fs.readFileSync(compPath, 'utf8');

        const iProps = innerModel.props ? innerModel.props : innerModel;
        const iModel = innerModel.model ? innerModel.model : null;

        component = component
          .replace(/\\(@{.*?})/g   , '___ESC_TAG___$1'     )
          .replace(/\\(@\(#.*?\))/g, '___ESC_LANG_TAG___$1')
          .replace(/(?<!\\)@{props\.(.*?)}/g, (_, key) => iProps[key] ?? "")
          .replace(/(?<!\\)model\.(\w+)/g, (match, key) => {
            const val = iModel[key];
            if (val && isString(val) && val.match(/(?<!\\)@{model\.(.*?)}/g))
              return iModel[key].replace('@{', '').replace('}', '');
            return match;
          });
        
        let compCode = "let out = [];\n" +
          "out.push(`" +
          component
            .replace(/(?<!\\)@{if\* (.*?)}/g                , "`);\n if ($1) { out.push(`")
            .replace(/(?<!\\)@{else if\* (.*?)}/g           , "`);\n } else if ($1) { out.push(`")
            .replace(/(?<!\\)@{else\*}/g                    , "`);\n } else { out.push(`")
            .replace(/(?<!\\)@{endif\*}/g                   , "`);\n }\n out.push(`")

            .replace(/(?<!\\)@{for each\* (.*?) in (.*?)}/g , "`);\n ($2 || []).forEach(($1) => { out.push(`")
            .replace(/(?<!\\)@{endfor\*}/g                  , "`);\n });\n out.push(`")
          + "`);\n return out.join('');";

        const compRender = new Function('props', compCode);

        component = compRender(iProps);
        component = component
          .replace(/(?<!\\)props\.(\w+)/g,
            (_, key) => iProps[key] ? isString(iProps[key]) ? "'" + iProps[key] + "'" : iProps[key] : null
          );
        
        return resolveStructure(component, depth + 1);
      } catch (e) {
        logger.error("[Parser] Component resolution error:", e);
        return '';
      };
    });

    return processed;
  };

  //////////////////////
  // 3. Load initial files
  const bodyPath = path.join(viewsDir, `${options.body}.html`);
  let layout     = fs.readFileSync(filePath, 'utf8');
  let body       = fs.readFileSync(bodyPath, 'utf8');
  let content    = layout.replace(/@{body}/g, body);

  //////////////////////
  // 4. Load initial files
  content = resolveStructure(content);
  //console.log(content);

  //////////////////////
  // 5. First clean-up
  content = content
    // Protect escaped tags
    .replace(/\\(@{.*?})/g   , '___ESC_TAG___$1'     )
    .replace(/\\(@\(#.*?\))/g, '___ESC_LANG_TAG___$1')

  //////////////////////
  // 6. Assets
    .replace(/(?<!\\)@{import\('(.*?)'\)}/g, (match, file) => {
      if (file.endsWith('.css')) return `<link rel="stylesheet" href="/css/${file}">`;
      if (file.endsWith('.js' )) return `<script src="/js/${file}"></script>`;
      return match;
    })
  
  //////////////////////
  // 7. Localization
    .replace(/(?<!\\)@\(#(.*?)\)/g, (_, key) => ressources[key]?.[language] || key)
  
  //////////////////////
  // 8. Constants (props)
    .replace(/(?<!\\)@{props\.(.*?)}/g, (_, key) => props[key] ?? "")
  
  //////////////////////
  // 9. Final clean-up
    // Escape backticks and ${} for the JS Function string
    .replace(/`/g  , '\\`' )
    .replace(/\${/g, '\\${')
    // Trim
    .replace(/\s+/g, ' ').trim();
  
  //////////////////////
  // 10. Optimize cache (don't cache constants)
  let preCode = "let out = [];\n" +
    "out.push(`" +
    content
      .replace(/(?<!\\)@{if\* (.*?)}/g                , "`);\n if ($1) { out.push(`")
      .replace(/(?<!\\)@{else if\* (.*?)}/g           , "`);\n } else if ($1) { out.push(`")
      .replace(/(?<!\\)@{else\*}/g                    , "`);\n } else { out.push(`")
      .replace(/(?<!\\)@{endif\*}/g                   , "`);\n }\n out.push(`")

      .replace(/(?<!\\)@{for each\* (.*?) in (.*?)}/g , "`);\n ($2 || []).forEach(($1) => { out.push(`")
      .replace(/(?<!\\)@{endfor\*}/g                  , "`);\n });\n out.push(`")
    + "`);\n return out.join('');";
  //console.log(preCode);
  const preRender = new Function('props', preCode);

  content = preRender(props);
  content = content
    .replace(/(?<!\\)props\.(\w+)/g,
      (_, key) => props[key] ? isString(props[key]) ? "'" + props[key] + "'" : props[key] : null
    );
  
  //////////////////////
  // 11. Variables & logic Blocks
  let code = "let out = [];\n" +
    "out.push(`" +
    content
      .replace(/`/g  , '\\`' )
      .replace(/\${/g, '\\${')
      
      .replace(/(?<!\\)@{model\.(.*?)}/g            , '${escapeHTML(model?.$1 ?? "")}')

      .replace(/(?<!\\)@{if (.*?)}/g                , "`);\n if ($1) { out.push(`")
      .replace(/(?<!\\)@{else if (.*?)}/g           , "`);\n } else if ($1) { out.push(`")
      .replace(/(?<!\\)@{else}/g                    , "`);\n } else { out.push(`")
      .replace(/(?<!\\)@{endif}/g                   , "`);\n }\n out.push(`")

      .replace(/(?<!\\)@{for each (.*?) in (.*?)}/g , "`);\n ($2 || []).forEach(($1) => { out.push(`")
      .replace(/(?<!\\)@{endfor}/g                  , "`);\n });\n out.push(`")
    + "`);\n return out.join('');";
  
  //////////////////////
  // 12. Restore escaped tags
  code = code
    .replace(/___ESC_TAG___/g     , '').replace(/\\@{/g  , '@{' )
    .replace(/___ESC_LANG_TAG___/g, '').replace(/\\@\(#/g, '@(#');
  //console.log(code);
  
  //////////////////////
  // 13. Finalize (try render)
  try {
    const render = new Function('model', 'escapeHTML', code);
    if (isProd) templateCache.set(cacheKey, render);
    return render(model, escapeHTML);
  } catch (e) {
    logger.error("[Parser] Template final compilation error:", e, code);
    throw e;
  };
};