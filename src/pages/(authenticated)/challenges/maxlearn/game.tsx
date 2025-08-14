// src/pages/(authenticated)/challenges/maxlearn/game.tsx
import React, { useState, useEffect } from "react";

// Nama kunci untuk menyimpan data di Local Storage
const STORAGE_KEY = "maxlearn_organisator_progress";

// Daftar lengkap organisasi yang dikelompokkan berdasarkan kategori
const organizations = {
  "Lembaga Eksekutif UMN": [
    "Badan Eksekutif Mahasiswa (BEM)",
    "Dewan Keluarga Besar Mahasiswa (DKBM)",
  ],
  "Kegiatan di bawah naungan BEM": [
    "Starlight",
    "UMN Festival",
    "Mister & Miss UMN",
    "Orientasi Mahasiswa Baru (OMB)",
    "UMN Earth Caring Operation (UMN ECO)",
  ],
  "Lembaga Semi Otonom (LSO)": [
    "U-BIZ",
    "U-STORE",
    "Kompas Corner",
    "Duta Anti Narkoba",
    "UMN Medical Center (UMN Medic)",
  ],
  "Media Kampus": [
    "UMN TV",
    "ULTIMAGZ",
    "UMN RADIO",
    "UMN Journalism Center (UMN Juice)",
  ],
  "UKM Seni dan Budaya": [
    "QORIE",
    "J-CAFE",
    "MUFOMIC",
    "OBSCURA",
    "Teater KATAK",
    "ULTIMA TOYS",
    "Let's DaNCe (LDNC)",
    "Ultima Sonora (ULSON)",
    "UMN Symphony Orchestra (USO)",
    "UMN Traditional Dance (TRACCE)",
  ],
  "UKM Sains dan Sosial": [
    "RENCANG",
    "UMN Robotic Club",
    "Game Development Club (GDC)",
    "UMN Programming Club (UMN PC)",
    "Mahasiswa Pecinta Alam (MAPALA)",
    "UMN English Student Council (UESC)",
  ],
  "UKM Olahraga": [
    "SPECTRE",
    "CAPOIERA",
    "LIONS VOLI",
    "TENIS MEJA",
    "TAEKWONDO",
    "LIONS FUTSAL",
    "ULTIMA AIKIDO",
    "LION BASKETBALL",
    "LIONS BADMINTON",
    "FORTIUS E-SPORTS",
  ],
  Fakultas: {
    "Fakultas Ilmu Komunikasi": ["Ikatan Mahasiswa Ilmu Komunikasi (IM'KOM)"],
    "Fakultas Seni dan Desain (FSD)": [
      "Himpunan Mahasiswa Film (HMFILM)",
      "Himpunan Mahasiswa Arsitektur (HIMARS)",
      "Himpunan Mahasiswa Desain Komunikasi Visual (HMDKV)",
    ],
    "Fakultas Bisnis (FB)": [
      "Himpunan Mahasiswa Perhotelan (HMP)",
      "Himpunan Mahasiswa Manajemen (HIMMA)",
      "Himpunan Mahasiswa Akuntansi (HIMTARA)",
    ],
    "Fakultas Teknik dan Informatika (FTI)": [
      "Himpunan Mahasiswa Informatika (HMIF)",
      "Himpunan Mahasiswa Sistem Informasi (HIMSI)",
      "Association of Computer Engineering Student (ACES)",
      "Himpunan Mahasiswa Teknik Elektro dan Fisika (HIMFERA)",
    ],
  },
  "Lembaga Kampus": [
    "NUSAKARA",
    "UMN Library",
    "Campus Visit",
    "Skystar Ventures",
    "UMN Documentation (UMN DOC)",
  ],
  Komunitas: ["UMN Gate", "POPSICLE", "Kelompok Studi Pasar Modal (KSPM) UMN"],
};

// Mengubah struktur nested menjadi array of strings sederhana
const allOrganizations = Object.values(organizations).flatMap((category) =>
  typeof category === "object" && !Array.isArray(category)
    ? Object.values(category).flat()
    : category
);

const GamePage: React.FC = () => {
  const [progress, setProgress] = useState<boolean[]>(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      return savedProgress
        ? JSON.parse(savedProgress)
        : new Array(allOrganizations.length).fill(false);
    } catch (error) {
      console.error("Gagal memuat progres dari Local Storage:", error);
      return new Array(allOrganizations.length).fill(false);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Gagal menyimpan progres ke Local Storage:", error);
    }
  }, [progress]);

  const handleToggleProgress = (index: number) => {
    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[index] = !newProgress[index];
      return newProgress;
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Progres Game Maxlearn</h1>
      <p>Progres akan tersimpan otomatis di Local Storage.</p>
      <div style={{ marginTop: "20px" }}>
        {Object.keys(organizations).map((categoryName) => (
          <div key={categoryName} style={{ marginBottom: "20px" }}>
            <h3>{categoryName}</h3>
            {/* Render list organisator per kategori */}
            {Object.values(organizations[categoryName])
              .flat()
              .map((organisator, index) => (
                <div key={organisator} style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    checked={progress[allOrganizations.indexOf(organisator)]}
                    onChange={() =>
                      handleToggleProgress(
                        allOrganizations.indexOf(organisator)
                      )
                    }
                  />
                  <label style={{ marginLeft: "10px" }}>
                    {organisator} -{" "}
                    {progress[allOrganizations.indexOf(organisator)]
                      ? "Selesai"
                      : "Belum Selesai"}
                  </label>
                </div>
              ))}
          </div>
        ))}
      </div>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        Coba refresh halaman atau tutup browser. Progres akan tetap tersimpan.
      </p>
    </div>
  );
};

export default GamePage;
