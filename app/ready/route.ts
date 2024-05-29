import { getFrameHtml, Frame, getFrameMessage } from "frames.js";
import { NextRequest } from "next/server";
import { vote } from "../lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  let message = await getFrameMessage(body);
  let button = message?.buttonIndex || body.untrustedData.buttonIndex;
  let success = await vote(message.requesterFid, button);
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/thanks.png`
    const frame: Frame = {
      image: imageUrl,
      version: "vNext",
      buttons: [
        {
          action: "post",
          label: "Results",
        }
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/results`,
    };
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
}
