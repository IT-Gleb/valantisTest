import { TValantisData, TValantisItem } from "../lib";
//import ReloadBtn from "./UI/reloadBtn";
import ValantisItem from "./valantisItem";

function ValantisPage({
  paramItems,
  paramPage,
  paramMaxRec,
}: {
  paramItems: TValantisData;
  paramPage: number;
  paramMaxRec: number;
}) {
  return (
    <section className="max-w-[95%] mx-auto mb-10 mt-5">
      <div className="w-[100%] flex items-center justify-between px-5 mb-5 border-b-2 border-b-slate-200 pb-5">
        <div>
          Страница товаров:{" "}
          <span className="text-[24px]/[24px] font-bold">{paramPage + 1}</span>
          <span className="text-[24px]/[24px] font-bold">/{paramMaxRec}</span>
        </div>
        {/* <ReloadBtn></ReloadBtn> */}
      </div>

      <div className="w-[100%] grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 mt-8">
        {paramItems.length > 0 &&
          paramItems.map((item: TValantisItem, ind: number) => (
            <ValantisItem
              key={item["id"]}
              paramGood={item}
              paramIndex={ind + 1}
            ></ValantisItem>
          ))}
      </div>
      <div className="my-10 border-t-2 border-t-slate-200 pt-5">
        Страница товаров:{" "}
        <span className="text-[24px]/[24px] font-bold">{paramPage + 1}</span>
        <span className="text-[24px]/[24px] font-bold">/{paramMaxRec}</span>
      </div>
    </section>
  );
}

export default ValantisPage;
