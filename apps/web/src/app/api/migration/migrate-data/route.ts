// import { initAdmin } from "@/lib/firebase/admin";
// import * as admin from "firebase-admin";
// import { DocumentData } from "firebase/firestore";
// import fs from "fs";
// import path from "path";
// import { WineryDbBackup } from "@/types/winery-db-migration";
// import {
//   getTargetDateToMigrate,
//   setTargetKeys,
// } from "@/services/db/db.migration-utils-services";
// import {
//   getRawMaterialsServie,
//   getSweetnessServie,
//   getWineTypesServie,
// } from "@/services/db/system-variables-services";
// import { getApplyDataService } from "@/services/db/db-migration-services";

export async function POST(request: Request) {
  return Response.json({
    success: true,
  });
  // await initAdmin();

  // const filePath = path.join(process.cwd(), "public", "wineries-backup.json");
  // const jsonData = fs.readFileSync(filePath, "utf-8");
  // const data = JSON.parse(jsonData) as WineryDbBackup[];

  // if (!Array.isArray(data))
  //   return Response.json({
  //     success: false,
  //     data: [],
  //   });

  // const responseData = getTargetDateToMigrate(data);

  // const wineTypes = await getWineTypesServie();
  // const rawMaterials = await getRawMaterialsServie();
  // const sweetness = await getSweetnessServie();

  // if (!wineTypes || !rawMaterials || !sweetness || responseData.length === 0)
  //   return Response.json({
  //     success: false,
  //     data: [],
  //   });

  // // Perform migration

  // setTargetKeys(responseData, wineTypes, rawMaterials, sweetness);

  // // await getApplyDataService(responseData);

  // return Response.json({
  //   success: true,
  //   data: responseData,
  // });
}
