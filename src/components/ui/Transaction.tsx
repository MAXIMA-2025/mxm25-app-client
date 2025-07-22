import React, { useState, useEffect } from 'react';

// Types
interface MidtransPaymentRequest {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  enabled_payments: string[];
}

interface Ticket {
  id: string;
  name: string;
  price: number;
  description: string;
}

declare global {
  interface Window {
    snap: {
      pay: (token: string, options?: {
        onSuccess?: (result: any) => void;
        onPending?: (result: any) => void;
        onError?: (result: any) => void;
        onClose?: () => void;
      }) => void;
    };
  }
}

const MIDTRANS_CLIENT_KEY = 'SB-Mid-client-GPjM1WOgtWUYMlK9'; 

// Updated API function using proxy
const createSnapToken = async (paymentData: MidtransPaymentRequest) => {
  try {
    const response = await fetch('/api/midtrans/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating snap token:', error);
    throw error;
  }
};

const loadMidtransScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const Transaction: React.FC = () => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 'ticket_1',
      name: 'Tiket Reguler',
      price: 50000,
      description: 'Tiket masuk reguler untuk acara'
    },
    {
      id: 'ticket_2',
      name: 'Tiket VIP',
      price: 150000,
      description: 'Tiket VIP dengan fasilitas premium'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadMidtransScript()
      .then(() => setScriptLoaded(true))
      .catch(error => console.error('Failed to load Midtrans script:', error));
  }, []);

  const generateOrderId = (): string => {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePayment = async () => {
    if (!selectedTicket || !scriptLoaded) return;

    setIsLoading(true);

    try {
      const paymentData: MidtransPaymentRequest = {
        transaction_details: {
          order_id: generateOrderId(),
          gross_amount: selectedTicket.price * quantity
        },
        customer_details: {
          first_name: customerData.firstName,
          last_name: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone
        },
        item_details: [{
          id: selectedTicket.id,
          price: selectedTicket.price,
          quantity: quantity,
          name: selectedTicket.name
        }],
        enabled_payments: [
          'gopay',
          'qris',
          'shopeepay',
          'dana',
          'linkaja',
          'ovo'
        ]
      };

      const snapResponse = await createSnapToken(paymentData);
      
      //Midtrans Snap popup
      window.snap.pay(snapResponse.token, {
        onSuccess: (result) => {
          console.log('Payment Success:', result);
          alert('Pembayaran berhasil! Order ID: ' + result.order_id);
        },
        onPending: (result) => {
          console.log('Payment Pending:', result);
          alert('Pembayaran pending! Silakan selesaikan pembayaran.');
        },
        onError: (result) => {
          console.log('Payment Error:', result);
          alert('Terjadi kesalahan dalam pembayaran: ' + result.status_message);
        },
        onClose: () => {
          console.log('Payment popup closed');
          alert('Pembayaran dibatalkan');
        }
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return selectedTicket && 
           customerData.firstName && 
           customerData.lastName && 
           customerData.email && 
           customerData.phone &&
           quantity > 0;
  };

  return (
    <div className="p-6 rounded-lg shadow-lg w-125 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pembelian Tiket</h1>
        <p className="text-gray-600">Pilih tiket dan lakukan pembayaran melalui QRIS/E-Wallet</p>
      </div>

      {/* Komponen pilihan tiket */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Pilih Tiket</h3>
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <div 
              key={ticket.id} 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedTicket?.id === ticket.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <h4 className="font-semibold text-gray-800">{ticket.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
              <p className="font-bold text-green-600">Rp {ticket.price.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedTicket && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Tiket:
          </label>
          <input 
            type="number" 
            min="1" 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">
            Total: Rp {(selectedTicket.price * quantity).toLocaleString('id-ID')}
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Pembeli</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Nama Depan"
            value={customerData.firstName}
            onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text" 
            placeholder="Nama Belakang"
            value={customerData.lastName}
            onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input 
          type="email" 
          placeholder="Email"
          value={customerData.email}
          onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input 
          type="tel" 
          placeholder="Nomor Telepon"
          value={customerData.phone}
          onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        onClick={handlePayment}
        disabled={!isFormValid() || isLoading || !scriptLoaded}
        className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-all ${
          isFormValid() && scriptLoaded 
            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Memproses...' : 'Bayar dengan QRIS/E-Wallet'}
      </button>

      {!scriptLoaded && (
        <p className="text-orange-600 mt-4 text-center">
          Loading Midtrans script...
        </p>
      )}
    </div>
  );
};

export default Transaction;