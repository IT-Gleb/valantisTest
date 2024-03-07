import CryptoJS from "crypto-js";

const PASS_BEGIN: string = "Valantis";
export const TO_VALANTIS_API: string | URL = "https://api.valantis.store:41000";
export const ITEMS_PER_PAGE: number = 50;
export const ITEMS_DOWNLOADED: number = ITEMS_PER_PAGE + 10;
export const PaginationBtnsPageCount: number = 7;
export const noName: string = "Без бренда";
export const LOAD_DELAY: number = 4500;

export type TValantisItem = {
  id: string;
  product: string;
  price: number | string;
  brand: string | null;
};

export type TValantisData = TValantisItem[];

function add_0(param: number) {
  let res: string = param < 10 ? "0" + param : String(param);
  return res;
}

function ValantisPassword(): string {
  let result = "";
  let dt = new Date();
  let tempMounth: number = dt.getMonth();
  let mn: string = add_0(tempMounth + 1);
  //tempMounth < 10 ? "0" + (tempMounth + 1) : String(tempMounth + 1);
  let day: number = dt.getDate();
  let day_str: string = add_0(day);
  result = PASS_BEGIN + "_" + dt.getFullYear() + mn + day_str;
  //console.log(result);
  return result;
}

export function md5_fromPassword(): string {
  let result = "";

  //console.log(msg, dt.toLocaleDateString());
  result = ValantisPassword();
  // console.log(result);
  result = CryptoJS.MD5(result).toString();
  // console.log(result);
  return result;
}

export type TparamObject = {
  action: string | null;
  params?: Object | null;
};

export async function valantis_Fetcher(param: TparamObject, onSuccess: any) {
  let auth_res: string = md5_fromPassword();
  await fetch(TO_VALANTIS_API, {
    headers: {
      "X-Auth": auth_res,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(param),
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log("Aga");
      onSuccess(data.result);
    })
    .catch((e) => {
      console.log(e);
    });
}

export function PriceFormat(paramPrice: number) {
  let res: string = "";
  res = new Intl.NumberFormat("ru-Ru", {
    style: "currency",
    currency: "RUB",
  }).format(paramPrice);
  return res;
}

export function ErrorStatus(param: number) {
  let EE = new Error("Ошибка!!! Статус = " + param);
  throw EE;
}

export function setup_FetchOptions(paramData: any) {
  const options: Object = {
    headers: {
      "X-Auth": md5_fromPassword(),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(paramData),
  };

  return options;
}
