import { Router, Request, Response } from 'express';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
//import { DefaultEventsMap, Socket } from 'socket.io';

import { RichText } from '../database/models/RichText';
import { getArrayItems, getTextByPk } from '../controllers/richTexts';
import { statusCodes as sc } from '../utils/server/status-codes';
import { ErrorServer, handleError } from '../utils/server/errors';
import { escapeHTML, isString, parseDBObject } from '../utils/utils';
import { returnJson, returnPage/*, returnRedirect*/ } from '../utils/server/responses';
//import { errors } from '../ressources/errors';
import logger from '../utils/logger';

/*const documentCache = new Map<string, any>();

setInterval(async () => {
  for (const [id, data] of documentCache.entries()) {
    try {
      const update = await RichText.upsert({
        id: id,
        userId: data.userId,
        content: data.content,
      });

      documentCache.delete(id);

      console.log(`Auto-saved document ${id} to DB`);
    } catch (e) {
      logger.error("Interval save failed", e);
    };
  };
}, 10000);*/

const documentCache = new Map<string, any>();

setInterval(async () => {
  for (const [id, data] of documentCache.entries()) {
    try {
      if (!id || !isString(id)) {
        throw new Error("Id not valid");
      };

      const text = await RichText.findByPk(id/*, { raw: true }*/);

      if (!text) {
        throw new Error("Text not found");
      };

      const plainText = text.get({ plain: true });

      if (!plainText) {
        throw new Error("Text not found");
      };

      if (plainText.userId !== data.userId) {
        throw new Error("User not allowed to edit this text");
      };

      const update = await RichText.update({
        content: data.content
      }, {
        where: { id: id }
      });

      documentCache.delete(id);
      
      console.log(`Auto-saved document ${id} to DB`);
    } catch (e) {
      logger.error("Interval save failed", e);
    };
  };
}, 10000);

/////////////////////////////////////
// Set socket
/*export const setRichTextsSocket = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  //2. Get the document from server (and emit)
  socket.on('get-document', async (documentId) => {
    try {
      const id = escapeHTML(z.string().nonempty().parse(documentId));
      
      if (!id || !isString(id)) {
        throw new ErrorServer(
          errors['errorIdUuid'][socket.data.language],
          sc["400-Bad-Request"].code
        );
      };

      const text = await RichText.findByPk(id
        //, { raw: true }
      );
      
      const plainText = text?.get({ plain: true });

      if (plainText && plainText.userId !== socket.data.user.id) {
        throw new ErrorServer(
          errors['errorGetNoRight'][socket.data.language],
          sc["401-Unauthorized"].code
        );
      };

      //3. Join the room
      socket.join(id);

      //4. Emit the loaded document (or empty)
      socket.emit('load-document', plainText?.content || null);

      //7. Save document (receive input)
      socket.on('save-document', async (data, callback) => {
        try {
          const body = z.object({
            content: z.json(),
          }).parse({
            content: data.content,
          });

          documentCache.set(id, {
            content: body.content,
            userId: socket.data.user.id,
            lastUpdated: Date.now(),
          });

          if (callback) callback({ status: "ok" });
        } catch(e) {
          if (callback) callback({ status: "error" });
        };
      });
    } catch(e) {
      logger.error(e);
      throw e;
    };
  });
};*/

