import { useEffect, useState } from "react";
import {
  ErrorStatus,
  ITEMS_DOWNLOADED,
  ITEMS_PER_PAGE,
  TO_VALANTIS_API,
  TValantisData,
  TValantisItem,
  TparamObject,
  noName,
  setup_FetchOptions,
} from "../lib";
import useFilter from "../store/store";
import { orderBy, uniq, uniqBy } from "lodash";

async function doFetchData(
  paramFetchOptions: TparamObject,
  paramSetupData: (paramData: any) => void,
  paramSetupLoaded: (paramData: boolean) => void,
  paramSetError: (param: boolean) => void,
  paramCurrPage: number = 0,
  paramDelay: number = 1000
) {
  let options = setup_FetchOptions(paramFetchOptions);
  let errStatus: number = 0;
  let error500: any = null;
  try {
    paramSetupLoaded(true);
    paramSetError(false);
    const response = await fetch(TO_VALANTIS_API, options);
    const data = await response.json();
    if (!response.ok) {
      errStatus = response.status;
      ErrorStatus(errStatus);
      error500 = response;
    }
    if (response.ok) {
      //paramSetupData(data.result);
      //paramSetupLoaded(true);
      let tmp: string[] = Array.from(data.result);
      //Проверить на наличие данных
      if (tmp.length < 1) {
        errStatus = 133;
        ErrorStatus(errStatus); //Сформировать ошибку
      }
      //Убрать повторяющиеся значения
      tmp = uniq(tmp);
      tmp = orderBy(tmp, [], ["asc"]);

      //console.log(tmp, tmp.length);

      //Выбрать только по текущей странице
      if (tmp.length > ITEMS_PER_PAGE)
        tmp = tmp.slice(
          paramCurrPage * ITEMS_PER_PAGE,
          paramCurrPage * ITEMS_PER_PAGE + ITEMS_DOWNLOADED
        );

      // console.log(
      //   paramCurrPage * ITEMS_PER_PAGE,
      //   paramCurrPage * ITEMS_PER_PAGE + ITEMS_DOWNLOADED,
      //   tmp
      // );

      const data_2_options = {
        action: "get_items",
        params: {
          ids: tmp,
          // offset: paramCurrPage * ITEMS_PER_PAGE,
          // limit: ITEMS_DOWNLOADED,
        },
      };

      options = setup_FetchOptions(data_2_options);
      const res = await fetch(TO_VALANTIS_API, options);
      const data_2 = await res.json();
      if (!res.ok) {
        errStatus = res.status;
        ErrorStatus(errStatus);
        error500 = res;
      }
      //Данные получены
      if (res.ok) {
        //console.log(data_2.result);
        paramSetupData(data_2.result);
        //paramSetupLoaded(false);
      }
    }
  } catch (err) {
    console.log(err);
    if (
      errStatus !== 133 &&
      errStatus !== 401 &&
      errStatus !== 403 &&
      errStatus !== 404
    ) {
      if (errStatus === 500) console.log(error500);
      setTimeout(() => {
        doFetchData(
          paramFetchOptions,
          paramSetupData,
          paramSetupLoaded,
          paramSetError,
          paramCurrPage
        );
      }, paramDelay);
    }
    paramSetupLoaded(false);
    paramSetError(true);
  }
}

async function doFetchCount(
  paramFetch: TparamObject,
  paramGetData: (param: number) => void,
  paramIsLoad: (param: boolean) => void,
  paramDelay: number = 1000
) {
  const options = setup_FetchOptions(paramFetch);
  let errStatus: number = -1;
  let error500: any = null;
  try {
    paramIsLoad(true);
    const response = await fetch(TO_VALANTIS_API, options);
    const recData = await response.json();
    if (response.ok) {
      paramGetData(recData.result.length);
      paramIsLoad(false);
    }
    if (!response.ok) {
      paramGetData(-1);
      error500 = response;
      errStatus = response.status;
      ErrorStatus(errStatus);
    }
  } catch (err) {
    console.log(err);
    paramIsLoad(false);
    if (errStatus !== 401 && errStatus !== 403 && errStatus !== 404) {
      if (errStatus === 500) console.log(error500);
      setTimeout(() => {
        doFetchCount(paramFetch, paramGetData, paramIsLoad);
      }, paramDelay);
    }
  }
}

function useFilteredData() {
  const isActive: boolean = useFilter((state) => state.active);
  const filterMode: number = useFilter((state) => state.filterMode);
  const filterBrand: string | null = useFilter((state) => state.filterBrand);
  const filterName: string = useFilter((state) => state.filterName);
  const filterPrice: number = useFilter((state) => state.filterPrice);
  const currentPage: number = useFilter((state) => state.activePage);

  //count Pages
  const [PagesCount, setPagesCount] = useState<number>(0);
  //Загрузка
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [allRec, setAllRec] = useState<number>(0);
  //Основные данные
  const [data, setData] = useState<TValantisData>([]);
  //Ошибка при получении данных или не найдено
  const [errorData, setErrorData] = useState<boolean>(false);

  //Получить данные о количестве страниц и товаров
  useEffect(() => {
    //Сформировать запрос
    let filterRecCount: TparamObject = { action: "filter" };
    switch (filterMode) {
      case 0:
        filterRecCount.params = {
          brand: filterBrand === noName ? null : filterBrand,
        };

        break;
      case 1:
        filterRecCount.params = { product: filterName };
        break;
      case 2:
        filterRecCount.params = { price: filterPrice };
        break;
    }

    //console.log(JSON.stringify(filterRecCount));
    function getData(paramData: number) {
      setAllRec(paramData);
      setPagesCount(Math.ceil(paramData / ITEMS_PER_PAGE));
      setIsLoad(false);
    }

    function isLoading(param: boolean) {
      setIsLoad(param);
    }

    doFetchCount(filterRecCount, getData, isLoading);
  }, [isActive]);

  //Получить основные данные
  useEffect(() => {
    // if (isActive) {
    //Сформировать запрос

    let filterRecData: TparamObject = { action: "filter" };
    switch (filterMode) {
      case 0:
        filterRecData.params = {
          brand: filterBrand === noName ? null : filterBrand,
        };
        break;
      case 1:
        filterRecData.params = { product: filterName };
        break;
      case 2:
        filterRecData.params = { price: filterPrice };
        break;
    }
    //-------------------------
    const isLoaded = (param: boolean) => {
      setIsLoad(param);
    };

    const getData = (paramData: any) => {
      //console.log(paramData);
      if (Array.isArray(paramData) && paramData.length > 0) {
        setErrorData(false);
        let tmp: TValantisData = Array.from(paramData);
        //Убрать без наименований бренда
        if (filterMode === 0) {
          let fname = filterBrand;
          if (fname !== noName) {
            tmp = tmp.filter((item: TValantisItem) => {
              return item.brand === fname;
            });
          }
        }
        //-----------------------------------------
        //console.log(tmp);
        if (tmp.length > 1) tmp = uniqBy(tmp, "id");
        if (tmp.length > ITEMS_PER_PAGE) {
          tmp = tmp.slice(0, ITEMS_PER_PAGE);
        }
        tmp = orderBy(tmp, ["price"], ["asc"]);
        //console.log(tmp);
        setData(tmp);
      } else if (Array.isArray(paramData)) setData([]);
    };

    function setupError(param: boolean) {
      setErrorData(param);
    }

    getData([]);

    doFetchData(filterRecData, getData, isLoaded, setupError, currentPage);

    //}
  }, [currentPage]);

  return { allRec, PagesCount, isLoad, data, errorData };
}

export { useFilteredData };
