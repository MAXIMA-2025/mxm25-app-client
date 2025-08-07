import React, { useEffect, useState } from "react";
import useApi, { ApiResponse } from "@/hooks/useApi";
import useAuth, { type Auth, type UserEksternal } from "@/hooks/useAuth"; // 🔥 Tambahkan ini
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Bg_desktop from "@/assets/asset_station/station_bg_desktop.webp";
import { useNavigate } from "@/router";
import { z } from "zod";
import { toast } from "sonner";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import poster from "@/assets/images/main/FEEDS.webp";
import logo from "/favicon.png";
import { Download, User, Phone, Mail, Ticket } from "lucide-react";
import SadFace from "@/assets/asset_station/sad.gif";

type TicketData = {
  id: number;
  userId: number;
  namaDepan: string;
  namaBelakang: string;
  email: string;
  noTelp: string;
  jumlahTiket: number;
  ticketId: string;
  isPaid: boolean;
  isCheckedIn: boolean;
  createdAt: string;
  updatedAt: string;
};

const tickets = () => {
  const api = useApi();
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery<any>({
    queryKey: ["myTickets"],
    queryFn: async () => {
      try {
        const response = await api.get("ticket/eksternal/ticket", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data);
        return response.data;
      } catch (error: any) {
        // Handle 404 as "no tickets found" instead of error
        if (error.response?.status === 404) {
          console.log("No tickets found (404) - returning empty array");
          return []; // Return empty array for 404, not an error
        }

        // Handle other 4xx errors that might indicate "no data"
        if (error.response?.status === 204 || error.response?.status === 400) {
          console.log(
            `No content found (${error.response.status}) - returning empty array`
          );
          return [];
        }

        // For other errors, re-throw to be handled by error state
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
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

  // Process the API response to ensure we have an array
  const tickets = React.useMemo(() => {
    // If loading or no response yet, return empty array
    if (!apiResponse) return [];

    // Handle different possible response structures
    if (Array.isArray(apiResponse)) {
      return apiResponse.length > 0 ? apiResponse : [];
    }

    // If response has data property that contains array
    if (apiResponse.data && Array.isArray(apiResponse.data)) {
      return apiResponse.data.length > 0 ? apiResponse.data : [];
    }

    // If response has tickets property that contains array
    if (apiResponse.tickets && Array.isArray(apiResponse.tickets)) {
      return apiResponse.tickets.length > 0 ? apiResponse.tickets : [];
    }

    // If response has items property that contains array
    if (apiResponse.items && Array.isArray(apiResponse.items)) {
      return apiResponse.items.length > 0 ? apiResponse.items : [];
    }

    // If response has results property that contains array
    if (apiResponse.results && Array.isArray(apiResponse.results)) {
      return apiResponse.results.length > 0 ? apiResponse.results : [];
    }

    // If single ticket object, wrap in array
    if (typeof apiResponse === "object" && apiResponse.id) {
      return [apiResponse];
    }

    // Handle empty response cases
    if (
      apiResponse === null ||
      apiResponse === undefined ||
      (typeof apiResponse === "object" && Object.keys(apiResponse).length === 0)
    ) {
      return [];
    }

    // Handle response with success/status indicators but empty data
    if (
      apiResponse.success === false ||
      apiResponse.status === "empty" ||
      apiResponse.count === 0
    ) {
      return [];
    }

    console.warn("Unexpected API response structure:", apiResponse);
    return [];
  }, [apiResponse]);

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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Tiket Ku
          </h1>
          <div className="mt-4 w-50 mx-auto">
            <div className="bg-[#f2ca45] px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-[#2B2B2B]">
                Total: {tickets.length} tiket
              </span>
            </div>
          </div>
        </div>
        {/* Tickets Grid */}
        <div className="space-y-6">
          {tickets.length === 0 ? (
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
            tickets.map((ticket) => (
              <div key={ticket.id} className="flex flex-col md:flex-row w-full">
                {/* Left Section - Ticket Details */}
                <Card
                  className="font-futura border-4 w-full border-primary md:rounded-r-none md:border-r-0 md:border-b-4 md:w-[75%] lg:w-[800px] bg-gradient-to-r from-white from-50% to-100% to-secondary rounded-b-none md:rounded-b-xl"
                  style={{
                    borderBottom: window.innerWidth <= 768 ? "0px" : undefined,
                  }}
                >
                  <CardHeader className="pb-4">
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
                  className="font-futura border-4 w-full border-primary md:rounded-l-none md:border-l-0 md:w-[25%] lg:w-[300px] bg-gradient-to-r from-secondary from-0% to-100% to-white rounded-t-none md:rounded-t-xl border-t-0 md:border-t-4"
                  style={{
                    borderLeft:
                      window.innerWidth >= 768
                        ? "4px dashed var(--primary)"
                        : undefined,
                    borderTop:
                      window.innerWidth <= 768
                        ? "4px dashed var(--primary)"
                        : undefined,
                  }}
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[200px] md:min-h-full">
                    <div className="text-center space-y-3">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`}
                          alt={`QR Code for ${ticket.ticketId}`}
                          className="w-40 h-40 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <Button
                          onClick={() =>
                            handleDownloadQR(
                              ticket.ticketId,
                              `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`
                            )
                          }
                          className="cursor-pointer bg-[#90171a] hover:bg-[#701419] text-white text-xs px-3 py-2 rounded-lg flex items-center space-x-2 w-full justify-center transition-colors duration-200"
                        >
                          <Download size={14} />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default tickets;
