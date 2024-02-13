interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="relative z-50 w-11/12 md:w-1/2 mx-auto my-6 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-end">
          <button onClick={closeModal}>&times;</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
