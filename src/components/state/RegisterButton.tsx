import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { useNavigate } from "react-router";

//Assets
import Yakin from "@/assets/images/yakin.gif";

//Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            onClick={handleClick}
            disabled={
              isFullCapacity || isSelected || registerMutation.isPending
            }
            className={`cursor-pointer flex-1 font-bold py-5.5 px-9 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2
            ${
              isFullCapacity || isSelected
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-red-800 text-white hover:shadow-lg"
            }`}
          >
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
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <img
              src={Yakin}
              alt="Are you sure emoji GIF"
              loading="lazy"
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <AlertDialogTitle>Kamu Yakin Pilih State Ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Setelah kamu mendaftar state ini, kamu tidak dapat membatalkan
              pendaftarannya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Tidak Jadi</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={registerMutation.isPending} className="cursor-pointer">Yakin</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default RegisterButton;
