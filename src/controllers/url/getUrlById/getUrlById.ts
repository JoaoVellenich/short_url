import { Request, Response } from "express";
import ShortenedURLs from "../../../models/ShortenedURL";

export async function getUrlById(req: Request, res: Response): Promise<void> {
  try {
    const urlId = req.params.id;
    const hasUrl = await ShortenedURLs.findByPk(urlId);
    if (hasUrl && hasUrl.dataValues.excludeAt === null) {
      res.status(200).send({
        shortenedUrl: hasUrl.dataValues.shortenedUrl,
        originalUrl: hasUrl.dataValues.originalUrl,
        clickCount: hasUrl.dataValues.clickCount,
      });
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
