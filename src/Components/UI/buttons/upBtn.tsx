import { MouseEvent } from "react";

function UpBtn() {
  const clickUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <button
      className="w-[30px] h-[30px] relative rounded-sm bg-slate-600 text-white text-center py-1 pr-1 font-bold transition-all active:scale-75 active:bg-slate-300 active:text-slate-800 lg:hover:bg-slate-300 lg:hover:text-slate-900 lg:hover:translate-y-[-2px]"
      title="К началу страницы"
      onClick={clickUp}
    >
      <span className="block absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <svg
          fill="#77fffa"
          height="18px"
          width="18px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          // xml:space="preserve"
        >
          <path
            id="XMLID_224_"
            d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
          />
        </svg>
      </span>
    </button>
  );
}

export default UpBtn;
