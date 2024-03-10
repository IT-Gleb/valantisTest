import { useEffect, useState, MouseEvent, useRef } from "react";
import PagBtn from "./UI/buttons/pagBtn";
import { PaginationBtnsPageCount } from "../lib";

const X_BEGIN: number = 0;
const X_WIDTH: number = 308;

function Pages({
  paramPageCount,
  paramChangePage,
  paramCurrPage,
}: {
  paramPageCount: number;
  paramChangePage: (event: any, index: number) => void;
  paramCurrPage: number;
}) {
  const [a_Pages, setPages] = useState<number[]>([]);
  const [leftX, setLeftX] = useState<number>(X_BEGIN);
  const [ulWidth, setUlWidth] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  //console.log("render Pages");

  if (paramPageCount < 1) return;

  useEffect(() => {
    let t_Pages = [];
    for (let i: number = 0; i < paramPageCount; i++) {
      t_Pages[i] = i;
    }
    setPages(t_Pages);
  }, [paramPageCount]);

  useEffect(() => {
    if (ulRef.current) {
      let tt = ulRef.current.clientWidth;
      //console.log(tt);

      if (tt !== 0) {
        setUlWidth(tt);
      }
    }
  }, [ulRef.current]);

  const forwardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ulWidth < X_WIDTH) return;

    let xx = ulWidth - X_WIDTH;
    if (leftX < xx) {
      setLeftX((prev) => prev + X_WIDTH);
    } else toEnd(event);
  };

  const backClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ulWidth < X_WIDTH) return;

    if (leftX > X_WIDTH - 1) {
      setLeftX((prev) => prev - X_WIDTH);
    } else toBegin(event);
  };

  const toEnd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ulWidth < X_WIDTH) return;
    setLeftX(ulWidth - X_WIDTH + 8);
  };

  const toBegin = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ulWidth < X_WIDTH) return;
    setLeftX(0);
  };

  //Установить страницу
  useEffect(() => {
    let _width: number = Math.round(X_WIDTH / PaginationBtnsPageCount);
    let _mesto: number = _width * (paramCurrPage + 1) - _width * 3;
    //let _left: number = X_WIDTH * Math.ceil(_mesto / X_WIDTH);
    //console.log(_width, paramCurrPage + 1, _mesto);

    if (
      paramPageCount > PaginationBtnsPageCount &&
      _mesto > X_WIDTH - X_WIDTH / 2
    ) {
      setLeftX(_mesto);
    }
  }, [paramCurrPage]);

  return (
    <>
      <div className="w-[300px] md:w-[514px] mx-auto flex flex-wrap gap-x-1 items-center justify-center mb-5">
        {paramPageCount > PaginationBtnsPageCount && (
          <PagBtn title="<<" clickEvent={toBegin}></PagBtn>
        )}
        {paramPageCount > PaginationBtnsPageCount * 2 && (
          <PagBtn title="<" clickEvent={backClick}></PagBtn>
        )}

        <div className="w-[300px] h-[3.5rem] overflow-hidden relative">
          <ul
            ref={ulRef}
            className="w-fit flex gap-x-3 items-center py-2 absolute top-0 transition-all"
            style={{ left: `${-leftX}px` }}
          >
            {a_Pages.map((item, index) => {
              return (
                <li className="cursor-pointer" key={item + Math.random()}>
                  <button
                    className={
                      index !== paramCurrPage
                        ? "w-[30px] h-[30px] relative rounded-lg px-4 py-2 bg-slate-400 text-slate-50 text-[12px]/[10px] hover:bg-slate-300 hover:text-black hover:shadow-md hover:shadow-black hover:transition-all focus:bg-yellow-300 focus:border-[1px] focus:border-blue-700 focus:shadow-md focus:shadow-black focus:font-bold focus:text-red-700"
                        : "w-[30px] h-[30px] relative rounded-lg px-4 py-2 text-[12px]/[10px] bg-white border-[1px] border-blue-700 font-bold text-red-700"
                    }
                    onClick={(e) => paramChangePage(e, index)}
                  >
                    <span className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
                      {item + 1}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {paramPageCount > PaginationBtnsPageCount * 2 && (
          <PagBtn title=">" clickEvent={forwardClick}></PagBtn>
        )}
        {paramPageCount > PaginationBtnsPageCount && (
          <PagBtn title=">>" clickEvent={toEnd}></PagBtn>
        )}
      </div>
    </>
  );
}

export default Pages;
