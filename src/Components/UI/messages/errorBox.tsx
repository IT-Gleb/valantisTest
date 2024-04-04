function ErrorBox({ children }: { children: JSX.Element }) {
  return (
    <div className="w-[75%] mx-auto mt-[20%] p-5 bg-red-600 text-white text-[1.5rem]/[1.5rem] font-bold border-[0.7rem] border-slate-800 shadow-xl shadow-black/50 ">
      {children}
    </div>
  );
}

export default ErrorBox;
