export async function GET(request: Request) {
  const storageRes = await fetch(
    `${process.env.NEXT_PUBLIC_STORAGE_SENSORS_ENDPOINT as string}/today` as string,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const storageData = await storageRes.json();

  try {
  } catch (error) {
    console.error(error);
  }

  return Response.json({
    success: true,
    data: storageData,
  });
}
