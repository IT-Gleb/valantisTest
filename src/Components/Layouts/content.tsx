import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useMaxRec, useGoods } from "../../hooks/swrHooks";
import ValantisPage from "../valantisPage";
//import Pages from "../Pages";
import MySpinner from "../UI/mySpinner";
import ErrorBox from "../UI/messages/errorBox";
import FilterShowBtn from "../UI/buttons/filterShowBtn";
import FilterBox from "../filterBox";
import useFilter from "../../store/store";
//import FilteredContent from "./filteredContent";
import { LOAD_DELAY } from "../../lib";

const Pages = lazy(() => import("../Pages"));
const FilteredContent = lazy(() => import("./filteredContent"));

function Content() {
  const isFiltered: boolean = useFilter((state) => state.active);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const { goods, isLoading } = useGoods(currentPage, isFiltered);
  const { maxRec, isMaxRecLoading } = useMaxRec(isFiltered);
  const [sFilter, setShowFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const timerId = useRef(-1);

  const showBoxFilter = () => {
    setShowFilter(!sFilter);
  };

  useEffect(() => {
    setLoading(true);
    timerId.current = setTimeout(() => {
      setLoading(false);
    }, LOAD_DELAY);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [currentPage]);

  if (loading) {
    return <MySpinner></MySpinner>;
  }

  if (!loading && maxRec < 1)
    return (
      <ErrorBox>
        <>
          <h2 className="w-[100%] p-2 border-b-2 border-b-white/30 overflow-hidden">
            Внимание!!!
          </h2>
          <div className="text-[0.9rem]/[1rem] font-normal text-center my-8 overflow-hidden">
            <p>
              Произошел сбой сети. Или сервер магазина(API) - сейчас недоступен.
            </p>
            <p>Подождите и повторите попытку позже.</p>
            <p className="mt-4 font-bold">:-(</p>
          </div>
        </>
      </ErrorBox>
    );

  const changeCurrentPage = (event: MouseEvent, paramIndex: number) => {
    event.preventDefault();
    setCurrentPage(paramIndex);
  };

  if (isFiltered) {
    return (
      <Suspense fallback={<MySpinner></MySpinner>}>
        <FilteredContent></FilteredContent>
      </Suspense>
    );
  }

  if (!loading)
    return (
      <>
        {isMaxRecLoading && <MySpinner></MySpinner>}
        {isLoading && <MySpinner></MySpinner>}
        {!isMaxRecLoading && !isLoading && goods && (
          <>
            <div className="container flex items-end justify-end gap-x-5 py-4">
              <FilterShowBtn
                setShowFilter={showBoxFilter}
                paramTitle={sFilter ? "Закрыть" : "Фильтр"}
              ></FilterShowBtn>
            </div>
            {sFilter && <FilterBox closeBox={showBoxFilter}></FilterBox>}
            <ValantisPage
              paramItems={goods}
              paramPage={currentPage}
              paramMaxRec={maxRec}
            ></ValantisPage>
          </>
        )}
        <Suspense fallback={<MySpinner></MySpinner>}>
          {!isMaxRecLoading && (
            <Pages
              paramChangePage={changeCurrentPage}
              paramCurrPage={currentPage}
              paramPageCount={maxRec}
            ></Pages>
          )}
        </Suspense>
      </>
    );
}

export default Content;
