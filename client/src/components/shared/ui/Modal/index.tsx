import { messageIcons } from "@/entities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/shared/ui/Button";

const Modal = ({ title, desc, setShowModal, showModal, type }: ModalProps) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full flex flex-col flex-1 items-center justify-center">
      <div className="bg-[--color-text-lighter] opacity-90 h-full w-full absolute z-0"></div>
      <div className="relative z-10">
        <FontAwesomeIcon
          icon={messageIcons[type]}
          className="text-[#fff] text-9xl"
        />
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <h1 className="mr-0">{title}</h1>
            <Button
              name="exit-modal-button"
              presetIcon="closeCircle"
              className="ml-auto"
              onClick={() => setShowModal(!showModal)}
            />
          </div>
          <p className="opacity-60">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
