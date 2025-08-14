import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TicketValidator from "../../components/ui/TicketValidator";
import Bg_desktop from "@/assets/images/main/STATION.webp";

const TicketPage = () => {
  const [searchParams] = useSearchParams();
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    const queryTicketId = searchParams.get("ticketId");
    setTicketId(queryTicketId);
  }, [searchParams]);

  if (!ticketId) {
    return (
      <section
        className="py-10 min-h-screen min-w-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${Bg_desktop})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl font-fraunces sm:text-4xl font-bold text-gray-900 mb-2">
          Tiket Ku
        </h1>
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Invalid Ticket Link
          </h1>
          <p className="text-gray-600">No ticket ID provided in the URL.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-10 min-h-screen min-w-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Bg_desktop})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-4xl font-fraunces sm:text-4xl font-bold text-gray-900 mb-6">
        Tiket Saya
      </h1>
      <TicketValidator ticketId={ticketId} />
    </section>
    // <div className="min-h-screen bg-gray-50">
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="max-w-2xl mx-auto">
    //       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
    //         Ticket Validation
    //       </h1>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TicketPage;
