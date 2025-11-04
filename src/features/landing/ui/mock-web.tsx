import { SearchBar } from "@/features/landing/ui/search-bar";

export const MockWeb = () => {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="h-[570px] w-full flex bg-gradient-to- border to-transparent border-primary/10">
        image
      </div>
    </div>
  );
};
