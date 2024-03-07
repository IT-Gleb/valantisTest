import { MouseEvent } from "react";

function UpBtn() {
  const clickUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <button
      className="w-[30px] h-[30px] rounded-sm bg-slate-600 text-white text-center py-1 pr-1 font-bold transition-all active:scale-75 active:bg-slate-300 active:text-slate-800 lg:hover:bg-slate-300 lg:hover:text-slate-900 lg:hover:translate-y-[-2px]"
      title="К началу страницы"
      onClick={clickUp}
    >
      <span className="block -rotate-90 scale-y-150 mr-[2px]">{">"}</span>
    </button>
  );
}

export default UpBtn;
