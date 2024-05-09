import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  getFrameMessage,
} from "frames.js";
import { NextRequest } from "next/server";
import { getAvailableVotes, vote } from "../lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let message = await getFrameMessage(body);

  let num = await getAvailableVotes(message.requesterFid);
  if (num > 0) {
    const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/first.png`;
    const frame: Frame = {
      image: imageUrl,
      version: "vNext",
      buttons: [
        {
          action: "post",
          label: "Yes",
        },
        {
          action: "post",
          label: "No",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/ready`,
    };
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } else if(num == 0) {
    const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/sorry.png`;
    const frame: Frame = {
      image: imageUrl,
      version: "vNext",
      buttons: [
        {
          // target: 'https://opensea.io/collection/morpheus-pfp',
          target: 'https://opensea.io/collection',
          action: 'link',
          label: "BUY",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/ready`,
    };
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }
}
