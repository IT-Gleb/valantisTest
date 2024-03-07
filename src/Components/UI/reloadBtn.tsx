import { MouseEvent } from "react";

function ReloadBtn() {
  const reloadClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.reload();
  };
  return (
    <button
      className=" bg-slate-950 text-white text-[0.75rem]/[0.75rem] px-3 py-2 min-w-[70px] transition-all rounded-md hover:bg-slate-300 hover:text-slate-950 hover:outline-1 hover:outline-rose-600 active:bg-slate-300 active:text-slate-800 active:scale-75"
      title="Перезагрузить страницу"
      onClick={reloadClick}
    >
      Обновить
    </button>
  );
}

export default ReloadBtn;
