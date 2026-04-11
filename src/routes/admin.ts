import { Router, Request, Response } from "express";
import z from "zod";
import { AdminMessage } from "../database/models/AdminMessage";
import { ErrorServer, handleError } from "../utils/server/errors";
import { escapeHTML, parseDBObject } from "../utils/utils";
import { returnJson, returnPage } from "../utils/server/responses";
import { statusCodes as sc } from '../utils/server/status-codes';
import { errors } from "../ressources/errors";

const adminMessageSchema = z.object({
  id: z.string(),
  from: z.email(),
  message: z.string().nullable(),
});

const adminMessagesSchema = z.array(adminMessageSchema);

/////////////////////////////////////
// Texts pages / API
const adminRouter = Router();

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// GET all messages page
adminRouter.get("/", async (req: Request, res: Response) => {
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

    const messages = await AdminMessage.findAll({
      raw: true,
    });

    let lastLine: number = 100;
    
    if (messages.length < limit) {
      lastLine = z.number().min(0).parse(messages.length);
    };
    
    return returnPage(res, 'layout_dashboard', 'admin/messages_list',
    {
      props: {
        currentPage: 'texts',
      },
      model: {
        items: parseDBObject(messages) || "",
        limit: limit,
        page: page,
        lastLine: lastLine,
        count: messages.length,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// DELETE delete one text API
adminRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = escapeHTML(z.string().nonempty().parse(req.params.id));
    const deletion = await AdminMessage.destroy({ where: { id: id } });
    return returnJson(res, {}, sc["205-Reset-Content"].code);
  } catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// POST bulk delete texts API
adminRouter.post("/bulk-delete", async (req: Request, res: Response) => {
  try {
    const body = z.object({
      items: z.string()
    }).parse(req.body);

    const array = JSON.parse(body.items);

    if (!Array.isArray(array)) {
      throw new ErrorServer(
        errors['errorItemsNotArray'][res.locals.language],
        sc["400-Bad-Request"].code
      );
    };
    
    const parsed = adminMessagesSchema.parse(array);

    const toDelete: string[] = [];
    
    for (let i = 0; i < parsed.length; i++) {
      toDelete.push(parsed[i].id);
    };

    const deletion = await AdminMessage.destroy({ where: { id: toDelete } });
    
    return returnJson(res, {}, sc["205-Reset-Content"].code);
  } catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
export default adminRouter;