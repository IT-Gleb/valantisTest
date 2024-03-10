import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useMaxRec, useGoods } from "../../hooks/swrHooks";
import ValantisPage from "../valantisPage";

import MySpinner from "../UI/mySpinner";
import ErrorBox from "../UI/messages/errorBox";
import FilterShowBtn from "../UI/buttons/filterShowBtn";
import FilterBox from "../filterBox";
import useFilter from "../../store/store";

import { LOAD_DELAY } from "../../lib";
import ReloadBtn from "../UI/reloadBtn";
import MessageBox from "../UI/messages/messgaeBox";

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
  const [isMessage, setMessage] = useState<boolean>(true);

  const showBoxFilter = () => {
    setShowFilter(!sFilter);
  };

  useEffect(() => {
    setLoading(true);
    timerId.current = setTimeout(() => {
      if (isLoading || goods.length < 1) {
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
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(true);
    }, 150000);
  }, [isMessage]);

  if (loading) {
    return (
      <div className="w-[100%] mt-[20%]">
        <MySpinner></MySpinner>
      </div>
    );
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
            <p className="mt-4 mb-5 font-bold">:-(</p>
            <ReloadBtn></ReloadBtn>
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
        {isMessage && (
          <MessageBox paramClose={() => setMessage(false)}>
            <div>
              Привет, Волантис.
              <p>Ваше задание</p>
              <ul className="w-fit mx-auto text-[0.85rem]/[1.2rem]">
                <li>
                  <a
                    className="hover:font-extrabold"
                    href="https://it-gleb.github.io/valantisTest"
                    target="_blank"
                  >
                    Валантис - тест{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:font-extrabold"
                    href="https://github.com/it-gleb/valantisTest"
                    target="_blank"
                  >
                    Код Github
                  </a>
                </li>
              </ul>
              <p className="mt-5 w-[100%] pt-5 pb-5 text-center border-t-[2px] border-t-slate-300/80">
                {" "}
                Еще работы:{" "}
              </p>
              <ul className="w-fit mx-auto text-[0.85rem]/[1.2rem]">
                <li>
                  <a
                    className="hover:font-extrabold"
                    href="https://it-gleb.github.io/Paper/"
                    target="_blank"
                  >
                    1. Верстка по макету Figma.
                  </a>
                </li>
                <li>
                  <a
                    className="hover:font-extrabold"
                    href="https://it-gleb.github.io/devOptima/"
                    target="_blank"
                  >
                    2. Верстка по макету Figma.
                  </a>
                </li>
                <li>
                  <a
                    className="hover:font-extrabold"
                    href="https://it-gleb.github.io/virm/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    3. Верстка по макету Figma.
                  </a>
                </li>
                <li className="mt-8">
                  <a
                    className="hover:font-extrabold"
                    href="https://github.com/it-gleb"
                    target="_blank"
                  >
                    Ссылка на Github
                  </a>
                </li>
              </ul>
              <p className="mt-4 w-fit mx-auto text-[1.5rem]/[2rem] font-medium">
                Жду обратной связи.
              </p>
            </div>
          </MessageBox>
        )}
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
