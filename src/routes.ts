import { Request, Response } from "express";
import { OnwardsType } from "./types";

import { buildArticleUrl, getOnwards } from "./onwards/onwards";

export const onwardsRoute = async (req: Request, res: Response) => {
  try {
    // Call CAPI to get the config data for this article
    let url = new URL(buildArticleUrl("onwards", req.path));

    let onwards: OnwardsType[] = await getOnwards(url);

    res.status(200).send(onwards);
  } catch (error) {
    console.error(error);
  }
};
