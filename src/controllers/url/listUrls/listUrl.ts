import { Request, Response } from "express";
import ShortenedURLs from "../../../models/ShortenedURL";
import { IShortenedUrl } from "../../../types/ShortenedURLs";

export async function listUrlHandle(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const urls = await ShortenedURLs.findAll({ where: { userId: userId } });
    const responseObj: IShortenedUrl[] = [];

    if (!urls) {
      res.status(200).send("No Url found for this user");
      return;
    }
    await Promise.all(
      urls.map((url) => {
        responseObj.push(url.dataValues as IShortenedUrl);
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
