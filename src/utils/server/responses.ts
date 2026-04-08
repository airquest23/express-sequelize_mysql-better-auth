import { Response } from "express";
import { statusCodes as sc } from "./status-codes";

export function returnPage(res: Response, layout: string, body: string, model: object = {}) {
  return res
    .status(sc["200-OK"].code)
    .render(layout, {
      body: body,
      model: model
    });
};

export function returnRedirect(
  res: Response, page: string, code: number = sc["401-Unauthorized"].code
) {
  return res
    .status(code)
    .redirect(page);
};

export function returnJson(
  res: Response, object: object, code: number = sc["200-OK"].code
) {
  return res
    .status(code)
    .json(object);
};