import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/images/main/STATION.webp";
import { useNavigate } from "@/router";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import logo from "/favicon.png";
import {
  Download,
  User,
  Phone,
  Mail,
  TicketCheckIcon,
  IdCard,
} from "lucide-react";
import SadFace from "@/assets/asset_station/sad.gif";
import type { AxiosError } from "axios";
import useAuth, { type UserMahasiswa } from "@/hooks/useAuth";

type TicketData = {
  id: number;
  userId: number;
  namaDepan: string;
  namaBelakang: string;
  email: string;
  noTelp: string;
  ticketId: string;
  isPaid: boolean;
  isCheckedIn: boolean;
  createdAt: string;
  updatedAt: string;
};

const Tickets = () => {
  const api = useApi();
  const auth = useAuth();
  const {
    data: tickets,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myTickets"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<TicketData[]>>("/ticket/me");
      return response.data.data;
    },
    retry: (failureCount, error: AxiosError) => {
      // Don't retry on 404, 400, or 204 - these are not network errors
      if (
        error?.response?.status === 404 ||
        error?.response?.status === 400 ||
        error?.response?.status === 204
      ) {
        return false;
      }
      // Only retry on actual network errors, max 1 retry
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleDownloadQR = async (ticketId: string, qrCodeUrl: string) => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-code-${ticketId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const nav = useNavigate();

  const handleBuyTicketClick = () => {
    nav("/station");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90171a] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat tiket Anda...</p>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-red-500">
        Gagal mengambil tiket. {(error as Error).message}
      </p>
    );

  return (
    <section
      className="py-10 min-h-screen min-w-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Bg_desktop})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-2/3 md:w-3/4 mx-auto">
        {/* Header */}
        <div className="mb-8 justify-center text-center">
          <h1 className="text-4xl font-fraunces sm:text-4xl font-bold text-gray-900 mb-2">
            Tiket Saya
          </h1>
          <div className="mt-4 w-50 mx-auto">
            <div className="bg-[#f2ca45] shadow-2xl px-3 py-1 rounded-full">
              <span className="font-futura font-medium text-md text-[#2B2B2B]">
                Total: {tickets?.length} tiket
              </span>
            </div>
          </div>
        </div>
        {/* Tickets Grid */}
        <div className="space-y-6">
          {tickets?.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 space-y-4">
              <img
                src={SadFace}
                alt="Wajah sedih kartun"
                className="w-32 h-32"
              />
              <p className="text-gray-600 text-lg font-medium">
                Yahh kamu belum memiliki tiket...
              </p>
              <Button className="cursor-pointer" onClick={handleBuyTicketClick}>
                Yuk Beli Tiket
              </Button>
            </div>
          ) : (
            tickets?.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col justify-center md:flex-row w-full"
              >
                {/* Left Section - Ticket Details */}
                {auth.user?.role === "mahasiswa" ? (
                  <>
                    <Card className="font-futura border-4 w-full border-primary border-b-0 md:rounded-r-none md:border-r-0 md:border-b-4  bg-gradient-to-b md:bg-gradient-to-r from-white from-30% to-100%  to-yellow-200 rounded-b-none md:rounded-bl-2xl">
                      <CardHeader className="">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <img
                            src={logo}
                            className="h-8 sm:h-10 aspect-auto flex-shrink-0"
                          />
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
                          {/* User Details */}
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                                <User size={18} className="text-gray-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                  Nama Pemegang Tiket
                                </p>
                                <p className="text-sm sm:text-lg font-medium text-gray-900 break-words">
                                  {(auth.user as UserMahasiswa)?.nama}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                                <IdCard size={18} className="text-gray-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                  NIM
                                </p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">
                                  {(auth.user as UserMahasiswa)?.nim}
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
                                <p className="text-sm sm:text-base font-medium text-gray-900 break-all">
                                  {(auth.user as UserMahasiswa)?.email}
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
                    /* styles swap by breakpoint */
                    [border-top-style:dashed] [border-left-style:solid]
                    md:[border-top-style:solid] md:[border-left-style:dashed]
                  "
                    >
                      {ticket.isCheckedIn ? (
                        <div className="flex flex-col  items-center gap-2">
                          <TicketCheckIcon className="size-12 md:size-18 text-red-700" />
                          <h1 className=" font-black text-center p-2 px-4 text-red-700 text-4xl md:text-nowrap">
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
                  </>
                ) : (
                  <>
                    {" "}
                    <Card className="font-futura border-4 w-full border-primary border-b-0 md:rounded-r-none md:border-r-0 md:border-b-4  bg-gradient-to-b md:bg-gradient-to-r from-white from-30% to-100%  to-red-300 rounded-b-none md:rounded-bl-2xl">
                      <CardHeader className="">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <img
                            src={logo}
                            className="h-8 sm:h-10 aspect-auto flex-shrink-0"
                          />
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
                          {/* User Details */}
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                                <User size={18} className="text-gray-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                  Nama Pemegang Tiket
                                </p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">
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
                                <p className="text-sm sm:text-base font-medium text-gray-900">
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
                                <p className="text-sm sm:text-base font-medium text-gray-900">
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
                    /* styles swap by breakpoint */
                    [border-top-style:dashed] [border-left-style:solid]
                    md:[border-top-style:solid] md:[border-left-style:dashed]
                  "
                    >
                      {ticket.isCheckedIn ? (
                        <div className="flex flex-col  items-center gap-2">
                          <TicketCheckIcon className="size-12 md:size-18 text-red-700" />
                          <h1 className=" font-black text-center p-2 px-4 text-red-700 text-4xl md:text-nowrap">
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
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Tickets;
