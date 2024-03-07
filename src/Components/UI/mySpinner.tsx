import { useEffect, useState } from "react";
const MaxLimit: number = 100;

function MySpinner() {
  const [progressVal, setProgressVal] = useState<number>(0);

  //   const pss = (event: FormEvent<HTMLProgressElement>) => {
  //     setProgressVal(event.currentTarget.value);
  //   };

  useEffect(() => {
    const timerId = setInterval(() => {
      setProgressVal((prev) =>
        prev < MaxLimit ? prev + 1 : prev - MaxLimit + 1
      );
    }, 100);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="w-[100%] text-center flex flex-col items-center">
      <progress
        className="w-[300px] mx-auto h-[6px] accent-blue-300"
        value={progressVal}
        //onChange={pss}
        max={MaxLimit}
      >
        {progressVal}
      </progress>
      <div className="text-[0.76rem]/[0.76rem] font-semibold mt-2">
        загрузка и обработка данных...
      </div>
    </div>
  );
}

export default MySpinner;
