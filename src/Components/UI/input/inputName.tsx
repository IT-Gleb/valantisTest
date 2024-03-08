import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  MouseEvent,
} from "react";
import useFilter from "../../../store/store";
const minLength: number = 2;

function InputName({ paramEnter }: { paramEnter: () => void }) {
  const getNameText = useFilter((state) => state.filterName);
  const [nameText, setNameText] = useState<string>(getNameText);
  const setFilterName = useFilter((state) => state.setName);
  const setupCurrValue = useFilter((state) => state.setCurrentValue);
  const [isCorrect, setIsCorrect] = useState<boolean>(
    getNameText.trim().length > minLength
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const changeText = (event: ChangeEvent<HTMLInputElement>) => {
    setNameText(event.currentTarget.value);

    let text: string = event.currentTarget.value;
    text = text.trim().toLowerCase();
    let tempCorrect: boolean = text.trim().length > minLength;
    //console.log(tempCorrect);
    setIsCorrect(tempCorrect);
    if (tempCorrect) {
      setupCurrValue(text);
      setFilterName(text);
    }
  };

  const EnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!isCorrect) return;
    if (event.key === "Enter") {
      //console.log(event.key);
      paramEnter();
    }
  };

  const clearText = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setNameText("");
    setupCurrValue("бd");
    setFilterName("бd");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <label className="w-[100%] grid grid-cols-[65px_minmax(0,_1fr)] gap-x-3 text-[0.8rem]/[1rem] animate-abc">
      по Названию:
      <div className="relative h-fit">
        <input
          ref={inputRef}
          type="text"
          className="w-[100%] h-[36px] text-[0.8rem]/[1.1rem] bg-slate-200 outline-none border-2 border-slate-600/30 p-2 pr-9 focus:border-slate-950 focus:font-bold"
          value={nameText}
          onChange={changeText}
          onKeyUp={EnterKey}
        ></input>
        <button
          className="absolute w-[29px] h-[29px] right-[3px] top-[4px] font-bold bg-slate-300 text-[0.7rem]/[1rem] transition-all text-slate-950 text-center rounded-sm hover:bg-slate-800 hover:text-white active:bg-slate-100 active:text-slate-700"
          title="Очистить"
          onClick={clearText}
        >
          x
        </button>
        {!isCorrect && (
          <div className="text-[0.7rem]/[1rem] font-medium text-slate-600 mt-2">
            Введите не менее 3-х символов для поиска товара...
          </div>
        )}
      </div>
    </label>
  );
}

export default InputName;
