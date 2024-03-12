interface DashboardAssignedUsersProps {
  connections: UserProps[];
}
const DashboardAssignedUsers = ({
  connections,
}: DashboardAssignedUsersProps) => {
  return (
    <div className="flex">
      {connections.map((user, index) => {
        if (index < 3) {
          return (
            <div
              key={index}
              className="w-10 h-10 rounded-full overflow-hidden border-slate-500 border-[.5px]"
              style={{
                zIndex: connections.length - index,
                transform: `translateX(-${index * 10}px)`,
              }}
            >
              <img src={user.avatar} alt="User" />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="w-10 h-10 rounded-full overflow-hidden border-slate-500 border-[.5px] flex items-center justify-center bg-slate-500 text-white font-bold"
              style={{
                zIndex: connections.length - index,
                transform: `translateX(-${index * 10}px)`,
              }}
            >
              +{connections.length - 3}
            </div>
          );
        }
      })}
    </div>
  );
};

export default DashboardAssignedUsers;
