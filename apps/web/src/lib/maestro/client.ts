import { MaestroClient, Configuration } from "@maestro-org/typescript-sdk";

const maestroClient = new MaestroClient(
  new Configuration({
    apiKey: process.env.NEXT_PUBLIC_MAESTRO_API_KEY as string,
    network: "Preprod",
  }),
);

export default maestroClient;
