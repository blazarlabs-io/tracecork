import maestroClient from "~/src/lib/maestro/client";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    return Response.json({
      success: false,
    });
  }
  const res = await maestroClient.transactions.txInfo(data.txHash);

  console.log("RES", res);

  try {
  } catch (error) {
    console.error(error);
  }

  return Response.json({
    success: true,
    data: res,
  });
}
