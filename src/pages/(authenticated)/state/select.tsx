import React, { useState, useMemo } from "react";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/router";
import type { AxiosError } from "axios";
import useAuth, { type UserMahasiswa } from "@/hooks/useAuth";
import "./state.css";

// Assets Import
import backgroundImage from "@/assets/images/background_state.webp";

// Components
import UkmCard from "@/components/state/UkmCard";

//Data UKM
import acesLogoImage from "@/assets/images/logoUkm/aces.webp";
import teaterKatakLogo from "@/assets/images/logoUkm/katak.webp";
import kspmLogo from "@/assets/images/logoUkm/kspm.webp";

// Define Ukm type - Updated to match actual database structure
interface Ukm {
  name: string;
  dateDay: number;
  id: number;
  nama: string; 
  logo: string | null;
  deskripsi: string | null;
  quota: number; 
  location: string;
  createdAt: string;
  updatedAt: string;
  dayId: number;
  filledCapacity?: number; // This might need to be calculated
}

//Filter Feature
interface DateFilterProps {
  onFilterChange: (selectedDay: number | null) => void;
  className?: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onFilterChange,
  className = "",
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [
    { number: 1, label: "Hari ke 1" },
    { number: 2, label: "Hari ke 2" },
    { number: 3, label: "Hari ke 3" },
    { number: 4, label: "Hari ke 4" },
    { number: 5, label: "Hari ke 5" },
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
          {days.map((day) => (
            <button
              key={day.number}
              className={`day-button ${
                selectedDay === day.number ? "selected" : ""
              }`}
              onClick={() => handleDayClick(day.number)}
              title={day.label}
              aria-label={day.label}
            >
              {day.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Select = () => {
  const api = useApi();
  const auth = useAuth();

  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: ukm,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ukm"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<Ukm[]>>("/state/");
        console.log("=== API DEBUG ===");
        console.log("Full Response:", response);
        console.log("Response Data:", response.data);
        console.log("Response Status:", response.status);
        
        let rawData: Ukm[] = [];
        
        // Handle different response structures
        if (response.data?.data && Array.isArray(response.data.data)) {
          rawData = response.data.data;
          console.log("Using response.data.data:", rawData);
        } else if (Array.isArray(response.data)) {
          rawData = response.data;
          console.log("Using response.data directly:", rawData);
        } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
          // Handle case where data might be wrapped differently
          console.log("Response data is object, checking properties:", Object.keys(response.data));
          return [];
        } else {
          console.warn("Unexpected response structure:", response.data);
          return [];
        }

        console.log("Raw data before transformation:", rawData);
        console.log("Raw data length:", rawData.length);

        if (!Array.isArray(rawData) || rawData.length === 0) {
          console.warn("No data found or data is not an array");
          return [];
        }

        // Transform data to match expected format
        const transformedData = rawData.map((item, index) => {
          console.log(`Transforming item ${index}:`, item);
          
          const transformed = {
            ...item,
            // Map database fields to expected fields for backward compatibility
            name: item.nama || item.name || 'Unnamed State',
            capacity: item.quota || 0,
            dateDay: item.dayId || item.dateDay || 1,
            // Generate date based on dayId
            date: getDateByDayId(item.dayId || item.dateDay || 1),
            // Set default filledCapacity
            filledCapacity: item.filledCapacity || 0,
            // Handle null logo
            logo: item.logo || '/default-logo.png',
          };
          
          console.log(`Transformed item ${index}:`, transformed);
          return transformed;
        });

        console.log("Final transformed data:", transformedData);
        return transformedData;
      } catch (error) {
        console.error("API Error:", error);
        console.error("Error details:", error.response?.data);
        console.error("Error status:", error.response?.status);
        throw error;
      }
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
    staleTime: 5 * 60 * 1000,
    // Add default data to prevent undefined issues
    initialData: [],
  });

  // Helper function to convert dayId to date string (moved outside queryFn)
  const getDateByDayId = (dayId: number): string => {
    const dates = {
      1: "13 Agustus 1945",
      2: "14 Agustus 1945", 
      3: "15 Agustus 1945",
      4: "16 Agustus 1945",
      5: "17 Agustus 1945"
    };
    return dates[dayId as keyof typeof dates] || `Hari ke-${dayId}`;
  };

  // useMemo untuk filtered data
  const filteredUkm = useMemo(() => {
    console.log("=== FILTERING DEBUG ===");
    console.log("Raw ukm data:", ukm);
    console.log("Selected filter:", selectedFilter);
    console.log("Search term:", searchTerm);
    
    let filtered = Array.isArray(ukm) ? ukm : [];
    console.log("Initial filtered array:", filtered);
    
    if (selectedFilter !== null) {
      const beforeFilter = filtered.length;
      filtered = filtered.filter((item) => {
        const matchesDayId = item.dayId === selectedFilter;
        const matchesDateDay = item.dateDay === selectedFilter;
        console.log(`Item ${item.id} (${item.nama}): dayId=${item.dayId}, dateDay=${item.dateDay}, matches=${matchesDayId || matchesDateDay}`);
        return matchesDayId || matchesDateDay;
      });
      console.log(`Day filter: ${beforeFilter} -> ${filtered.length} items`);
    }
    
    if (searchTerm.trim() !== "") {
      const beforeSearch = filtered.length;
      filtered = filtered.filter((item) => {
        const name = item.name || item.nama || '';
        const matches = name.toLowerCase().includes(searchTerm.toLowerCase());
        console.log(`Item ${item.id} name="${name}" matches search "${searchTerm}": ${matches}`);
        return matches;
      });
      console.log(`Search filter: ${beforeSearch} -> ${filtered.length} items`);
    }
    
    console.log("Final filtered result:", filtered);
    return filtered;
  }, [selectedFilter, searchTerm, ukm]);

  const handleFilterChange = (day: number | null) => {
    setSelectedFilter(day);
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
        <div className="relative z-10 px-6 py-8 md:px-12 md:py-16 flex flex-col justify-center items-center min-h-[80vh]">
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
              {selectedFilter
                ? (() => {
                    const ukmForDay = (ukm ?? []).find(
                      (item) => item.dateDay === selectedFilter || item.dayId === selectedFilter
                    );
                    return ukmForDay
                      ? (ukmForDay.date || getDateByDayId(ukmForDay.dayId))
                      : `Hari ke-${selectedFilter}`;
                  })()
                : `13 - 17 Agustus 1945`}
            </p>
          </div>

          {/* Cards Section */}
          <div className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {filteredUkm && filteredUkm.length > 0 ? (
              filteredUkm.map((item) => {
                console.log("Rendering UkmCard for:", item);
                return (
                  <UkmCard
                    key={item.id}
                    stateId={item.id}
                    stateName={item.name || item.nama || 'Unknown State'}
                    stateDate={item.date || getDateByDayId(item.dayId || item.dateDay || 1)}
                    stateLocation={item.location || 'Unknown Location'}
                    stateCapacity={item.capacity || item.quota || 0}
                    currentFilledCapacity={item.filledCapacity || 0}
                    ukmLogo={item.logo || '/default-logo.png'}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <p className="text-white text-lg">
                  {ukm && ukm.length > 0 ? "No items match your filter/search" : "No data available"}
                </p>
                <p className="text-white text-sm mt-2">
                  Raw data count: {ukm?.length || 0}
                </p>
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredUkm.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-lg">
                <p className="text-xl text-gray-600 mb-2">
                  Tidak ada UKM untuk dari hari yang kamu pilih atau kamu cari
                </p>
                <p className="text-gray-500">
                  Pastikan kamu telah memilih hari yang benar dan sesuai dengan
                  pencarianmu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;