/////////////////////////////////////
// Texts pages / API
const richTextsRouter = Router();

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// GET all texts page
richTextsRouter.get('/', async (req: Request, res: Response) => {
  try {
    let limit: number = 100;

    if (req.query.limit) {
      const limitQuery = escapeHTML(z.string().nonempty().parse(req.query.limit));
      const limitNumber = z.number().min(1).parse(parseInt(limitQuery));
      limit = limitNumber;
    };
    
    let page: number = 1;

    if (req.query.page) {
      const pageQuery = escapeHTML(z.string().nonempty().parse(req.query.page));
      const pageNumber = z.number().min(1).parse(parseInt(pageQuery));
      page = pageNumber;
    };

    const texts = await RichText.findAll({
      where: { userId: res.locals.user.id },
      //raw: true,
    });

    const plainTexts = texts.map(t => t.get({ plain: true }));

    /*const fixedTexts = texts.map(text => ({
      ...text,
      content: typeof text.content === 'string' ? JSON.parse(text.content) : text.content
    }));*/

    let lastLine: number = 100;
    
    if (plainTexts.length < limit) {
      lastLine = z.number().min(0).parse(plainTexts.length);
    };

    return returnPage(res, 'layout_dashboard', 'richTexts/rich_texts_list',
    {
      props: {
        currentPage: 'rich_texts',
      },
      model: {
        items: parseDBObject(plainTexts) || "",
        limit: limit,
        page: page,
        lastLine: lastLine,
        count: plainTexts.length,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// GET new text (form) page
richTextsRouter.get('/new', (req: Request, res: Response) => {
  try {
    //const id = uuidv4();
    //return returnRedirect(res, '/rich-texts/edit/' + id);
    return returnPage(res, 'layout_dashboard', 'richTexts/rich_texts_add',
    {
      currentPage : 'rich_texts',
      isEdit: false,
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// GET edit text (form) page
richTextsRouter.get('/edit/:id', async (req: Request, res: Response) => {
  try {
    const id = escapeHTML(z.string().nonempty().parse(req.params.id));

    /*return returnPage(res, 'layout_dashboard', 'richTexts/rich_texts_edit_socket',
    {
      currentPage: 'rich_texts',
      isEdit: true,
    });*/

    const text = await getTextByPk(id, res.locals.language, res.locals.user);

    return returnPage(res, 'layout_dashboard', 'richTexts/rich_texts_edit',
    {
      props: {
        currentPage: 'rich_texts',
        isEdit: true,
      },
      model: {
        id: text?.id || "",
        content: parseDBObject(text?.content) || "",
      },
    });
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// POST insert new text API
richTextsRouter.post("/insert", async (req: Request, res: Response) => {
  try {
    const body = z.object({
      content: z.json()
    }).parse(req.body);

    const updBody = {
      ...body,
      id: uuidv4(),
      userId: res.locals.user.id,
    };

    const insert = await RichText.upsert(updBody);
    
    if (Array.isArray(insert) && insert[0] && insert[0].dataValues?.id)
      return returnJson(res, {
        id: insert[0].dataValues.id
      }, sc["201-Created"].code);

    else
      throw new ErrorServer(
        sc["417-Expectation-Failed"].message + '.\n' +
        sc["417-Expectation-Failed"].description,
        sc["417-Expectation-Failed"].code
      );
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// PUT update one text API
richTextsRouter.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const id = escapeHTML(z.string().nonempty().parse(req.params.id));

    const body = z.object({
      content: z.json()
    }).parse(req.body);

    const text = await getTextByPk(id, res.locals.language, res.locals.user);
    const update = await RichText.update(body, { where: { id: id } });

    return returnJson(res, {}, sc["202-Accepted"].code);
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// PUT auto-save one text API
richTextsRouter.put("/auto-save/:id", async (req: Request, res: Response) => {
  try {
    const id = escapeHTML(z.string().nonempty().parse(req.params.id));

    const body = z.object({
      content: z.json()
    }).parse(req.body);

    documentCache.set(id, {
      content: body.content,
      userId: res.locals.user.id,
      lastUpdated: Date.now(),
    });

    return returnJson(res, {}, sc["202-Accepted"].code);
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// DELETE delete one text API
richTextsRouter.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const id = escapeHTML(z.string().nonempty().parse(req.params.id));
    const text = await getTextByPk(id, res.locals.language, res.locals.user);
    const deletion = await RichText.destroy({ where: { id: id } });
    return returnJson(res, {}, sc['205-Reset-Content'].code);
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// POST bulk delete texts API
richTextsRouter.post('/bulk-delete', async (req: Request, res: Response) => {
  try {
    const body = z.object({
      items: z.string()
    }).parse(req.body);

    const texts = getArrayItems(body.items, res.locals.language);

    const toDelete: string[] = [];

    for (let i = 0; i < texts.length; i++) {
      const checked = await getTextByPk(texts[i].id, res.locals.language, res.locals.user);
      if (checked) toDelete.push(checked.id);
    };

    const deletion = await RichText.destroy({ where: { id: toDelete } });
    
    return returnJson(res, {}, sc['205-Reset-Content'].code);
  } catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
export default richTextsRouter;