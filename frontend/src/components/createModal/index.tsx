import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";
import { createRing } from "@/services/rings";
import { RingProps } from "@/types/rings";

const ringSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  power: z.string().min(1, { message: "O poder é obrigatório" }),
  bearer: z.string().min(1, { message: "O portador é obrigatório" }),
  forgedBy: z.string().min(1, { message: "Quem forjou o anel é obrigatório" }),
});

type RingFormData = z.infer<typeof ringSchema>;

interface RingFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RingFormModal: React.FC<RingFormModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<RingFormData>({
    resolver: zodResolver(ringSchema),
  });

  const handleFormSubmit = async (data: RingFormData) => {
    const formatedData: RingProps = {
      nome: data.name,
      forjadoPor: data.forgedBy,
      imagem:
        "https://res.cloudinary.com/do9d7j6b3/image/upload/v1726462235/Ring_bk8cbj.webp",
      poder: data.power,
      portador: data.bearer,
    };

    try {
      await createRing(formatedData);
      onRequestClose();
    } catch (error) {
      alert("Error ao criar anel, tente novamente");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        clearErrors();
        reset();
        onRequestClose();
      }}
      contentLabel="Criar Anel"
      className="absolute  mx-auto max-w-3xl !bg-foreground rounded-lg border border-solid border-background inset-[40px] p-[20px]"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2 className="text-4xl font-facundoBold text-background mb-4 w-full text-center">
        Criar Novo Anel
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <InputField
          label="Nome"
          id="name"
          error={errors.name}
          register={register("name")}
          placeholder="Digite o nome do anel"
        />
        <InputField
          label="Poder"
          id="power"
          error={errors.power}
          register={register("power")}
          placeholder="Descreva o poder do anel"
        />
        <InputField
          label="Portador"
          id="bearer"
          error={errors.bearer}
          register={register("bearer")}
          placeholder="Nome do portador"
        />
        <InputField
          label="Forjado Por"
          id="forgedBy"
          error={errors.forgedBy}
          register={register("forgedBy")}
          placeholder="Quem forjou o anel"
        />

        <div className="center-col w-full absolute bottom-4 left-0">
          <button
            type="submit"
            className="w-[95%] h-[50px] mt-4 rounded-lg text-background bg-primary"
          >
            Criar Anel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RingFormModal;
