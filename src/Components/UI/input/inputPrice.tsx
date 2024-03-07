import { ChangeEvent, KeyboardEvent, useState } from "react";
import { PriceFormat } from "../../../lib";
import useFilter from "../../../store/store";

function InputPrice({ paramDoSamthing }: { paramDoSamthing: () => void }) {
  const filterP = useFilter((state) => state.filterPrice);
  const [valRange, setValRange] = useState<number>(filterP);
  const [maxValue] = useState<number>(5000000);
  const setFilterPrice = useFilter((state) => state.setPrice);
  const setCurrValue = useFilter((state) => state.setCurrentValue);

  const changeSelectValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValRange(Number(event.currentTarget.value));
    let tPrice: number = parseFloat(event.currentTarget.value);
    setFilterPrice(tPrice);
    setCurrValue(tPrice.toFixed(2));
    //console.log(filterPrice);
  };

  const keyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      paramDoSamthing();
    }
  };

  return (
    <label className="w-[100%] grid grid-cols-[60px_minmax(0,_1fr)] gap-x-3 text-[0.8rem]/[1rem] animate-abc">
      по Цене:
      <div className="flex flex-col gap-4">
        <input
          type="number"
          className="w-[100%] ml-auto bg-slate-200 p-2 border-2 border-slate-600/30 outline-none focus:border-slate-950 focus:font-bold"
          value={valRange}
          onChange={changeSelectValue}
          onKeyUp={keyEnter}
        ></input>
        <input
          className="w-[100%] ml-auto bg-slate-200 border-none"
          type="range"
          max={maxValue}
          min="0"
          step="500"
          value={valRange}
          onChange={changeSelectValue}
        ></input>
        <div className="text-center">
          <span className="font-bold">{PriceFormat(valRange)}</span> /
          {PriceFormat(maxValue)}
        </div>
      </div>
    </label>
  );
}

export default InputPrice;
