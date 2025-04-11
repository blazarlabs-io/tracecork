import { adminAuth, initAdmin } from "@/lib/firebase/admin";
import admin from "firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // await initAdmin();
    // const adminAuth = admin.auth();

    const authHeader = request.headers.get("Authorization");
    // console.log("\n\n==============================");
    // console.log("authHeader", authHeader);
    // console.log("==============================\n\n");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ undefined }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    const decodedData = await adminAuth.verifyIdToken(token || "");

    return NextResponse.json({ token, decodedData }); // You can verify it here
  } catch (error) {
    console.error(error);
    return NextResponse.json({ undefined }, { status: 401 });
  }
}
