import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

// BUAT CEK AUTH PROVIDER UDH DI SET ATAU BELOM
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Auth context kemungkinan tidak dibungkus dengan AuthProvider"
    );
  }
  return context;
};

export default useAuthContext;
