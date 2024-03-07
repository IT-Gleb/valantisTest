import FilterShowBtn from "./UI/buttons/filterShowBtn";
import SelectBrand from "./UI/input/selectBrand";
import InputPrice from "./UI/input/inputPrice";
import InputName from "./UI/input/inputName";
import { ChangeEvent, useState } from "react";
import useFilter from "../store/store";

function FilterBox({ closeBox }: { closeBox: () => void }) {
  const [radioValue, setRadioValue] = useState<number>(-1);
  const setupActiveFilter = useFilter((state) => state.setActive);
  const setModeFilter = useFilter((state) => state.setMode);
  const setupCurrentPage = useFilter((state) => state.setActivePage);

  const doFilter = () => {
    setupActiveFilter(true);
    closeBox();

    //console.log(mode);
  };

  const setupModeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(Number(event.currentTarget.value));
    setModeFilter(Number(event.currentTarget.value));
    //При установке обнулить текущую страницу в фильтре
    setupCurrentPage(0);
  };

  return (
    <section className="w-[100%] md:w-[55%] min-h-[5vh] ml-auto border-2 border-black/40 p-4 transition-all animate-abc overflow-hidden">
      <h4 className="font-bold text-[1.2rem]/[1.3rem]">Фильтрация товаров</h4>
      <div className="flex items-center gap-x-4 text-[0.8rem]/[1rem] mt-4">
        <label className=" cursor-pointer">
          По бренду:
          <input
            className=" ml-2 cursor-pointer"
            type="radio"
            name="filter"
            id="filter"
            value={0}
            onChange={setupModeFilter}
          />
        </label>
        <label className=" cursor-pointer">
          По наименованию:
          <input
            className="ml-2 cursor-pointer"
            type="radio"
            name="filter"
            id="filter2"
            value={1}
            onChange={setupModeFilter}
          />
        </label>
        <label className=" cursor-pointer">
          По цене:
          <input
            className=" ml-2 cursor-pointer"
            type="radio"
            name="filter"
            id="filter3"
            value={2}
            onChange={setupModeFilter}
          />
        </label>
      </div>
      <div className="flex flex-col gap-y-10 items-start mt-8">
        {radioValue === 0 && <SelectBrand></SelectBrand>}
        {radioValue === 1 && <InputName paramEnter={doFilter}></InputName>}
        {radioValue === 2 && (
          <InputPrice paramDoSamthing={doFilter}></InputPrice>
        )}
      </div>
      <div className="text-right mt-10">
        {radioValue !== -1 && (
          <FilterShowBtn
            paramTitle="Фильтровать"
            setShowFilter={doFilter}
          ></FilterShowBtn>
        )}
      </div>
    </section>
  );
}

export default FilterBox;
