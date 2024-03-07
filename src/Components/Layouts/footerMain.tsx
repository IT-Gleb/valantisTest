function FooterMain({ children }: { children?: JSX.Element }) {
  return (
    <footer className="w-[100%] min-h-[10vh] text-white bg-slate-900 p-4">
      <div className="container">
        <>{children}</>
      </div>
    </footer>
  );
}

export default FooterMain;
