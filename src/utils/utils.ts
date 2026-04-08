export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export function isString(value: any) {
  return typeof value === "string";
};

export function isBoolean(value: any) {
  return typeof value === "boolean";
};

export function escapeHTML(str: string) {
  if (typeof str !== 'string') return str;
  const chars: { [key: string]: string } = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  } as const;
  return str.replace(/[&<>"']/g, m => chars[m]);
};

export function parseDBObject(value: any) {
  if (!value) return "";
  else if (isString(value)) return value;
  else if (isBoolean(value)) return value.toString();
  else if (isObject(value) || Array.isArray(value)) return JSON.stringify(value);
  else return "";
};

/*export function toJSONObject(str: string) {
  try {
    let jsonStr = str.trim();
    jsonStr = jsonStr.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
    jsonStr = jsonStr.replace(/'([^']*)'/g, (_, val) => `"${val.replace(/"/g, '\\"')}"`);
    return JSON.parse(jsonStr);
  } catch (e) {
    if (e instanceof Error)
      console.error("Invalid object string: ", e.message);
    else
      console.error("Invalid object string: ", "Unknown error");
    return null;
  };
};*/