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
import { HomeIcon, UserIcon } from "lucide-react";

const Navbar = () => {
  const handleStationClick =()=>{

  }
  return (
    <nav className="fixed bottom-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Link to={"/station"}><HomeIcon className="size-5"/></Link>
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
          <MenubarTrigger><UserIcon className="size-5 mr-1"/>Profile</MenubarTrigger>
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
