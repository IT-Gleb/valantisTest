import { create } from "zustand";
import {
  ErrorStatus,
  TO_VALANTIS_API,
  TparamObject,
  setup_FetchOptions,
} from "../lib";
import { orderBy, uniq } from "lodash";

export type TState = {
  active: boolean;
  filterMode: number;
  filterName: string;
  filterPrice: number;
  filterBrand: string;
  Brands: string[];
  isLoading: boolean;
  activePage: number;
  currentValue: string;
};

type TActions = {
  setActive: (param: boolean) => void;
  setPrice: (param: number) => void;
  setBrand: (param: string) => void;
  setName: (param: string) => void;
  setMode: (param: number) => void;
  actionGetBrandsNames: () => void;
  setActivePage: (param: number) => void;
  setCurrentValue: (param: string) => void;
};

const useFilter = create<TState & TActions>((set, get) => ({
  active: false,
  filterMode: -1,
  filterName: "",
  filterPrice: 0.0,
  filterBrand: "Выберите из списка",
  Brands: [],
  isLoading: false,
  activePage: 0,
  currentValue: "",
  setActive: (param: boolean) => set(() => ({ active: param })),
  setPrice: (param: number) => set(() => ({ filterPrice: param })),
  setBrand: (param: string) => set(() => ({ filterBrand: param })),
  setName: (param: string) => set(() => ({ filterName: param })),
  setMode: (param: number) => set(() => ({ filterMode: param })),
  setActivePage: (param: number) => set(() => ({ activePage: param })),
  setCurrentValue: (param: string) => set({ currentValue: param }),
  //--------------------------------------------------
  actionGetBrandsNames: async () => {
    const filterRec: TparamObject = {
      action: "get_fields",
      params: { field: "brand" },
    };
    let errStatus: number = 0;
    const options = setup_FetchOptions(filterRec);
    try {
      set({ isLoading: true });

      const response = await fetch(TO_VALANTIS_API, options);
      const data = await response.json();
      if (!response.ok) {
        errStatus = response.status;
        ErrorStatus(errStatus);
      }
      if (response.ok) {
        //console.log(data.result);
        let tmp: string[] = Array.from(data.result);
        //Убрать значения null
        tmp = tmp.filter((item) => item !== null);
        //Убрать повторяющиеся строки
        //let uniq= new Set(tmp);
        tmp = uniq(tmp);
        //tmp = Array.from(uniq);
        //Отсортировать по алфавиту
        tmp = orderBy(tmp, [], ["asc"]);

        set({ Brands: tmp, isLoading: false });
      }
    } catch (err) {
      set({ isLoading: false, Brands: [] });
      console.log(err);
      if (errStatus !== 401 && errStatus !== 403 && errStatus !== 404) {
        setTimeout(() => {
          get().actionGetBrandsNames();
        }, 1200);
      }
    }
  },
}));

export default useFilter;
