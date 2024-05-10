import { ImageResponse } from "next/og";
import "../globals.scss";
export const runtime = "experimental-edge";

const getApocLC = async () => {
  const response = await fetch(
    new URL(
      "../../public/fonts/ApocLC/ApocLC-Regular-Desktop.otf",
      import.meta.url
    )
  );
  const interSemiBold = await response.arrayBuffer();

  return interSemiBold;
};
// ...

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const precent = searchParams.get("precent1");
  const precent2 = searchParams.get("precent2");
  const frame = {
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundSize: "contain",
    backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST}/result.png)`,
    width: "100%",
    height: "100%",
    paddingTop: "150px",
  };

  return new ImageResponse(
    (
      //@ts-ignore
      <div style={frame}>
        <div
          style={{
            position: "absolute",
            top: "248px",
            left: "330px",
            display:'flex',
            alignItems:'center',
            fontFamily: "ApocLC",
            fontSize: "55px",
            color: "white",
          }}
        >
          {precent}%
        </div>
        <div
          style={{
            fontFamily: "ApocLC",
            position: "absolute",
            display:'flex',
            alignItems:'center',
            top: "335px",
            left: "330px",
            fontSize: "55px",
            color: "white",
          }}
        >
          {precent2}%
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "ApocLC",
          data: await getApocLC(),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
