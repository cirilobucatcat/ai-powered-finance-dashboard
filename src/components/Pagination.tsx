const Pagination = ({ className }: { className?: string }) => {
  return (
    <div className={`w-fit text-xs space-x-1 uppercase bg-slate-950 rounded text-slate-50 py-1.5 px-1.5 ${className}`}>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>{'<<'}</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>{'<'}</button>
      <button className={`bg-slate-900 ${'text-electric-lime/50'} px-2 py-1`}>...</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>1</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime font-bold'} px-2 py-1`}>2</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>3</button>
      <button className={`bg-slate-900 ${'text-electric-lime/50'} px-2 py-1`}>...</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>{'>'}</button>
      <button className={`bg-slate-900 cursor-pointer ${'text-electric-lime/75'} px-2 py-1`}>{'>>'}</button>
    </div>
  );
};

export default Pagination;
