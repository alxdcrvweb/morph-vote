import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  getFrameMessage,
} from "frames.js";
import { NextRequest } from "next/server";
import { getAvailableVotes, getResults, vote } from "../lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let message = await getFrameMessage(body);
  let num = await getAvailableVotes(message.requesterFid);
  let button = message?.buttonIndex || body.untrustedData.buttonIndex;
  if (button == 1) {
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
    } else if (num == 0) {
      const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/sorry.png`;
      const frame: Frame = {
        image: imageUrl,
        version: "vNext",
        buttons: [
          {
            // target: 'https://opensea.io/collection/morpheus-pfp',
            target: "https://opensea.io/collection",
            action: "link",
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
  } else {
    let results = await getResults();
    let total =
      (results["1"] ? results["1"] : 0) + (results["2"] ? results["2"] : 0);
    let res1 = results["1"] ? Math.round((results["1"] / total) * 100) : 0;
    let res2 = results["2"] ? Math.round((results["2"] / total) * 100) : 0;
    const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/og?precent1=${String(
      res1
    )}&precent2=${String(res2)}`;
    console.log(results);
    const frame: Frame = {
      image: imageUrl,
      buttons: [
        {
          action: "post",
          label: "VOTE",
        },
      ],
      version: "vNext",
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/vote`,
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
