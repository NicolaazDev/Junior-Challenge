import React from "react";
import Modal from "react-modal";
import { deleteRing } from "@/services/rings";

interface DeleteRingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ringId: string;
}

const DeleteRingModal: React.FC<DeleteRingModalProps> = ({
  isOpen,
  onRequestClose,
  ringId,
}) => {
  const handleFormSubmit = async () => {
    try {
      await deleteRing(ringId);
      onRequestClose();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Deletar o Anel"
      className="absolute h-min max-w-xl mx-auto translate-y-[10%] !bg-foreground rounded-lg border border-solid border-background inset-[40px] p-[20px]"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2 className="text-4xl font-facundoBold text-background mb-4 w-full text-center">
        Deletar Anel
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-4 w-full center">
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-destructive text-white px-4 py-2 w-full rounded"
        >
          Deleter mesmo assim
        </button>
      </form>
    </Modal>
  );
};

export default DeleteRingModal;
