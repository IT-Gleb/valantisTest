import { useEffect, useState } from "react";
import { orderBy, uniq } from "lodash";

import {
  ErrorStatus,
  ITEMS_DOWNLOADED,
  ITEMS_PER_PAGE,
  TO_VALANTIS_API,
  TValantisData,
  TValantisItem,
  TparamObject,
  md5_fromPassword,
} from "../lib";

async function valantis_maxRec(
  paramFetch: TparamObject,
  paramSet: (paramData: any) => void,
  paramLoading: (param: boolean) => void,
  paramDelayOnError: number = 100
) {
  const auth_res: string = md5_fromPassword();
  let status = 200;
  let error500: any = null;
  paramLoading(true);
  await fetch(TO_VALANTIS_API, {
    headers: { "X-Auth": auth_res, "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(paramFetch),
  })
    .then((response) => {
      if (!response.ok) {
        status = response.status;
        error500 = response;
        ErrorStatus(status);
      } else return response.json();
    })
    .then((data) => {
      let tmpData = uniq(data.result);
      //console.log(data.result.length, tmpData.length);
      paramSet(tmpData.length);
      paramLoading(false);
    })
    .catch((e) => {
      console.log(e);
      paramLoading(false);
      if (status !== 401 && status !== 403 && status !== 404) {
        if (status === 500) console.log(error500);
        setTimeout(() => {
          valantis_maxRec(paramFetch, paramSet, paramLoading);
        }, paramDelayOnError);
      }
      ErrorStatus(status);
    });
}

async function valantis_fetcher(
  paramURL: string | URL,
  paramFetch: TparamObject,
  paramSet: (paramData: any) => void,
  paramLoading: (param: boolean) => void,
  paramDelayonError: number = 1200
) {
  const auth_res: string = md5_fromPassword();
  let status: number = 0;
  let error500: any = null;
  let fetchOptions = {
    headers: { "X-Auth": auth_res, "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(paramFetch),
  };
  paramLoading(true);

  await fetch(paramURL, fetchOptions)
    .then((res) => {
      if (!res.ok) {
        status = res.status;
        error500 = res;
        ErrorStatus(status);
      } else return res.json();
    })
    .then(async (data) => {
      let tmp = uniq(data.result);
      let param: TparamObject = {
        action: "get_items",
        params: { ids: tmp },
      };
      try {
        fetchOptions.body = JSON.stringify(param);

        const response = await fetch(paramURL, fetchOptions);
        const data_1 = await response.json();
        if (!response.ok) {
          status = response.status;

          ErrorStatus(status);
        } else {
          paramSet(data_1.result);
          paramLoading(false);
        }
      } catch (err) {
        //console.log(err);
        paramLoading(false);
        ErrorStatus(status);
      }
    }) //.then((data) => data.result)
    .catch(() => {
      //console.log(err);
      paramLoading(false);
      if (status !== 401 && status !== 403 && status !== 404) {
        if (status === 500) console.log(error500);
        setTimeout(() => {
          valantis_fetcher(paramURL, paramFetch, paramSet, paramLoading);
        }, paramDelayonError);
        ErrorStatus(status);
      }
    });
}

function useGoods(currentPage: number, paramFilter: boolean) {
  const param_ids: TparamObject = {
    action: "get_ids",
    params: { offset: currentPage * ITEMS_PER_PAGE, limit: ITEMS_DOWNLOADED },
  };
  const [goods, setData] = useState<TValantisData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //console.log(param_ids);

    if (paramFilter) return;

    const getData = (paramData: any) => {
      if (Array.isArray(paramData) && paramData.length > 0) {
        let tmp: TValantisData = [];
        //Избавиться от повторов
        paramData.forEach((item: TValantisItem) => {
          let ff = tmp.find(
            (tmpFind) =>
              tmpFind["id"].toLowerCase() === item["id"].toLowerCase()
          );
          if (ff === undefined) tmp.push(item);
        });
        //Избавиться от записей больше ITEMS_PER_PAGE
        if (tmp.length > ITEMS_PER_PAGE) {
          tmp = tmp.slice(0, ITEMS_PER_PAGE);
        }
        //Отсортировать данные по цене
        tmp = orderBy(tmp, ["price"], ["asc"]);
        //Установить данные
        setData(tmp);
      } else setData([]);
    };
    const loading = (param: boolean) => {
      setIsLoading(param);
    };
    getData([]);
    try {
      valantis_fetcher(TO_VALANTIS_API, param_ids, getData, loading);
    } catch (err) {
      console.log(err);
      valantis_fetcher(TO_VALANTIS_API, param_ids, getData, loading);
    }
  }, [currentPage]);

  return {
    goods,
    isLoading,
  };
}

//Получить данные о количестве страниц
function useMaxRec(paramFilter: boolean) {
  const param_ids: TparamObject = {
    action: "get_ids",
  };
  const [maxRec, setMaxRec] = useState<number>(0);
  const [isMaxRecLoading, setIsmaxRecLoading] = useState<boolean>(true);

  useEffect(() => {
    if (paramFilter) return;
    const getData = (paramData: any) => {
      if (Number(paramData) !== 0) {
        let tmp = Number(paramData);
        tmp = Math.ceil(tmp / ITEMS_PER_PAGE);
        setMaxRec(tmp);
      } else setMaxRec(0);
    };
    const isLoad = (paramLoad: boolean) => {
      setIsmaxRecLoading(paramLoad);
    };
    getData(0);
    try {
      valantis_maxRec(param_ids, getData, isLoad);
    } catch (err) {
      console.log(err);
      valantis_maxRec(param_ids, getData, isLoad);
    }
  }, []);

  return {
    maxRec,
    isMaxRecLoading,
  };
}

export { useGoods, useMaxRec };
