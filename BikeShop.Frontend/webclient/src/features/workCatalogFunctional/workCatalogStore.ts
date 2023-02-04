/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import axios from 'axios';

type workType = {
  createdAt: string;
  description: string;
  enabled: boolean;
  id: number;
  name: string;
  price: number;
  updatedAt: string;
  workGroupId: number;
};
type stateType = {
  workGroups: Array<workType>;
  workGet: any;
};

const workCatalogStore = create<stateType>((set) => ({
  workGroups: [],

  workGet: async () => {
    try {
      const response = await axios.get('http://185.47.172.78/api/work/getbygroupid/1');
      // console.log(response);
      set({ workGroups: response.data.works } as any);
    } catch (error) {
      console.error(error);
    }
  },
}));

export default workCatalogStore;
