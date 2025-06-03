import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  // console.log("\n\nXXXXXXXXXXXXXXXXXXXXXXXX");
  // console.log("BODY DATA", data, data.get("file"), data.get("base64Data"));
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXX\n\n");

  // const uri = await getImageBase64(data.get("file") as File);

  // console.log("\nuri", uri);

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  try {
    const file = data.get("file");
    // const base64Data = data.get("base64Data");

    if (!file) {
      // handle the case where file is null
      return Response.json({
        success: false,
        error: "No file provided",
      });
    }

    // const uploadData = await pinata.upload.file(file as File);
    const uploadData = await fetch(
      `${process.env.NEXT_PUBLIC_TOKENIZATION_API_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.NEXT_PUBLIC_TOKENIZATION_USERNAME +
                ":" +
                process.env.NEXT_PUBLIC_TOKENIZATION_PASSWORD,
            ),
        },
        body: JSON.stringify(file),
      },
    );

    // console.log("RES FROM PINATA", await uploadData.json());

    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e as any);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
