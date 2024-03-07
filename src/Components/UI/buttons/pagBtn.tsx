import { MouseEvent } from "react";

function PagBtn({
  clickEvent,
  title,
}: {
  clickEvent: (event: MouseEvent<HTMLButtonElement>) => void;
  title: string;
}) {
  return (
    <button
      className="w-[48px] h-[32px] rounded-md bg-slate-500 text-slate-50 text-[0.6rem]/[0.5rem] font-extrabold p-1 transition-transform focus:border-[1px] focus:border-slate-900 focus:bg-slate-200 focus:text-blue-600 active:scale-50 hover:-translate-y-[3px] hover:shadow-md hover:shadow-black/75"
      title="Переход"
      onClick={clickEvent}
    >
      {title}
    </button>
  );
}

export default PagBtn;
