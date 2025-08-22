import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import {
  Gamepad,
  HomeIcon,
  LogOutIcon,
  Ticket,
  TicketCheck,
  TicketIcon,
  TreeDeciduousIcon,
  UserIcon,
} from "lucide-react";
import logo from "/favicon.png";
import { useToggle } from "@/contexts/ToggleContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import useAuthContext from "@/hooks/useAuthContext";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { toggleAcara } = useToggle();
  const queryClient = useQueryClient();
  const auth = useAuthContext();
  const authUser = useAuth();
  const api = useApi();
  const nav = useNavigate();
  const target = toggleAcara?.find((t) => t.nama === "Station");
  const targetMaxlearn = toggleAcara?.find((t) => t.nama === "Maxlearn");
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      if (res.status !== 200) throw new Error("Gagal logout!");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      console.log("Di navbar");
      auth.setIsLoggedOut(true);
      nav("/");
    },
  });

  return (
    <nav className="fixed bottom-4 z-50">
      <Menubar className="shadow-2xl/100 ">
        <MenubarMenu>
          <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
            <Link to="/main">
              <img src={logo} className="size-5 object-contain" />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        {target?.isOn && (
          <>
            <MenubarMenu>
              <Link to="/tickets">
                <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
                  <TicketCheck className="size-5 mr-1" />
                  TIKET
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link to={"/station"}>
                <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
                  <TreeDeciduousIcon className="size-5 object-contain mr-1"/> STATION
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          </>
        )}
        {targetMaxlearn?.isOn && authUser.user?.role === "mahasiswa" && (
          <MenubarMenu>
            <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
              <Link to={"/challenges"} className="flex flex-row gap-2">
                <Gamepad className="size-5 object-contain" />
                CHALLENGES
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger className="shadow-2xl bg-black hover:cursor-pointer">
            <div
              onClick={() => mutation.mutate()}
              className="flex gap-1 items-center justify-center invert-100"
            >
              <LogOutIcon className="size-5" />
              Log Out
            </div>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
};

export default Navbar;
