import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {AxiosResponse} from "axios";
import {ServiceItem} from "../../../entities/models/ServiceItem";
import {$api} from "../../../shared";

interface ServiceStore {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    repairs: ServiceItem[]
    setRepair: (value: string) => void
    addNewRepair: (data: any) => any
}

const useService = create<ServiceStore>()(/*persist(*/devtools(immer((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({
        isLoading: value
    }),

    repairs: [],
    setRepair: () => set({
        // code here
    }),
    addNewRepair: (data: any) => {
        set({isLoading: true});
        return $api.post('/work/create', data)
    },
})))/*, {
    name: "ServiceStore",
    version: 1
})*/);

export default useService;