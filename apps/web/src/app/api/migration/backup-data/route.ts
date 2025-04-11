// import { initAdmin } from "@/lib/firebase/admin";
// import * as admin from "firebase-admin";
// import { getCollectionNestedDataService } from "@/services/db/db-migration-services";

// import { writeLocalFile } from "@/utils/files";

export async function POST(request: Request) {
  return Response.json({
    success: true,
  });
  // await initAdmin();

  // const wineries = await getCollectionNestedDataService("wineries");

  // await writeLocalFile(wineries, "wineries-backup");

  // return Response.json({
  //   success: true,
  //   data: wineries,
  // });
}
