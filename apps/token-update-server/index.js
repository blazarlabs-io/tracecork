// fetchService.js
import fetch from "node-fetch";
import "dotenv/config";

const min = 60 * 1000;
const hour = 60 * min;
const INTERVAL_MS = hour;

const batchId =
  "34957659047139c2a282acc0b7c67871a5ef1bb67e4ad2787d2a1892.000643b0b5f5fb0069fc6b9e9b3cf440798e38a2621e3ef53bd3238f47fcf261";

const URL = `${process.env.TOKENIZATION_API_URL}/tx/true/update-batch/${batchId}`;

const fetchData = async () => {
  try {
    // GET TOKEN DATA
    const responseToken = await fetch(
      `${process.env.TOKENIZATION_API_URL}/wine/${batchId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              process.env.TOKENIZATION_USERNAME +
                ":" +
                process.env.TOKENIZATION_PASSWORD,
            ),
        },
      },
    );
    const dataToken = await responseToken.json();
    console.log(dataToken);

    // GET STORAGE DATA
    const responseStorage = await fetch(
      `${process.env.STORAGE_SENSORS_ENDPOINT}/today`,
    );
    const dataStorage = await responseStorage.json();
    // console.log(dataStorage);

    const updatedBatch = {
      batch_data: {
        info: JSON.stringify(dataToken.batch_data.info),
        mdata: JSON.stringify(dataStorage),
        minscr: "",
      },
      batch_meta: {
        description:
          "This token binds a unique wine collection from tracecorck.com on the cardano blockchain.",
        image: dataToken.batch_meta.image,
        name: dataToken.batch_meta.name,
      },
      batch_quantity: [
        parseInt(dataToken.batch_quantity[0]),
        parseInt(dataToken.batch_quantity[1]),
      ],
    };

    // Tokenization service
    const response = await fetch(URL, {
      method: "PUT",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            process.env.TOKENIZATION_USERNAME +
              ":" +
              process.env.TOKENIZATION_PASSWORD,
          ),
      },
      body: JSON.stringify(updatedBatch),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Run immediately, then every interval
fetchData();
setInterval(fetchData, INTERVAL_MS);
