import React from "react";
import backgroundImg from "@/assets/images/hero/ABOUT.webp";
import { Button } from "@/components/ui/button";
import about1 from "@/assets/images/hero/about/about1.webp";
import about2 from "@/assets/images/hero/about/about2.webp";
import about3 from "@/assets/images/hero/about/about3.webp";
import about4 from "@/assets/images/hero/about/about4.webp";
import { Link, useNavigate } from "react-router";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutSection = () => {
  // Add this above your component
  const faqData = [
    {
      id: "item-1",
      question: "STATION itu kegiatan apa?",
      answer:
        "STATION (Start To Inspire Your Passion) merupakan kegiatan pembuka MAXIMA 2025 yang bertujuan untuk mengapresiasi mahasiswa baru setelah melewati rangkaian Orientasi Mahasiswa Baru (OMB). Dalam STATION, MAXIMERS dapat menyaksikan penampilan Unit Kegiatan Mahasiswa (UKM) dan guest star, mengunjungi booth organisasi, serta menikmati keseruan bazaar dengan nuansa konser yang meriah.",
    },
    {
      id: "item-2",
      question: "Apakah STATION bersifat wajib?",
      answer:
        "STATION bersifat WAJIB bagi mahasiswa baru sebagai salah satu syarat turunnya SKKM OMB.",
    },
    {
      id: "item-3",
      question:
        "Bagi peserta yang mengulang OMB, apakah wajib mengikuti STATION juga?",
      answer:
        "Bagi peserta yang mengulang OMB, SKKM OMB tetap akan turun meskipun tidak mengikuti STATION. Namun, kami tetap menghimbau agar berpartisipasi dan memeriahkan acara ini.",
    },
    {
      id: "item-4",
      question:
        "Apakah STATION hanya untuk mahasiswa baru atau terbuka untuk umum?",
      answer:
        "STATION tidak hanya ditujukan bagi mahasiswa baru. Acara ini juga terbuka untuk mahasiswa angkatan atas maupun peserta eksternal, dengan pembelian tiket masuk sebesar Rp65.000,00.",
    },
    {
      id: "item-5",
      question: "Apa saja yang harus dipersiapkan untuk mengikuti STATION?",
      answer:
        "Pertama-tama, MAXIMERS diharapkan hadir dengan semangat dan antusiasme yang tinggi. Selain itu, MAXIMERS wajib membawa dan menggunakan KTM, menggunakan tas serut, serta mengenakan pakaian rapi dan sopan sesuai peraturan kampus. MAXIMERS juga diimbau untuk menjaga kebersihan area acara dan menaati seluruh peraturan yang telah ditetapkan.",
    },
    {
      id: "item-6",
      question: "Apa itu STATE dan kegiatan apa yang dilakukan saat STATE?",
      answer:
        "STATE (Student Activities Unit Explore) adalah kegiatan yang memberikan kesempatan bagi mahasiswa baru untuk menjelajahi dan mencoba kegiatan-kegiatan yang diselenggarakan oleh Unit Kegiatan Mahasiswa, LSO, Media Kampus, dan Komunitas yang ada di Universitas Multimedia Nusantara dalam bentuk free trial. Setiap mahasiswa dapat memilih maksimal 3 kegiatan STATE.",
    },
    {
      id: "item-7",
      question: "Kapan acara STATE dilaksanakan?",
      answer:
        "STATE akan berlangsung pada tanggal 28 Agustus – 9 September 2025.",
    },
    {
      id: "item-8",
      question: "Apa itu HOME dan kegiatan apa yang dilakukan saat HOME?",
      answer:
        "HOME (Hall Of MAXIMA Expression) merupakan rangkaian penutup MAXIMA 2025, tujuannya untuk mengantarkan dan menyambut kepulangan masing-masing mahasiswa baru kepada kegiatan kampus yang dipilihnya. HOME terdiri dari: bazaar, penampilan UKM & open recruitment serentak.",
    },
    {
      id: "item-9",
      question: "Kapan acara HOME dilaksanakan?",
      answer:
        "HOME akan diselenggarakan pada 15 – 19 September 2025. Namun, tanggal performance hanya pada 15 September 2025.",
    },
    {
      id: "item-10",
      question:
        "Apakah STATE dan HOME juga bersifat wajib untuk mahasiswa baru?",
      answer:
        "STATE dan HOME merupakan bagian penting dari rangkaian MAXIMA 2025 karena memberikan kesempatan bagi mahasiswa baru untuk mengenal lebih jauh kehidupan organisasi dan kegiatan kampus. Oleh karena itu, seluruh mahasiswa baru sangat dianjurkan untuk berpartisipasi dalam kedua kegiatan ini.",
    },
    {
      id: "item-11",
      question: "Apakah mengikuti STATE akan mendapatkan SKKM?",
      answer:
        "Ya, dengan mengikuti STATE, mahasiswa baru akan memperoleh SKKM Minat dan Bakat. Jumlah SKKM dapat bertambah apabila mahasiswa juga mengikuti challenge MAXTIVITY.",
    },
  ];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
<section
  className="w-dvw h-auto relative -top-50 sm:-top-56 md:-top-50 -mb-50 sm:-mb-56 md:-mb-50  z-10 flex justify-center items-start pt-60 overflow-hidden"
  style={{
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
  }}
>
      <div className="z-20 flex flex-col items-center justify-center">
        {/* APA ITU MAXIMA */}
        <h1
          className="font-fraunces text-center text-4xl font-semibold  drop-shadow-xl mb-4
             [text-shadow:1px_1px_0_white,_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white]"
        >
          Apa itu MAXIMA?
        </h1>
        <div className="backdrop-blur-2xl w-[80%] gap-6 flex flex-col items-center justify-center rounded-2xl p-4 border-4 border-white/60 shadow-2xl">
          <p className="font-futura text-center text-lg md:text-xl text-blue-950 font-medium">
            Malam Ekspresi Mahasiswa merupakan rangkaian acara terbesar di
            Universitas Multimedia Nusantara yang berada di bawah naungan BEM,
            untuk para mahasiswa baru untuk mengenal dan mempelajari organisasi
            yang terdapat di perkuliahan
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
            <img
              src={about1}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:wiggle_7s_ease-in-out_infinite]"
              style={{
                animationName: "wiggle",
                animationDuration: "7s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about2}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:float_9s_ease-in-out_infinite]"
              style={{
                animationName: "float",
                animationDuration: "9s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about3}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:tilt_8s_ease-in-out_infinite]"
              style={{
                animationName: "tilt",
                animationDuration: "8s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />

            <img
              src={about4}
              className="w-full md:w-[23%] rounded-lg md:rounded-2xl shadow-2xl drop-shadow-2xl border-3 md:border-4 border-white 
               hover:-translate-y-1 transition-transform
               [animation:drift_10s_ease-in-out_infinite]"
              style={{
                animationName: "drift",
                animationDuration: "10s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            />
          </div>
          <Button
            className="w-full md:w-1/4"
            variant="clay"
            onClick={handleClick}
          >
            Bergabung Bersama!
          </Button>
        </div>

        {/* FAQ MAXIMA */}
        <div className="mt-20 w-full flex flex-col items-center justify-center mb-24">
          <h1
            className="font-fraunces text-center text-4xl font-semibold drop-shadow-xl mb-4
       [text-shadow:1px_1px_0_white,_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white]"
          >
            Frequently Asked Questions
          </h1>
          <p className="font-futura font-medium text-xl drop-shadow-2xl bg-white/55 px-4 py-2 rounded-lg shadow-2xl">
            Pertanyaan-pertanyaan yang sering ditanyakan seputar MAXIMA 2025
          </p>

          <Accordion
            type="single"
            collapsible
            className="bg-white md:w-[80%] font-futura px-6 py-4 rounded-xl shadow-2xl drop-shadow-2xl border-4 border-slate-500 m-4"
          >
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="hover:cursor-pointe text-md">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-md font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className=" text-center w-[80%] font-futura font-medium text-xl drop-shadow-2xl bg-white/55 px-4 py-2 rounded-lg shadow-2xl">
            Masih punya pertanyaan?{" "}
            <Button variant="link"><Link target="_blank" to ="https://www.instagram.com/maximaumn">Tanyakan di DM Instagram!</Link></Button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) translateX(0px) translateY(0px); }
          25% { transform: rotate(1deg) translateX(2px) translateY(-1px); }
          50% { transform: rotate(-1deg) translateX(-2px) translateY(1px); }
          75% { transform: rotate(0.5deg) translateX(1px) translateY(0px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg) translateX(1px); }
          50% { transform: rotate(-1deg) translateX(-1px); }
          75% { transform: rotate(0.5deg) translateX(0.5px); }
        }

        @keyframes drift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(3px) translateY(-2px); }
          50% { transform: translateX(-3px) translateY(2px); }
          75% { transform: translateX(1px) translateY(-1px); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
