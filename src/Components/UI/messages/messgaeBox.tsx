function MessageBox({
  children,
  paramClose,
}: {
  children?: JSX.Element;
  paramClose: () => void;
}) {
  return (
    <>
      <div className=" fixed left-0 top-0 right-0 bottom-0 bg-slate-950/80"></div>
      <div className="absolute w-[90%] lg:w-[75%] xl:w-[60%] bg-slate-200 border-[6px] border-slate-700 rounded-md text-slate-50 shadow-lg shadow-black/80 left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]">
        <header className="bg-slate-500 text-white w-[100%] p-2">
          Информация
        </header>
        <main className="w-[100%] min-h-[10vh] bg-slate-100 p-8 text-black/90">
          {children}
        </main>
        <footer className="w-[100%] bg-slate-600 text-center p-4">
          <button
            className="bg-slate-400 text-[0.7rem]/[1rem] text-black p-2 overflow-hidden rounded-sm border-[1px] border-slate-100"
            onClick={(e) => {
              e.preventDefault();
              paramClose();
            }}
          >
            Закрыть
          </button>
        </footer>
      </div>
    </>
  );
}

export default MessageBox;
