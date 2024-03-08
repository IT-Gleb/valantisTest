import { useState, useEffect, Suspense, lazy, useRef } from "react";
import { useFilteredData } from "../../hooks/filterHooks";
import useFilter from "../../store/store";

import FilterShowBtn from "../UI/buttons/filterShowBtn";
import MySpinner from "../UI/mySpinner";
import { LOAD_DELAY } from "../../lib";

const ValantisPage = lazy(() => import("../valantisPage"));
const Pages = lazy(() => import("../Pages"));

function FilteredContent() {
  const { allRec, PagesCount, data, isLoad } = useFilteredData();
  const clearFilter = useFilter((state) => state.setActive);
  const setupActivePage = useFilter((state) => state.setActivePage);
  const [activePage, setActivePage] = useState<number>(0);
  const getFilterMode = useFilter((state) => state.filterMode);
  const getCurrValue = useFilter((state) => state.currentValue);
  const [textMode, setTextMode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const timerId = useRef(-1);

  const removeFilter = () => {
    clearFilter(false);
  };

  //Установить текущую страницу пагинации
  const paginationChangePage = (event: any, paramIndex: number) => {
    event.preventDefault();
    setupActivePage(paramIndex);
    setActivePage(paramIndex);
  };

  useEffect(() => {
    let txt: string = "";
    switch (getFilterMode) {
      case 0:
        txt = "По бренду";
        break;
      case 1:
        txt = "По наименованию";
        break;
      case 2:
        txt = "По цене";
        break;
    }

    setTextMode(txt);
  }, [getFilterMode]);

  useEffect(() => {
    setLoading(true);
    timerId.current = setTimeout(() => {
      if (isLoad || data.length < 1) {
        setLoading(true);
        clearInterval(timerId.current);
        //Только если загрузка и нет данных
        timerId.current = setTimeout(() => {
          if (isLoad && data.length < 1) {
            setLoading(true);
          } else {
            setLoading(false);
          }
        }, LOAD_DELAY);
      } else {
        setLoading(false);
      }
    }, LOAD_DELAY);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [activePage]);

  //Загрузка
  if (loading) {
    return (
      <div className="w-[100%] mt-[20%]">
        <MySpinner></MySpinner>
      </div>
    );
  }

  //Если ничего не найдено
  if (!loading && data.length < 1) {
    return (
      <section className="w-[100%">
        <div className="flex items-center justify-end p-2">
          <FilterShowBtn
            paramTitle="Отменить фильтрацию"
            setShowFilter={removeFilter}
          ></FilterShowBtn>
        </div>
        <div className="w-fit mx-auto font-medium text-[1.8rem]/[2rem] mt-8">
          {"По Вашему запросу - ничего не найдено... :-("}
        </div>
      </section>
    );
  }
  //-------------------------------
  if (!loading)
    return (
      <section className="w-[100%] p-0 m-0">
        <div className="flex items-center justify-end p-2">
          <FilterShowBtn
            paramTitle="Отменить фильтрацию"
            setShowFilter={removeFilter}
          ></FilterShowBtn>
        </div>
        <div className="bg-slate-100 text-slate-500 p-4 text-[0.85rem]/[1rem] font-semibold flex flex-col gap-y-2">
          <h3>
            Записи отфильтрованы={" "}
            <span className="text-blue-700 uppercase">{textMode}</span>
          </h3>
          <h4>
            Значение={" "}
            <span className="text-[1.2rem]/[1.2rem] text-blue-600">
              {getCurrValue}
            </span>
          </h4>
          <h4>
            Всего найдено={" "}
            <span className="text-blue-600 text-[1.1rem]/[1.2rem] font-medium">
              {allRec}
            </span>{" "}
            наименований
          </h4>
        </div>

        <Suspense fallback={<MySpinner></MySpinner>}>
          {data.length > 0 && allRec > 0 && (
            <ValantisPage
              paramItems={data}
              paramMaxRec={PagesCount}
              paramPage={activePage}
            ></ValantisPage>
          )}
        </Suspense>
        {/* Пагинация */}
        <Suspense fallback={<MySpinner></MySpinner>}>
          {PagesCount > 1 && (
            <div className="w-[100%] border-t-2 border-t-slate-400/40 mt-4">
              <Pages
                paramPageCount={PagesCount}
                paramCurrPage={activePage}
                paramChangePage={paginationChangePage}
              ></Pages>
            </div>
          )}
        </Suspense>
      </section>
    );
}

export default FilteredContent;
