import { Link } from "react-router-dom";
import { BaseLink } from "../../lib";

function TestPage() {
  return (
    <section className="w-[100%] p-4 text-[0.85rem]/[1.1rem]">
      <h3 className="uppercase font-bold">Задание</h3>
      <p className="mt-5 indent-5">
        Используя предоставленный апи создать страницу, которая отображает
        список товаров. Для каждого товара должен отображаться его id, название,
        цена и бренд.
      </p>
      <h3 className="font-bold uppercase mt-5">Требования:</h3>
      <p className=" indent-5 mt-4">
        Выводить по 50 товаров на страницу с возможностью постраничного перехода
        (пагинация) в обе стороны.
      </p>
      <p className=" indent-5 mt-4">
        Возможность фильтровать выдачу используя предоставленное апи по
        названию, цене и бренду Если API возвращает дубли по id, то следует их
        считать одним товаром и выводить только первый, даже если другие поля
        различаются. Если API возвращает ошибку, следует вывести идентификатор
        ошибки в консоль, если он есть и повторить запрос.
      </p>
      <p className=" indent-5 mt-4">
        Задание можно выполнять на <span className="font-bold">React</span> или
        на нативном <span className="font-bold">JS</span> . Оцениваться будет
        правильность работы сайта и качество кода.
      </p>
      <p className=" indent-5 mt-4">
        Внешний вид сайта оставляем на Ваше усмотрение.
      </p>
      <h3 className="font-bold uppercase mt-5 mb-4">Перейти к тестированию</h3>
      <ul>
        <li className="mt-2">
          <p>
            Выберите в меню пункт -{" "}
            <span className="uppercase text-slate-500 font-medium">
              продукция
            </span>
          </p>
        </li>
        <li className="mt-2">
          Перейдите по ссылке -{" "}
          <Link
            to={BaseLink}
            replace={true}
            state={{ page: 0 }}
            className="uppercase text-slate-700 font-bold"
          >
            Тестировать
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default TestPage;
