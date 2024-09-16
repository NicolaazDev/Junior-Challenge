"use client";

import RingFormModal from "@/components/createModal";
import DeleteRingModal from "@/components/deleteModal";
import EditRingModal from "@/components/editModal";
import { getRings } from "@/services/rings";
import { RingPropsArray } from "@/types/rings";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";

const Home: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  const [rings, setRings] = useState<RingPropsArray[]>([]);

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [ringId, setRingId] = useState("");

  useEffect(() => {
    getRings().then((ringsArray) => {
      setRings(ringsArray);
    });
  }, []);

  const handleEditRing = (ringId: string) => {
    setRingId(ringId);
    setModalEditOpen(true);
  };

  const handleDeleteRing = (ringId: string) => {
    setRingId(ringId);
    setModalDeleteOpen(true);
  };

  return (
    <main className="relative min-h-screen py-4 bg-foreground center-col">
      <button
        onClick={() => setModalCreateOpen(true)}
        className="w-fit px-7 h-[50px] rounded-lg text-background bg-[#7d4911]"
      >
        Adicionar Novo Anel
      </button>

      <div className="w-full max-w-2xl mx-auto p-4 slider-container">
        <Slider arrows={false} dotsClass="slick-dots dots" {...settings}>
          {rings &&
            rings.map((ring, index) => (
              <div key={index} className="!center w-full ">
                <div className="w-full h-auto center bg-transparent">
                  <div className="w-[98%] center-col h-auto border-[2px] border-solid border-primary-foreground rounded-md overflow-hidden">
                    <img
                      src={ring.imagem}
                      alt={ring.nome}
                      className="w-auto h-[160px] my-4"
                    />
                    <div className="p-4 pt-8 bg-[#fffbef] text-white w-full h-fit grid gap-2 gap-y-6 grid-cols-2">
                      <div className="col-span-2 ring-item ring-title before:content-['Nome']">
                        <h2 className="text-[18px] font-facundoBold tracking-wider uppercase">
                          {ring.nome}
                        </h2>
                      </div>

                      <div className="col-span-2 ring-item before:content-['Poder']">
                        <h2 className="text-[14px] font-facundoLight tracking-wider">
                          {ring.poder}
                        </h2>
                      </div>

                      <div className="col-span-1 ring-item before:content-['Portador']">
                        <h2 className="text-[14px] font-facundoLight tracking-wider">
                          {ring.portador}
                        </h2>
                      </div>

                      <div className="col-span-1 ring-item before:content-['Forjador']">
                        <h2 className="text-[14px] font-facundoLight tracking-wider">
                          {ring.forjadoPor}
                        </h2>
                      </div>

                      <div className="col-span-2 center -mt-5 space-x-3">
                        <button
                          onClick={() => handleDeleteRing(ring.id)}
                          className="w-full h-[45px] mt-4 rounded-lg text-background bg-[#f98181]"
                        >
                          Deletar
                        </button>
                        <button
                          onClick={() => handleEditRing(ring.id)}
                          className="w-full h-[45px] mt-4 rounded-lg text-background bg-[#f4b254]"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <RingFormModal
        isOpen={modalCreateOpen}
        onRequestClose={() => setModalCreateOpen(false)}
      />

      <EditRingModal
        ringId={ringId}
        isOpen={modalEditOpen}
        onRequestClose={() => setModalEditOpen(false)}
      />

      <DeleteRingModal
        ringId={ringId}
        isOpen={modalDeleteOpen}
        onRequestClose={() => setModalDeleteOpen(false)}
      />
    </main>
  );
};

export default Home;
