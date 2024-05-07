import { Frame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";
// Declare the frame
const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/first.png`;
const initialFrame: Frame = {
  image: imageUrl,
  version: "vNext",
  buttons: [
    {
      label: "ENTER PRESALE LOTTERY",
      action: "post",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/congratulations`,
  imageAspectRatio: "1.91:1"
};

export const metadata: Metadata = {
  title: "Onchain lottery thing",
  description: "Presale lottery",
  openGraph: {
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  //@ts-ignore
  other: getFrameFlattened(initialFrame),
};
export default async function Home() {
  return <div>Onchain lottery thing</div>;
}
