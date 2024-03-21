const CollidedUserCard = ({
  connections,
}: {
  connections: ConnectionProps[] | CommentProps[];
}) => {
  return (
    <div className="flex">
      {connections.map((connection, index) => {
        if (index < 3) {
          return (
            <div
              key={index}
              className="w-10 h-10 rounded-full overflow-hidden border-gray-400 border-[.5px]"
              style={{
                zIndex: connections.length - index,
                transform: `translateX(-${index * 10}px)`,
              }}
            >
              <img
                src={connection.user?.photoUrl}
                alt={connection.user?.name}
                width={40}
                height={40}
              />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="w-10 h-10 rounded-full overflow-hidden border-gray-400 border-[.5px] flex items-center justify-center bg-gray-200 text-white font-bold"
              style={{
                zIndex: connections.length - index,
                transform: `translateX(-${index * 10}px)`,
              }}
            >
              + {connections.length - 3}
            </div>
          );
        }
      })}
    </div>
  );
};

export default CollidedUserCard;
