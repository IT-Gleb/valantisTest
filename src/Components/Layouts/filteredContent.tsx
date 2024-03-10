import { useState, useEffect, Suspense, lazy, useRef } from "react";
import { useFilteredData } from "../../hooks/filterHooks";
import useFilter from "../../store/store";

import FilterShowBtn from "../UI/buttons/filterShowBtn";
import MySpinner from "../UI/mySpinner";
import ErrorBox from "../UI/messages/errorBox";
import { LOAD_DELAY } from "../../lib";

const ValantisPage = lazy(() => import("../valantisPage"));
const Pages = lazy(() => import("../Pages"));

function FilteredContent() {
  const { allRec, PagesCount, data, errorData } = useFilteredData();
  const clearFilter = useFilter((state) => state.setActive);
  const setupActivePage = useFilter((state) => state.setActivePage);
  const [activePage, setActivePage] = useState<number>(0);
  const getFilterMode = useFilter((state) => state.filterMode);
  const getCurrValue = useFilter((state) => state.currentValue);
  const [textMode, setTextMode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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

  // Смена страницы.
  useEffect(() => {
    setLoading(true);
    timerId.current = setTimeout(() => {
      if (loading || data.length < 1) {
        setLoading(true);
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setLoading(false);
          clearTimeout(timerId.current);
        }, LOAD_DELAY);
        //-------------------
      } else {
        setLoading(false);
      }
    }, LOAD_DELAY);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [activePage]);

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

  //Загрузка
  if (loading) {
    return (
      <div className="w-[100%] mt-[20%]">
        <MySpinner></MySpinner>
      </div>
    );
  }

  //Если ничего не найдено
  if ((!loading && data.length < 1) || errorData) {
    return (
      <section className="w-[100%">
        <div className="flex items-center justify-end p-2 mb-12">
          <FilterShowBtn
            paramTitle="Отменить фильтрацию"
            setShowFilter={removeFilter}
          ></FilterShowBtn>
        </div>
        <ErrorBox>
          <>
            <h2 className="w-[100%] p-2 border-b-2 border-b-white/30 overflow-hidden">
              Внимание!!!
            </h2>
            <div className="text-[0.9rem]/[1rem] font-normal text-center my-8 overflow-hidden">
              <p>По Вашему запросу - нечего не найдено.</p>
              <p>Попробуйте, отменить фильтрацию. Изменить запрос!!!</p>
              <p className="mt-4 font-bold">{":-("}</p>
            </div>
          </>
        </ErrorBox>
      </section>
    );
  }
  //-------------------------------
  if (!loading && !errorData)
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
