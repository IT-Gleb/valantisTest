import { useNavigate } from "react-router-dom";
import ErrorBox from "../UI/messages/errorBox";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <ErrorBox>
      <div className="w-[100%] text-center">
        <p className="uppercase overflow-hidden text-[1.3rem]/[2rem]">
          Страница не найдена!!!
        </p>
        <button
          className="w-[fit] h-[24px] p-3 pb-7 rounded-sm mt-10 bg-slate-500 text-white text-[0.8rem]/[1rem] transition-all xl:hover:border-[1px] xl:hover:border-yellow-200 active:bg-slate-400 active:text-slate-800 active:scale-75"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {"Вернуться"}
        </button>
      </div>
    </ErrorBox>
  );
}

export default ErrorPage;
