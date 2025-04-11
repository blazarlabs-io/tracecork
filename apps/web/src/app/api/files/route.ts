import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinata/client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  if (!data) {
    return Response.json({
      success: false,
    });
  }

  const file: File | null = data.get("file") as unknown as File;
  console.log("\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log(file);
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n\n");

  try {
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
