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
import { Link } from "react-router";
import {
  HomeIcon,
  Ticket,
  TicketCheck,
  TicketIcon,
  UserIcon,
} from "lucide-react";
import logo from "/favicon.png";

const Navbar = () => {
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
        <MenubarMenu>
          <Link to = "/tickets">
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
      </Menubar>
    </nav>
  );
};

export default Navbar;
