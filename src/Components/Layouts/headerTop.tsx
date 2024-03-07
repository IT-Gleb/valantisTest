function HeaderTop({ children }: { children?: JSX.Element }) {
  return (
    <header className="w-[100%] bg-slate-800 min-h-[10vh] text-white py-4">
      <div className="container">
        <>{children}</>
      </div>
    </header>
  );
}

export default HeaderTop;
