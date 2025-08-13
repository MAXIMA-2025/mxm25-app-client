import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Download, TicketCheckIcon } from "lucide-react";
import logo from "@/assets/images/logo.png";

interface TicketData {
  namaDepan: string;
  namaBelakang: string;
  email: string;
  noTelp: string;
  ticketId: string;
  isCheckedIn: boolean;
}

interface ApiResponse {
  status: string;
  message: string;
  data: TicketData;
}

interface TicketValidatorProps {
  ticketId: string;
}

const TicketValidator: React.FC<TicketValidatorProps> = ({ ticketId }) => {
  const { data, isLoading, isError, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["ticketDetail", ticketId],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_API_URL}/ticket/detail/${ticketId}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const result: ApiResponse = await res.json();
      if (result.status !== "success") {
        throw new Error(result.message || "Failed to retrieve ticket data");
      }
      return result.data;
    },
    enabled: !!ticketId,
    retry: false,
  });

  const handleDownloadQR = (ticketId: string, qrUrl: string) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `ticket-${ticketId}.png`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Validating Ticket</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <p className="mb-4">{(error as Error).message}</p>
        <Button onClick={() => refetch()} variant="clay">
          Try Again
        </Button>
      </div>
    );
  }

  if (!data?.data) return null;

  const ticket = data.data;

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Section - Ticket Info */}
      <Card className="font-futura border-4 w-full border-primary border-b-0 md:rounded-r-none md:border-r-0 md:border-b-4 bg-gradient-to-b md:bg-gradient-to-r from-white from-50% to-100% to-yellow-200 rounded-b-none md:rounded-bl-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img src={logo} className="h-8 sm:h-10 aspect-auto flex-shrink-0" />
            <div className="flex flex-col text-center sm:text-left">
              <CardTitle>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  TIKET STATION MAXIMA 2025
                </h2>
              </CardTitle>
              <CardDescription className="text-sm">
                Detail tiket dan informasi pemegang tiket
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                  <User size={18} className="text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Nama Pemegang Tiket
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                    {ticket.namaDepan} {ticket.namaBelakang}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                  <Mail size={18} className="text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-all">
                    {ticket.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                  <Phone size={18} className="text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Nomor Telepon
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {ticket.noTelp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Section - QR Code */}
      <Card
        className="
          flex flex-col gap-4 items-center justify-evenly shadow-2xl font-futura
          w-auto rounded-t-none md:rounded-tr-2xl md:rounded-l-none
          border-4 border-primary
          [border-top-style:dashed] [border-left-style:solid]
          md:[border-top-style:solid] md:[border-left-style:dashed]
        "
      >
        {ticket.isCheckedIn ? (
          <div className="flex flex-col items-center gap-2">
            <TicketCheckIcon className="size-12 md:size-18 text-red-700" />
            <h1 className="font-black text-center p-2 px-4 text-red-700 text-4xl md:text-nowrap">
              CHECKED IN
            </h1>
          </div>
        ) : (
          <>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`}
              alt={`QR Code for ${ticket.ticketId}`}
              className="size-40 aspect-square mx-14"
              loading="lazy"
            />
            <Button
              onClick={() =>
                handleDownloadQR(
                  ticket.ticketId,
                  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`
                )
              }
              className="w-10/12"
              variant="clay"
            >
              <Download size={14} />
              <span>Download</span>
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default TicketValidator;
