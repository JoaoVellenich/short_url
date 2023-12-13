import { Request, Response } from "express";
import { shortedUrlSchema } from "../../../validations/urlJoi";
import ShortenedURLs from "../../../models/ShortenedURL";

export async function getShortedHandle(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const shortedUrl = req.params.urlShorted;

    const { value, error } = shortedUrlSchema.validate(shortedUrl);

    if (error) {
      res.status(400).send({ message: "Url shorted ir not in correct form" });
      return;
    }

    const hasUrl = await ShortenedURLs.findOne({
      where: { shortenedUrl: value },
    });

    if (hasUrl && hasUrl.dataValues.excludeAt === null) {
      const url = hasUrl.dataValues.originalUrl;
      const count = hasUrl.dataValues.clickCount + 1;
      const date = new Date();

      await hasUrl.update({ clickCount: count, updatedAt: date.getTime() });
      res.status(200).redirect(url);
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
