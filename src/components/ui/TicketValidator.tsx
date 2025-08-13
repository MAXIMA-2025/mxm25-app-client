import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

// struktur respons
interface TicketData {
  nama: string;
  email: string;
  noHp: string;
  jenisTicket: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: TicketData;
}

interface TicketValidatorProps {
  ticketId: string;
}

type LoadingState = "loading" | "success" | "error";

const TicketValidator: React.FC<TicketValidatorProps> = ({ ticketId }) => {
  const [state, setState] = useState<LoadingState>("loading");
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchTicketData = async () => {
    try {
      setState("loading");
      setError("");

      const apiUrl = `${import.meta.env.VITE_API_URL}/ticket/detail/${ticketId}`;
      console.log("Fetching:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      const responseText = await response.text();
      console.log("Response body:", responseText);

      if (response.status === 404) {
        setState("error");
        setError("Ticket not found. Please check your ticket ID.");
        return;
      }

      if (!response.ok) {
        setState("error");
        setError(`Server error: ${response.status} ${response.statusText}`);
        return;
      }

      let result: ApiResponse;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        setState("error");
        setError(
          `Invalid response format. Expected JSON but got: ${responseText.substring(
            0,
            100
          )}...`
        );
        return;
      }

      if (result.status === "success" && result.data) {
        setTicketData(result.data);
        setState("success");
      } else {
        setState("error");
        setError(result.message || "Failed to retrieve ticket data");
      }
    } catch (err) {
      setState("error");
      if (err instanceof Error) {
        setError(`Network error: ${err.message}`);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicketData();
    }
  }, [ticketId]);

  const handleRetry = () => {
    fetchTicketData();
  };

  if (state === "loading") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Validating Ticket
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your ticket ID: {ticketId}
          </p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Validation Failed
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Ticket ID: {ticketId}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state === "success" && ticketData) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <h2 className="text-2xl font-bold">Ticket Valid!</h2>
          <p className="text-green-100">
            Your ticket has been verified successfully
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ticket Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ticket Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded">
                    {ticketData.nama}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded">
                    {ticketData.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded">
                    {ticketData.noHp}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ticket Type
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded">
                    {ticketData.jenisTicket}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ticket ID
                  </label>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded font-mono">
                    {ticketId}
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                QR Code
              </h3>

              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                <QRCode
                  value={ticketId}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Show this QR code at the event entrance
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-blue-500 text-xl mr-3">ℹ️</div>
                <div>
                  <h4 className="text-blue-800 font-medium mb-1">
                    Important Notes
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Please arrive 30 minutes before the event starts</li>
                    <li>• This QR code is unique to your ticket</li>
                    <li>• Keep this page accessible on your device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TicketValidator;
