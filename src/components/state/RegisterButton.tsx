import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { useNavigate } from "react-router";

//Assets
import Yakin from '@/assets/images/yakin.gif';

function RegisterButton({
  stateId,
  isFullCapacity,
  isSelected,
}: {
  stateId: number;
  isFullCapacity: boolean;
  isSelected: boolean;
}) {
  const api = useApi();
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async () => {
      const resp = await api.post("/state/register", { stateId });
      return resp.data;
    },
    onSuccess: (data) => {
      alert("Berhasil mendaftar state!");
      nav("/state", { replace: true });
      window.location.reload();
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Gagal mendaftar state!");
    },
  });

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    registerMutation.mutate();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isFullCapacity || isSelected || registerMutation.isPending}
        className={`cursor-pointer flex-1 font-bold py-3 px-9 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2
            ${
              isFullCapacity || isSelected
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-900 text-white hover:shadow-lg"
            }`}
      >
        {/* Ikon + */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>
          {isFullCapacity
            ? "Penuh"
            : isSelected
            ? "Terdaftar"
            : registerMutation.isPending
            ? "Mendaftar..."
            : "Pilih State"}
        </span>
      </button>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full h-full max-w-none max-h-none flex flex-col justify-center items-center m-0 p-0">
            <div className="flex flex-col justify-center items-center w-full h-full p-8">
              <div className="mb-4 text-center w-full justify-center">
                <img
                  src={Yakin}
                  alt="Are you sure emoji GIF"
                  loading="lazy"
                  className="w-32 h-32 object-contain mx-auto mb-4"
                />
                <p>Yakin pilih state ini?</p>
              </div>
              <div className="flex gap-2 w-full justify-center items-center align-center">
                <button
                  onClick={handleCancel}
                  className="cursor-pointer px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className="cursor-pointer px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-white"
                  disabled={registerMutation.isPending}
                >
                  Ya, Daftar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterButton;
