import { getFrameHtml, Frame } from "frames.js";
import { NextRequest } from "next/server";
import { getResults } from "../lib/db";

export async function POST(request: NextRequest) {
  let results = await getResults();
  let total = results[1] + results[2];
  let res1 = (total / results[1]).toFixed(0);
  let res2 = results[2] !== 0 ? (total / results[2]).toFixed(0) : 0;
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/og?precent1=${JSON.stringify(
    results
  )}&precent2=${String(res2)}`;

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
