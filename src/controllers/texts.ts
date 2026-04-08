import { z } from "zod";
import { Text } from "../database/models/Text";
import { User } from "better-auth/types";
import { ErrorServer } from "../utils/server/errors";
import { isString } from "../utils/utils";
import { statusCodes as sc } from "../utils/server/status-codes";
import { errors } from "../ressources/errors";

const textSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string().nullable(),
  userId: z.string(),
});

const textsSchema = z.array(textSchema);
type TextsType = z.infer<typeof textsSchema>;

export async function getTextByPk(id: string, language: number, user: User) {
  try {
    if (!id || !isString(id)) {
      throw new ErrorServer(
        errors['errorIdUuid'][language],
        sc["400-Bad-Request"].code
      );
    };

    const text = await Text.findByPk(id, { raw: true });
    
    if (!text) {
      throw new ErrorServer(
        errors['errorObjectNotFound'][language],
        sc["404-Not-Found"].code
      );
    };

    if (text.userId !== user.id) {
      throw new ErrorServer(
        errors['errorGetNoRight'][language],
        sc["401-Unauthorized"].code
      );
    };

    return text;
  } catch(e) {
    throw(e);
  };
};

export function getArrayItems(items: string, language: number): TextsType {
  try {
    const array = JSON.parse(items);

    if (!Array.isArray(array)) {
      throw new ErrorServer(
        errors['errorItemsNotArray'][language],
        sc["400-Bad-Request"].code
      );
    };
    
    const parsedTexts = textsSchema.parse(array);
    
    return parsedTexts;
  } catch(e) {
    throw(e);
  };
};