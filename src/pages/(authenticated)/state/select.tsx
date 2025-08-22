import React, { useState, useMemo } from "react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/router";
import type { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import useAuth, { type UserMahasiswa } from "@/hooks/useAuth";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import "./state.css";

// Assets Import
import backgroundImage from "@/assets/images/background_state.webp";
import stateLogo from "@/assets/images/state.webp";

// Components
import UkmCard from "@/components/state/UkmCard";

// Define Ukm type - Updated to match actual database structure
interface Ukm {
  id: number;
  nama: string;
  logo: string | null;
  description: string | null;
  quota: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  dayId: number;
  day: {
    id: number;
    date: string;
  };
  gallery: {
    id: number;
    url: string;
  };
  registrationCount: number;
}

//Define State gallery

//Filter Feature
interface DateFilterProps {
  onFilterChange: (selectedDay: number | null) => void;
  className?: string;
  availableDays: number[]; // Add this to show only available days
}

const DateFilter: React.FC<DateFilterProps> = ({
  onFilterChange,
  className = "",
  availableDays,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [
    { number: 1, label: "Hari ke 1" },
    { number: 2, label: "Hari ke 2" },
    { number: 3, label: "Hari ke 3" },
    { number: 4, label: "Hari ke 4" },
    { number: 5, label: "Hari ke 5" },
    { number: 6, label: "Hari ke 6" },
    { number: 7, label: "Hari ke 7" },
    { number: 8, label: "Hari ke 8" },
  ];

  const handleDayClick = (dayNumber: number) => {
    const newSelection = selectedDay === dayNumber ? null : dayNumber;
    setSelectedDay(newSelection);
    onFilterChange(newSelection);
  };

  return (
    <div className={`date-filter-container ${className}`}>
      <div className="filter-wrapper">
        <div className="filter-title">Hari ke</div>

        <div className="days-container">
          {days.map((day) => {
            const isAvailable = availableDays.includes(day.number);
            return (
              <button
                key={day.number}
                className={`day-button ${
                  selectedDay === day.number ? "selected" : ""
                } ${!isAvailable ? "disabled" : ""}`}
                onClick={() => isAvailable && handleDayClick(day.number)}
                disabled={!isAvailable}
                title={
                  isAvailable ? day.label : `${day.label} - Tidak tersedia`
                }
                aria-label={day.label}
              >
                {day.number}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface SelectProps {
  stateTerpilih: string[];
  slotState: number;
}

const Select: React.FC<SelectProps> = ({ stateTerpilih, slotState }) => {
  const api = useApi();
  const auth = useAuth();

  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const location = useLocation();
  const selectedDate = stateTerpilih || location.state.state;
  const slot = location.state.slotState;

  console.log(selectedDate, slot);

  const {
    data: ukmResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ukm"],
    queryFn: async () => {
      const resp = await api.get<ApiResponse<Ukm[]>>("/state/");
      // Format tanggal pada setiap item UKM
      const formattedData =
        resp.data.data?.map((item) => {
          let formattedDate = item.day?.date;
          if (formattedDate) {
            try {
              const parsed = parseISO(formattedDate);
              formattedDate = format(parsed, "EEEE dd MMMM yyyy", {
                locale: localeId,
              });
              // Capitalize first letter (karena format dari date-fns lowercase)
              formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            } catch {
              // fallback jika gagal parsing
            }
          }
          return {
            ...item,
            day: {
              ...item.day,
              date: formattedDate,
            },
          };
        }) ?? [];
      return {
        ...resp.data,
        data: formattedData,
      };
    },
  });

  // Extract the actual array of UKM from the API response
  const ukm: Ukm[] = ukmResponse?.data ?? [];

  // Get available days from the actual data
  const availableDays = useMemo(() => {
    if (!Array.isArray(ukm)) return [];
    const days = [...new Set(ukm.map((item) => item.dayId))].sort();
    return days;
  }, [ukm]);

  // Helper function to convert dayId to date string
  const getDateByDayId = (dayId: number): string => {
    const dates = {
      1: "13 Agustus 1945",
      2: "14 Agustus 1945",
      3: "15 Agustus 1945",
      4: "16 Agustus 1945",
      5: "17 Agustus 1945",
      6: "18 Agustus 1945",
      7: "19 Agustus 1945",
      8: "20 Agustus 1945",
    };
    return dates[dayId as keyof typeof dates] || `Hari ke-${dayId}`;
  };

  // useMemo untuk filtered data
  const filteredUkm = useMemo(() => {
    let filtered = Array.isArray(ukm) ? ukm : [];

    // Filter by day
    if (selectedFilter !== null) {
      filtered = filtered.filter((item) => item.dayId === selectedFilter);
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) => {
        const name = item.nama || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filtered;
  }, [selectedFilter, searchTerm, ukm]);

  const handleFilterChange = (day: number | null) => {
    setSelectedFilter(day);
  };

  // Get the date string for selected filter
  const getSelectedDateString = () => {
    if (!selectedFilter) return "28 Agustus - 09 September 2025";

    // Find an item with the selected dayId to get the actual date
    const ukmForDay = filteredUkm.find((item) => item.dayId === selectedFilter);
    if (ukmForDay && ukmForDay.day?.date) {
      return ukmForDay.day.date;
    }

    return getDateByDayId(selectedFilter);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#90171a] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat State...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <p className="text-red-500 text-lg font-semibold mb-4">
            Gagal memuat State
          </p>
          <p className="text-gray-600 mb-4">
            {(error as Error)?.message || "Terjadi kesalahan saat memuat data"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#90171a] text-white px-4 py-2 rounded hover:bg-[#722F37] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-image min-h-screen w-full relative overflow-x-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Pattern Overlay */}
      <div className="pattern-overlay absolute inset-0 z-0"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-yellow-400 opacity-20 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-blue-400 opacity-30 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-purple-400 opacity-15 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-8 h-8 bg-green-400 opacity-25 rounded-full blur-sm"></div>
      </div>

      {/* Main section dengan background peta yang menampilkan efek gulungan di atas */}
      <div className="peta-background w-full rounded-lg shadow-2xl relative overflow-hidden">
        {/* Overlay untuk membuat konten lebih terbaca */}
        <div className="content-overlay w-full h-full absolute inset-0"></div>

        {/* Konten utama */}
        <div className="relative z-10 px-6 py-8 md:px-12 md:py-16 flex flex-col justify-center items-center min-h-[80vh] -mt-10">
          {/* Header Section */}
          <header className="text-center mt-15 md:mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight title-shadow">
              STATE
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
              Pilih STATE kamu!
            </p>
          </header>

          {/* Date Filter */}
          <div className="mt-4 mb-8 max-w-2xl">
            <DateFilter
              onFilterChange={handleFilterChange}
              className="w-full"
              availableDays={availableDays}
            />
          </div>

          {/* Search Feature */}
          <div className="mb-8 w-full max-w-2xl bg-[#F5DEB3] rounded-xl relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#722F37]">
              {/* Search Icon SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="#722F37"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L16.65 16.65"
                  stroke="#722F37"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari STATE..."
              className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#722F37] text-lg shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Cari STATE"
            />
          </div>

          {/* Filter Status */}
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-white">
              {getSelectedDateString()}
            </p>
            {selectedFilter && (
              <p className="text-sm text-blue-100 mt-1">
                Menampilkan STATE untuk Hari ke-{selectedFilter}
              </p>
            )}
          </div>

          {/* Cards Section */}
          <div
            className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl"
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              background: "transparent",
            }}
          >
            {filteredUkm && filteredUkm.length > 0 ? (
              filteredUkm.map((item) => {
                return (
                  <UkmCard
                    key={item.id}
                    stateId={item.id}
                    stateName={item.nama}
                    stateDate={item.day?.date || getDateByDayId(item.dayId)}
                    stateLocation={item.location}
                    stateQuota={item.quota}
                    registrationCount={item.registrationCount || 0}
                    ukmLogo={item.logo || stateLogo}
                    stateDescription={item.description}
                    // onPilihState={() => {
                    //   // Handle state selection
                    // }}
                    // onInfoState={(stateId) => {
                    //   // Handle info state - you can implement modal or navigation here
                    //   // Example: show modal with state details
                    //   // showStateInfoModal(stateId);
                    // }}
                    selectedStateDate={selectedDate}
                    stateGallery={item.gallery || []}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-lg">
                  <p className="text-xl text-gray-600 mb-2">
                    {searchTerm && selectedFilter
                      ? `Tidak ada STATE yang cocok dengan pencarian "${searchTerm}" pada Hari ke-${selectedFilter}`
                      : searchTerm
                      ? `Tidak ada STATE yang cocok dengan pencarian "${searchTerm}"`
                      : selectedFilter
                      ? `Tidak ada STATE pada Hari ke-${selectedFilter}`
                      : "Belum ada STATE yang tersedia"}
                  </p>
                  <p className="text-gray-500">
                    {searchTerm || selectedFilter
                      ? "Coba ubah kriteria pencarian atau filter hari"
                      : "Data STATE akan muncul ketika sudah tersedia"}
                  </p>
                  {(searchTerm || selectedFilter) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedFilter(null);
                      }}
                      className="mt-4 bg-[#90171a] text-white px-4 py-2 rounded hover:bg-[#722F37] transition-colors"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
