import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  getFrameMessage,
} from "frames.js";
import { NextRequest } from "next/server";
import { getResults, getUsersTokensFromIndexer } from "../lib/db";

export async function POST(request: NextRequest) {
  //приходит чет типа {0:14, 1:88, 2:228}, где 0...2 -- за шо голосовали и 14...228 -- сколько проголосовали
  //сам распихивай и парсь как надо
  let results = await getResults();
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/123.jpg`;
  const frame: Frame = {
    image: imageUrl,
    version: "vNext",
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/points`,
  };
  const html = getFrameHtml(frame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
