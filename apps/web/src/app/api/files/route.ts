import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  console.log("\n\nXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log("BODY DATA", data, data.get("file"));
  console.log("XXXXXXXXXXXXXXXXXXXXXXXX\n\n");

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  try {
    const file = data.get("file");

    if (!file) {
      // handle the case where file is null
      return Response.json({
        success: false,
        error: "No file provided",
      });
    }

    const uploadData = await pinata.upload.file(file as File);
    console.log("\n\nXXXXXXXXXXXXXuploadData", uploadData);
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
