import { getFrameHtml, Frame } from "frames.js";
import { NextRequest } from "next/server";
import { getResults } from "../lib/db";

export async function POST(request: NextRequest) {
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
