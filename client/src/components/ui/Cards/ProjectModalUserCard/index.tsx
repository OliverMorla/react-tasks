import Button from "@/components/shared/ui/Button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const NewProjectModalUserCard: React.FunctionComponent<
  NewProjectModalUserCardProps
> = ({ name, photoUrl, ...props }) => {
  return (
    <div
      className="relative text-center flex flex-col items-center justify-center min-w-fit"
      {...props}
    >
      <img
        src={photoUrl}
        alt={name}
        width={35}
        height={35}
        className="rounded-full"
      />
      <span className="text-sm opacity-80">{name}</span>
      <Button
        name={name}
        fontAwesomeIconUrl={faPlusCircle}
        variant="clear"
        onClick={() => console.log("clicked")}
        type="button"
        className="absolute right-0 top-0 hover:text-[var(--color-primary)] transition-all"
      />
    </div>
  );
};

export default NewProjectModalUserCard;
