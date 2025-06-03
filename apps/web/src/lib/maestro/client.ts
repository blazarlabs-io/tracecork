import {
  Configuration,
  MaestroClient,
  MaestroSupportedNetworks,
} from "@maestro-org/typescript-sdk";

const maestroClient = new MaestroClient(
  new Configuration({
    apiKey: process.env.NEXT_PUBLIC_MAESTRO_API_KEY as string,
    network: process.env
      .NEXT_PUBLIC_MAESTRO_NETWORK as MaestroSupportedNetworks,
  }),
);

export default maestroClient;

// import { MaestroProvider } from "@meshsdk/core";

// export const maestroProvider = new MaestroProvider({
//   network: 'Preprod', // Mainnet / Preprod / Preview
//   apiKey: '<Your-API-Key>', // Get key at https://docs.gomaestro.org/
//   turboSubmit: false // Read about paid turbo transaction submission feature at https://docs.gomaestro.org
// });
