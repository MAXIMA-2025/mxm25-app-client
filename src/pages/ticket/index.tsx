import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import QRCode from "qrcode";

// QR Code component using qrcode library
const QRCodeCanvas: React.FC<{ value: string; size: number }> = ({
  value,
  size,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }).catch((err) => {
        console.error("Error generating QR code:", err);
      });
    }
  }, [value, size]);

  return <canvas ref={canvasRef} className="rounded border border-gray-300" />;
};

export default function TicketPage() {
  const [searchParams] = useSearchParams();

  // Perbaikan: ambil parameter ticketId bukan token
  let ticketId = searchParams.get("ticketId") || null;

  // Fallback parsing manual jika ticketId tidak ditemukan
  if (!ticketId) {
    const urlParams = window.location.search;
    // Handle case jika URL berbentuk ?ticketId=value
    const match = urlParams.match(/[?&]ticketId=([^&]*)/);
    if (match) {
      ticketId = decodeURIComponent(match[1]);
    }
    // Handle case jika URL berbentuk ?=value (fallback)
    else if (urlParams.startsWith("?=")) {
      ticketId = urlParams.substring(2);
    }
    // Handle case jika URL berbentuk ?value (tanpa parameter name)
    else if (urlParams.startsWith("?") && !urlParams.includes("=")) {
      ticketId = urlParams.substring(1);
    }
  }

  if (!ticketId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            ❌
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Ticket ID Tidak Ditemukan
          </h1>
          <p className="text-gray-600 text-sm">
            Ticket ID tidak ditemukan di URL. Pastikan Anda mengakses link yang
            benar dari email dengan format: /ticket?ticketId=YOUR_ID
          </p>
        </div>
      </div>
    );
  }

  const qrCodeUrl = `https://maximaumn.id/verify-ticket/${ticketId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🎫
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tiket Konser Anda
          </h1>
          <p className="text-gray-600 text-sm">
            Tunjukkan QR Code ini kepada petugas saat masuk venue
          </p>
        </div>

        {/* QR Code */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <QRCodeCanvas value={qrCodeUrl} size={200} />
          </div>
        </div>

        {/* Ticket Info */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              TICKET ID
            </p>
            <p className="font-mono text-sm text-gray-800 break-all">
              {ticketId}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="text-blue-600 text-lg">ℹ️</div>
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Petunjuk Penggunaan:
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Simpan halaman ini atau screenshot QR Code</li>
                <li>• Datang 30 menit sebelum acara dimulai</li>
                <li>• Tunjukkan QR Code kepada petugas</li>
                <li>• Pastikan layar cukup terang agar mudah di-scan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Maxima 2025 - Terima kasih telah bergabung! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
