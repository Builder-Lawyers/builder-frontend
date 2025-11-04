export const SearchBar = () => {
  return (
    <div className="border flex items-center px-[24px] border-primary/10 justify-between rounded-t-2xl border-b-0 h-[52px] w-full">
      <div className="flex gap-2">
        <div className="h-3 rounded-full w-3 bg-green-400" />
        <div className="h-3 rounded-full w-3 bg-orange-400" />
        <div className="h-3 rounded-full w-3 bg-destructive" />
      </div>
      <div className="w-[550px] h-[28px] rounded-full bg-gray-200" />
    </div>
  );
};
