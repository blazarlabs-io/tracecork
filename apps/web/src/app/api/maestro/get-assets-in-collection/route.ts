import maestroClient from "~/src/lib/maestro/client";

export async function POST(request: Request) {
  const { refId } = await request.json();

  if (!refId) {
    return Response.json({
      success: false,
    });
  }

  const policy = refId.split(".")[0];

  const res = await maestroClient.assets.policyInfo(policy);

  try {
  } catch (error) {
    // console.error("Error getting transaction details.", error);
  }

  return Response.json({
    success: true,
    data: res,
  });
}
