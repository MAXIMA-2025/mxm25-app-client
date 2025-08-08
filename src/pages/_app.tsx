<<<<<<< HEAD
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
=======
import React from 'react'
import { Outlet } from 'react-router'

const _app = () => {
  return (
    <section>
        <Outlet />
    </section>
  )
}

export default _app
>>>>>>> ec1be48dffed1e00531ab77d7b5da182716915ee
