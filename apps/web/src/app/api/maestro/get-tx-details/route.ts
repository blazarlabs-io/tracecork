import maestroClient from "~/src/lib/maestro/client";
import tk from "~/src/services/logger";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    return Response.json({
      success: false,
    });
  }
  const res = await maestroClient.transactions.txInfo(data.txHash);
  // console.log(data.txHash);
  // tk;
  // const _res = await fetch(
  //   `${process.env.NEXT_PUBLIC_MAESTRO_BASE_URL as string}/transactions/${data.txHash}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "api-key": process.env.NEXT_PUBLIC_MAESTRO_API_KEY as string,
  //     },
  //   },
  // );

  tk.log("RES", res);

  try {
  } catch (error) {
    tk.error("Error getting transaction details.", error);
  }

  return Response.json({
    success: true,
    data: res,
  });
}
