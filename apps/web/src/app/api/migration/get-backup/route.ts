// import fs from "fs";
// import path from "path";

export async function GET(request: Request) {
  return Response.json({
    success: true,
  });
  // const filePath = path.join(process.cwd(), "public", "wineries-backup.json");
  // const jsonData = fs.readFileSync(filePath, "utf-8");
  // const data = JSON.parse(jsonData);

  // return Response.json({
  //   success: true,
  //   length: Array.isArray(data) ? data.length : 0,
  //   data: data,
  // });
}
