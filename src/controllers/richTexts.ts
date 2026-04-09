import { z } from "zod";
import { RichText } from "../database/models/RichText";
import { User } from "better-auth/types";
import { ErrorServer } from "../utils/server/errors";
import { isString } from "../utils/utils";
import { statusCodes as sc } from "../utils/server/status-codes";
import { errors } from "../ressources/errors";

const richTextSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.object({
    ops: z.array(z.object({
      insert: z.string()
    })),
  }),
  userId: z.string(),
});

const richTextsSchema = z.array(richTextSchema);
type RichTextsType = z.infer<typeof richTextsSchema>;

export async function getTextByPk(id: string, language: number, user: User) {
  try {
    if (!id || !isString(id)) {
      throw new ErrorServer(
        errors['errorIdUuid'][language],
        sc["400-Bad-Request"].code
      );
    };

    const text = await RichText.findByPk(id/*, { raw: true }*/);

    if (!text) {
      throw new ErrorServer(
        errors['errorObjectNotFound'][language],
        sc["404-Not-Found"].code
      );
    };

    const plainText = text.get({ plain: true });

    if (!plainText) {
      throw new ErrorServer(
        errors['errorObjectNotFound'][language],
        sc["404-Not-Found"].code
      );
    };

    if (plainText.userId !== user.id) {
      throw new ErrorServer(
        errors['errorGetNoRight'][language],
        sc["401-Unauthorized"].code
      );
    };

    return plainText;
  } catch(e) {
    throw(e);
  };
};

export function getArrayItems(items: string, language: number): RichTextsType {
  try {
    const array = JSON.parse(items);

    if (!Array.isArray(array)) {
      throw new ErrorServer(
        errors['errorItemsNotArray'][language],
        sc["400-Bad-Request"].code
      );
    };
    
    const parsedRichTexts = richTextsSchema.parse(array);
    
    return parsedRichTexts;
  } catch(e) {
    throw(e);
  };
};