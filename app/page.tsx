import { Frame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";

// Declare the frame
const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/first.png`;
const initialFrame: Frame = {
  image: imageUrl,
  version: "vNext",
  buttons: [
    {
      action: "post",
      label: "Vote",
    },
    {
      action: "post",
      label: "Results",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/vote`,
};


export const metadata: Metadata = {
  title: "Morph voting",
  description: "Morph voting",
  openGraph: {
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  other: getFrameFlattened(initialFrame),
};
export default async function Home() {
  return <div>VOTE</div>;
}
