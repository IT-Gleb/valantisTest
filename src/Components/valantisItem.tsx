import { PriceFormat, TValantisItem } from "../lib";

function ValantisItem({
  paramGood,
  paramIndex,
}: {
  paramGood: TValantisItem;
  paramIndex: number;
}) {
  return (
    <article className="bg-white flex flex-col items-start overflow-hidden border-2 border-slate-300 border-r-slate-600 border-b-slate-600 rounded-lg transition-all hover:border-slate-700 hover:-translate-y-2 hover:scale-110 hover:shadow-md hover:shadow-black hover:bg-slate-100">
      <div className="w-[100%] text-center bg-slate-600 text-slate-50 text-[0.7rem]/[0.8rem] py-1">
        {paramIndex}
      </div>
      <main className="w-[100%] p-2 grid grid-cols-[65px_minmax(0,_1fr)] gap-x-1 gap-y-2 justify-start">
        <span className="text-[0.5rem]/[0.7rem]">ID:</span>
        <span className="block text-[0.6rem]/[0.6rem] border-2 rounded-md border-slate-200 p-1">
          {paramGood.id}
        </span>
        <span className="block text-[0.5rem]/[0.7rem] overflow-hidden">
          Наименование:
        </span>
        <h6 className="text-[0.85rem]/[0.95rem] font-semibold ">
          {paramGood.product}
        </h6>
        <span className="text-[0.5rem]/[0.7rem]">Цена:</span>
        <span
          className="block font-bold text-right text-slate-950 text-[1.2rem]/[1.2rem]"
          style={{
            textShadow: "lime -2px -2px 4px, lime 2px 2px 4px",
          }}
        >
          {PriceFormat(Number(paramGood.price))}
          {/* <span className="text-[0.85rem]/[0.9rem] text-rose-900 font-light">
            ₽
          </span> */}
        </span>

        <span className="text-[0.5rem]/[0.7rem]">Бранд:</span>
        <span className="font-bold text-[1.2rem]/[1.2rem] text-rose-400">
          {paramGood.brand}
        </span>
      </main>
    </article>
  );
}

export default ValantisItem;
