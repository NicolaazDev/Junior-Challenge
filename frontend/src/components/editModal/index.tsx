import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/inputField";
import api from "@/services/api";
import { RingProps } from "@/types/rings";
import { editRing, getRingById } from "@/services/rings";

const ringSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  poder: z.string().min(1, { message: "O poder é obrigatório" }),
  portador: z.string().min(1, { message: "O portador é obrigatório" }),
  forjadoPor: z
    .string()
    .min(1, { message: "Quem forjou o anel é obrigatório" }),
});

type RingFormData = z.infer<typeof ringSchema>;

interface EditRingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ringId: string;
}

const EditRingModal: React.FC<EditRingModalProps> = ({
  isOpen,
  onRequestClose,
  ringId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<RingFormData>({
    resolver: zodResolver(ringSchema),
  });

  useEffect(() => {
    if (isOpen && ringId) {
      setIsLoading(true);

      getRingById(ringId)
        .then((response) => {
          setValue("nome", response.nome);
          setValue("poder", response.poder);
          setValue("portador", response.portador);
          setValue("forjadoPor", response.forjadoPor);
        })
        .catch((error) => {
          setError("Erro ao carregar os dados do anel");
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, ringId, setValue]);

  const handleFormSubmit = async (data: RingFormData) => {
    setIsLoading(true);

    const formatedData: RingProps = {
      nome: data.nome,
      forjadoPor: data.forjadoPor,
      imagem:
        "https://res.cloudinary.com/do9d7j6b3/image/upload/v1726462235/Ring_bk8cbj.webp",
      poder: data.poder,
      portador: data.portador,
    };

    try {
      await editRing(ringId, formatedData);
      onRequestClose();
    } catch (error) {
      setError("Erro ao atualizar o anel");
      console.error(error);
    } finally {
      setIsLoading(false);
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
      contentLabel="Editar Anel"
      className="absolute h-min max-w-3xl mx-auto !bg-foreground rounded-lg border border-solid border-background inset-[40px] p-[20px]"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2 className="text-4xl font-facundoBold text-background mb-4 w-full text-center">
        Editar Anel
      </h2>
      {error && isLoading && (
        <p className="text-destructive opacity-80 mb-4">{error}</p>
      )}
      {isLoading ? (
        <p className="text-background w-full text-center">Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <InputField
            label="Nome"
            id="name"
            error={errors.nome}
            register={register("nome")}
            placeholder="Digite o nome do anel"
          />
          <InputField
            label="Poder"
            id="power"
            error={errors.poder}
            register={register("poder")}
            placeholder="Descreva o poder do anel"
          />
          <InputField
            label="Portador"
            id="bearer"
            error={errors.portador}
            register={register("portador")}
            placeholder="Nome do portador"
          />
          <InputField
            label="Forjado Por"
            id="forgedBy"
            error={errors.forjadoPor}
            register={register("forjadoPor")}
            placeholder="Quem forjou o anel"
          />

          <div className="center space-x-4">
            <button
              type="submit"
              className="w-full h-[50px] mt-4 rounded-lg text-background bg-primary"
            >
              {isLoading ? "Editando..." : "Editar Anel"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditRingModal;
