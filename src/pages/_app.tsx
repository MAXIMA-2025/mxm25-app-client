import React from "react";
import { Outlet } from "react-router";
import ScreenIndicator from "@/components/screenIndicator";

const app = () => {
  return (
    <section className="">
      {process.env.NODE_ENV === "development" && <ScreenIndicator />}
      <Outlet />
    </section>
  );
};

export default app;
