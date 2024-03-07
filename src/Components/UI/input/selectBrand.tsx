import { ChangeEvent, useState, useEffect } from "react";
import useFilter from "../../../store/store";
import MySpinner from "../mySpinner";
import { noName } from "../../../lib";
//import { noName } from "../../../lib";

function SelectBrand() {
  const setupValue: string = useFilter((state) => state.filterBrand);
  const [selValue, setSelValue] = useState<string | null>(setupValue);
  const setupFilterBrand = useFilter((state) => state.setBrand);
  const getOptionsData = useFilter((state) => state.actionGetBrandsNames);
  const optionsValue: string[] = useFilter((state) => state.Brands);
  const isLoad = useFilter((state) => state.isLoading);
  const setCurrValue = useFilter((state) => state.setCurrentValue);

  const changeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelValue(event.currentTarget.value);
    setupFilterBrand(event.currentTarget.value);
    setCurrValue(event.currentTarget.value);
  };

  useEffect(() => {
    getOptionsData();
  }, []);

  return (
    <>
      {isLoad && <MySpinner></MySpinner>}
      {!isLoad && optionsValue.length > 0 && (
        <label className="w-[100%] grid grid-cols-[60px_minmax(0,_1fr)] gap-x-3 text-[0.8rem]/[1rem] animate-abc">
          по Бренду:
          <select
            className="w-[100%] ml-auto text-[0.8rem]/[1.1rem] bg-slate-100 p-2 border-2 border-slate-600/30 outline-none focus:border-slate-950 focus:font-bold "
            value={selValue as string}
            onChange={changeValue}
          >
            <option
              className="text-[0.8rem]/[1rem] p-2 text-slate-400"
              value={"Выберите из списка"}
              disabled
            >
              Выберите из списка
            </option>
            <option
              className="text-[0.8rem]/[1rem] p-2 text-slate-800 hover:bg-red-500"
              value={noName}
            >
              {noName}
            </option>
            {optionsValue &&
              optionsValue.length > 0 &&
              optionsValue.map((item) => (
                <option
                  className=" bg-slate-50 text-slate-500 font-medium text-[0.9rem]/[1.1rem] odd:bg-slate-100 odd:text-slate-600"
                  key={item + Math.random()}
                >
                  {item}
                </option>
              ))}
          </select>
        </label>
      )}
    </>
  );
}

export default SelectBrand;
