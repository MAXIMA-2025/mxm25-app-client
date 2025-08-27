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
  ListIcon,
  LogOutIcon,
  Ticket,
  TicketCheck,
  TicketIcon,
  TreeDeciduousIcon,
  User,
  UserIcon,
  VenetianMaskIcon,
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
  const targetState = toggleAcara?.find((t) => t.nama === "State");
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
        {authUser.user?.role === "eksternal" && (
          <MenubarMenu>
            <Link to="/tickets">
              <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
                <TicketCheck className="size-5 mr-1" />
                TIKET
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        )}

        {authUser.user?.role === "mahasiswa" && (
          <MenubarMenu>
            <Link to="/profile">
              <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
                <User className="size-5 mr-1" />
                ABSEN
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        )}

        {target?.isOn && (
          <>
            <MenubarMenu>
              <Link to={"/station"}>
                <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
                  <TreeDeciduousIcon className="size-5 object-contain mr-1" />{" "}
                  STATION
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          </>
        )}

        <MenubarMenu>
          <MenubarTrigger className="shadow-2xl bg-slate-50 hover:cursor-pointer">
            <ListIcon className="size-5 object-contain mr-2" />
            Menu
          </MenubarTrigger>
          <MenubarContent>
            {targetMaxlearn?.isOn && authUser.user?.role === "mahasiswa" && (
              <MenubarItem>
                <Link to={"/challenges"} className="flex flex-row gap-2">
                  <Gamepad className="size-5 object-contain" />
                  CHALLENGES
                </Link>
              </MenubarItem>
            )}
            {targetState?.isOn && authUser.user?.role === "mahasiswa" && (
              <MenubarItem>
                <Link to={"/state"} className="flex flex-row gap-2">
                  <VenetianMaskIcon className="size-5 object-contain" />
                  STATE
                </Link>
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="shadow-2xl bg-black hover:cursor-pointer focus:bg-primary">
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
