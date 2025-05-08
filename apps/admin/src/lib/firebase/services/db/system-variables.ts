import { collection, getDocs } from "firebase/firestore";
import { db } from "../../client";

export const systemVariables: any = {
  getAll: async () => {
    try {
      const systemVariablesRef = collection(db, "systemVariables");
      const systemVariables = await getDocs(systemVariablesRef);
      return {
        status: 200,
        data: systemVariables?.docs?.map((doc) => doc.data()),
      };
    } catch (error) {
      return {
        status: 500,
        data: error,
      };
    }
  },
};
