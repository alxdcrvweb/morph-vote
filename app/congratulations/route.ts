// handle frame actions
// ./app/frames/route.ts

import {
  getFrameHtml,
  Frame
} from "frames.js";
import { NextRequest } from "next/server";
import axios from "axios";
export async function POST(request: NextRequest) {
  const body = await request.json();
  // let { isValid, message } = await validateFrameMessage(body);
  await axios.get(`${process.env.BACKEND_HOST}/api/frame/get?fid=${body.untrustedData.fid}`);
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/lorrety 2 final.png`;
  const frame: Frame = {
    image: imageUrl,
    version: "vNext",
    // buttons: [
    //   {
    //     label: "123eqwda",
    //     action: "link",
    //     target: `${process.env.BOT_ADDRESS}?start=conv_${res.data.doc._id}`,
    //   },
    // ],
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/`,
  };
  
  const html = getFrameHtml(frame);
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
// Use the frame message to build the frame
