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
  HomeIcon,
  LogOutIcon,
  Ticket,
  TicketCheck,
  TicketIcon,
  UserIcon,
} from "lucide-react";
import logo from "/favicon.png";
import { useToggle } from "@/contexts/ToggleContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import useAuthContext from "@/hooks/useAuthContext";

const Navbar = () => {
  const { toggleAcara } = useToggle();
  const queryClient = useQueryClient();
  const auth = useAuthContext();
  const api = useApi();
  const nav = useNavigate();
  const target = toggleAcara?.find((t) => t.nama === "Station");
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
          <MenubarTrigger>
            <Link to="/main">
              <img src={logo} className="size-5 object-contain" />
            </Link>
          </MenubarTrigger>
          {/* <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent> */}
        </MenubarMenu>
        {target?.isOn && (
          <>
            <MenubarMenu>
              <Link to="/tickets">
                <MenubarTrigger>
                  <TicketCheck className="size-5 mr-1" />
                  TIKET
                </MenubarTrigger>
              </Link>
              {/* <MenubarContent>
          </MenubarContent> */}
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link to={"/station"}>STATION</Link>
              </MenubarTrigger>
              {/* <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent> */}
            </MenubarMenu>
          </>
        )}
        <MenubarMenu>
          <MenubarTrigger>
            <div
              onClick={() => mutation.mutate()}
              className="flex gap-1 items-center justify-center hover:cursor-pointer"
            >
              <LogOutIcon className="size-5" />
              Log Out
            </div>
          </MenubarTrigger>
          {/* <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent> */}
        </MenubarMenu>
      </Menubar>
    </nav>
  );
};

export default Navbar;
