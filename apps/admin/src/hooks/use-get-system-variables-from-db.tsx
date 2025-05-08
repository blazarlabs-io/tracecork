import { useEffect, useState } from "react";
import db from "../lib/firebase/services/db";

export const useGetSystemVariablesFromDB = () => {
  const [systemVariables, setSystemVariables] = useState({});
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    db.systemVariables.getAll().then((res: any) => {
      if (res.status === 200) {
        setSystemVariables(res.data);
        console.log(res.data);
        res.data.filter((item: any) => {
          if (Object.keys(item)[0] === "pricing") {
            setPricing(item.pricing);
          }
        });
      }
    });
  }, []);

  return { systemVariables, pricing };
};
