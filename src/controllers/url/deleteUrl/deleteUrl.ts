import { Request, Response } from "express";
import ShortenedURLs from "../../../models/ShortenedURL";

export async function deleteUrlHandle(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = res.locals.user.id;
    const urlId = req.params.id;

    const hasUrl = await ShortenedURLs.findByPk(urlId);
    if (hasUrl) {
      if (
        hasUrl.dataValues.excludeAt !== null ||
        hasUrl.dataValues.userId != userId
      ) {
        res.status(404).send("Url not found or this url is not yours");
        return;
      }
      const date = new Date();
      await hasUrl.update({
        excludeAt: date.getTime(),
        updatedAt: date.getTime(),
      });
      res.status(200).send("Url deleted");
      return;
    } else {
      res.status(404).send("Url not found");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
