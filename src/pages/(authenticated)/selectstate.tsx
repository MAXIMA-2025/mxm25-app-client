import React, { useState, useMemo } from 'react';

// Assets Import
import backgroundImage from "@/assets/images/background_state.webp";
import petaImage from "@/assets/images/peta-state.webp";
import acesLogoImage from "@/assets/images/aces.webp";

// Components
import UkmCard from "@/components/state/UkmCard";

// Date Filter Component
interface DateFilterProps {
  onFilterChange: (selectedDay: number | null) => void;
  className?: string;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange, className = "" }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = [
    { number: 1, label: "Hari ke 1" },
    { number: 2, label: "Hari ke 2" },
    { number: 3, label: "Hari ke 3" },
    { number: 4, label: "Hari ke 4" },
    { number: 5, label: "Hari ke 5" }
  ];

  const handleDayClick = (dayNumber: number) => {
    const newSelection = selectedDay === dayNumber ? null : dayNumber;
    setSelectedDay(newSelection);
    onFilterChange(newSelection);
  };

  return (
    <div className={`date-filter-container ${className}`}>
      <div className="filter-wrapper">
        <div className="filter-title">
          Hari ke
        </div>
        
        <div className="days-container">
          {days.map((day) => (
            <button
              key={day.number}
              className={`day-button ${selectedDay === day.number ? 'selected' : ''}`}
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

// Main Component
const SelectState: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);

  const dummyUkm = [
    {
      id: 1,
      name: "ACES",
      date: "13 Agustus 1945",
      dateDay: 1,
      location: "Barak Militer",
      capacity: 100,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 2,
      name: "Tech Innovators Club",
      date: "16 Agustus 1945",
      dateDay: 4,
      location: "Gedung Informatika",
      capacity: 100,
      filledCapacity: 25,
      logo: acesLogoImage,
    },
    {
      id: 3,
      name: "Green Earth Society",
      date: "15 Agustus 1945",
      dateDay: 3,
      location: "Taman Kampus",
      capacity: 100,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 4,
      name: "Art & Culture Ensemble",
      date: "14 Agustus 1945",
      dateDay: 2,
      location: "Aula Seni",
      capacity: 100,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 5,
      name: "Sports United",
      date: "17 Agustus 1945",
      dateDay: 5,
      location: "Lapangan Olahraga",
      capacity: 100,
      filledCapacity: 73,
      logo: acesLogoImage,
    },
    {
      id: 6,
      name: "Literature Circle",
      date: "13 Agustus 1945",
      dateDay: 1,
      location: "Perpustakaan",
      capacity: 100,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 7,
      name: "Entrepreneurship Hub",
      date: "15 Agustus 1945",
      dateDay: 3,
      location: "Ruang Kewirausahaan",
      capacity: 55,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 8,
      name: "Music Harmony",
      date: "16 Agustus 1945",
      dateDay: 4,
      location: "Studio Musik",
      capacity: 100,
      filledCapacity: 50,
      logo: acesLogoImage,
    },
    {
      id: 9,
      name: "Volunteer Action Team",
      date: "14 Agustus 1945",
      dateDay: 2,
      location: "Sekretariat Sosial",
      capacity: 100,
      filledCapacity: 10,
      logo: acesLogoImage,
    },
  ];

  // Filter UKM berdasarkan hari yang dipilih
  const filteredUkm = useMemo(() => {
    if (selectedFilter === null) {
      return dummyUkm;
    }
    return dummyUkm.filter(ukm => ukm.dateDay === selectedFilter);
  }, [selectedFilter, dummyUkm]);

  const handleFilterChange = (day: number | null) => {
    setSelectedFilter(day);
  };

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
      {/* Inline Styles */}
      <style jsx>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-element:nth-child(3) {
          animation-delay: -4s;
        }

        /* Main section dengan background peta yang menampilkan bagian atas */
        .peta-background {
          background-image: url('${petaImage}');
          background-size: cover;
          background-position: top center;
          background-repeat: no-repeat;
          min-height: 80vh;
          width: 85%;
        }

        /* Overlay transparan untuk konten agar tetap terbaca */
        .content-overlay {
          background: linear-gradient(
            135deg, 
            rgba(0, 0, 0, 0.3) 0%, 
            rgba(0, 0, 0, 0.1) 50%, 
            rgba(0, 0, 0, 0.2) 100%
          );
          backdrop-filter: blur(1px);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .entrance {
          animation: fade-in-up 1s ease forwards;
        }

        .title-shadow {
          text-shadow: 
            3px 3px 6px rgba(101, 67, 33, 0.8),
            6px 6px 12px rgba(0, 0, 0, 0.6),
            1px 1px 2px rgba(245, 222, 179, 0.3);
        }

        /* Date Filter Styles */
        .filter-wrapper {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
          border-radius: 25px;
          padding: 8px;
          box-shadow: 
            0 8px 32px rgba(139, 69, 19, 0.3),
            inset 0 2px 4px rgba(245, 222, 179, 0.2),
            inset 0 -2px 4px rgba(101, 67, 33, 0.3);
          position: relative;
          overflow: hidden;
        }

        .filter-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(245, 222, 179, 0.8) 0%, 
            rgba(255, 255, 255, 0.6) 50%, 
            rgba(245, 222, 179, 0.8) 100%
          );
        }

        .filter-title {
          background: linear-gradient(135deg, #722F37 0%, #8B1538 100%);
          color: #F5DEB3;
          font-weight: bold;
          font-size: 1.125rem;
          padding: 12px 24px;
          border-radius: 20px 20px 0 0;
          text-align: center;
          position: relative;
          top: -8px;
          margin: 0 -8px 8px -8px;
          box-shadow: 
            0 4px 12px rgba(139, 21, 56, 0.4),
            inset 0 1px 2px rgba(245, 222, 179, 0.3);
          letter-spacing: 0.5px;
        }

        .filter-title::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #722F37;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .days-container {
          background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%);
          border-radius: 20px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          box-shadow: 
            inset 0 2px 8px rgba(139, 69, 19, 0.1),
            inset 0 -1px 3px rgba(245, 222, 179, 0.8);
        }

        .day-button {
          background: transparent;
          border: 3px solid #722F37;
          color: #722F37;
          font-weight: bold;
          font-size: 1.5rem;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 4px 12px rgba(114, 47, 55, 0.2),
            inset 0 1px 2px rgba(245, 222, 179, 0.8);
        }

        .day-button::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(245, 222, 179, 0.9) 0%, 
            rgba(222, 184, 135, 0.7) 100%
          );
          z-index: -1;
          transition: all 0.3s ease;
        }

        .day-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 
            0 8px 20px rgba(114, 47, 55, 0.3),
            inset 0 1px 3px rgba(245, 222, 179, 0.9);
          border-color: #8B1538;
        }

        .day-button:hover::before {
          background: linear-gradient(135deg, 
            rgba(245, 222, 179, 1) 0%, 
            rgba(222, 184, 135, 0.9) 100%
          );
        }

        .day-button.selected {
          background: linear-gradient(135deg, #722F37 0%, #8B1538 100%);
          color: #F5DEB3;
          border-color: #F5DEB3;
          transform: translateY(-2px) scale(1.1);
          box-shadow: 
            0 8px 24px rgba(139, 21, 56, 0.4),
            inset 0 2px 4px rgba(245, 222, 179, 0.2),
            0 0 0 2px rgba(245, 222, 179, 0.3);
        }

        .day-button.selected::before {
          background: transparent;
        }

        .day-button:active {
          transform: translateY(-1px) scale(1.02);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .filter-title {
            font-size: 1rem;
            padding: 10px 20px;
          }
          
          .days-container {
            padding: 12px 16px;
            gap: 8px;
          }
          
          .day-button {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .days-container {
            padding: 10px 12px;
            gap: 6px;
          }
          
          .day-button {
            width: 45px;
            height: 45px;
            font-size: 1.125rem;
          }
        }
      `}</style>

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
              Lorem Dolor Ipsum Amet Sit, Haha hihi wow!
            </p>
          </header>

          {/* Date Filter */}
          <div className="mt-4 mb-8 w-full max-w-2xl">
            <DateFilter 
              onFilterChange={handleFilterChange}
              className="w-full"
            />
          </div>

          {/* Filter Status */}
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-white">
              {selectedFilter 
                ? (() => {
                    const ukmForDay = dummyUkm.find(ukm => ukm.dateDay === selectedFilter);
                    return ukmForDay ? ukmForDay.date : `Hari ke-${selectedFilter}`;
                  })()
                : `13 - 17 Agustus 1945`
              }
            </p>
          </div>

          {/* Cards Section */}
          <div className="entrance grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {filteredUkm.map((ukm) => (
              <UkmCard
                key={ukm.id}
                stateId={ukm.id}
                stateName={ukm.name}
                stateDate={ukm.date}
                stateLocation={ukm.location}
                stateCapacity={ukm.capacity}
                currentFilledCapacity={ukm.filledCapacity}
                ukmLogo={ukm.logo}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredUkm.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-lg">
                <p className="text-xl text-gray-600 mb-2">Tidak ada UKM untuk hari yang dipilih</p>
                <p className="text-gray-500">Silakan pilih hari lain atau klik tombol hari yang sudah aktif untuk menampilkan semua UKM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectState;