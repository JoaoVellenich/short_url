import { Request, Response } from "express";
import ShortenedURLs from "../../../models/ShortenedURL";
import crypto from "crypto";

export async function shortUrlHandle(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const url = req.body.url as string;

    const hasUrlShorted = await ShortenedURLs.findOne({
      where: { originalUrl: url },
    });

    if (hasUrlShorted && hasUrlShorted.dataValues.excludeAt == null) {
      const shortedUrl = hasUrlShorted.dataValues.shortenedUrl;
      const urlId = hasUrlShorted.dataValues.id;
      res.status(200).send({
        shortedUrl,
        id: urlId,
      });
      return;
    }
    const code = crypto.randomBytes(3).toString("hex");
    const shortedUrl = `http://localhost:8080/${code}`;

    const date = new Date();

    const newUrl = await ShortenedURLs.create({
      originalUrl: url,
      shortenedUrl: code,
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
      userId: res.locals.user ? res.locals.user.id : null,
    });

    res.status(200).send({
      shortedUrl,
      id: newUrl.dataValues.id,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
