interface UserCardProps {
  name: string;
  icon?: string;
  sub?: string;
}

export const UserCard = ({ name, sub, icon }: UserCardProps) => {
  return (
    <div className="items-center flex gap-3">
      <div className="h-[42px] rounded-full w-[42px] bg-black/10" />
      <div className="flex gap-2 group-data-[collapsible=icon]:hidden">
        <p className="text-foreground">{name}</p>
        <div>{sub}</div>
      </div>
    </div>
  );
};
