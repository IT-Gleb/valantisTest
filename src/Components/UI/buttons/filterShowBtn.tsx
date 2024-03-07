function FilterShowBtn({
  setShowFilter,
  paramTitle,
}: {
  setShowFilter: () => void;
  paramTitle: string;
}) {
  return (
    <button
      className="min-w-[32px] h-[2.4rem] pt-2 pb-2 pr-2 pl-8 relative bg-slate-200 text-slate-800 rounded-md border-2 border-slate-600/35 text-[0.7rem]/[1rem] transition-all hover:bg-slate-300 hover:text-blue-900 hover:border-blue-900 hover:-translate-y-[4px] active:scale-75"
      title={paramTitle}
      onClick={(e) => {
        e.preventDefault();
        setShowFilter();
      }}
    >
      {paramTitle}
      <div className="block w-fit absolute left-1 top-1">
        <img
          src={"../../src/assets/images/filter.png"}
          alt={paramTitle}
          loading="lazy"
        />
      </div>
    </button>
  );
}

export default FilterShowBtn;
