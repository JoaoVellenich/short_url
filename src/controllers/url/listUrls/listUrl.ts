import { Request, Response } from "express";
import ShortenedURLs from "../../../models/ShortenedURL";
import { IShortenedUrl } from "../../../types/ShortenedURLs";

export async function listUrlHandle(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const urls = await ShortenedURLs.findAll({ where: { userId: userId } });
    const responseObj: IShortenedUrl[] = [];

    if (urls.length == 0) {
      res.status(200).send("No Url found for this user");
      return;
    }
    await Promise.all(
      urls.map((url) => {
        if (url.dataValues.excludeAt !== null) {
          return;
        }
        responseObj.push({
          id: url.dataValues.id as number,
          clickCount: url.dataValues.clickCount as number,
          originalUrl: url.dataValues.originalUrl as string,
          shortenedUrl: `http://localhost:8080/${url.dataValues.shortenedUrl}`,
        });
      })
    );
    res.status(200).send({ urls: responseObj });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
