import "./chunk-OLWF5IBG.js";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation
} from "./chunk-W5VD4IJP.js";
import "./chunk-F6675Q4O.js";
import {
  require_jsx_runtime
} from "./chunk-M554INQQ.js";
import {
  require_react
} from "./chunk-K4NLKXWU.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@generouted/react-router/dist/chunk-H43QLJSW.js
var patterns = {
  route: [/^.*\/src\/pages\/|\.(jsx|tsx|mdx)$/g, ""],
  splat: [/\[\.{3}\w+\]/g, "*"],
  param: [/\[([^\]]+)\]/g, ":$1"],
  slash: [/^index$|\./g, "/"],
  optional: [/^-(:?[\w-]+|\*)/, "$1?"]
};
var generatePreservedRoutes = (files) => {
  return Object.keys(files).reduce((routes2, key) => {
    const path = key.replace(...patterns.route);
    return { ...routes2, [path]: files[key] };
  }, {});
};
var generateRegularRoutes = (files, buildRoute) => {
  const filteredRoutes = Object.keys(files).filter((key) => !key.includes("/_") || /_layout\.(jsx|tsx)$/.test(key));
  return filteredRoutes.reduce((routes2, key) => {
    const module = files[key];
    const route = { id: key.replace(...patterns.route), ...buildRoute(module, key) };
    const segments = key.replace(...patterns.route).replace(...patterns.splat).replace(...patterns.param).split("/").filter(Boolean);
    segments.reduce((parent, segment, index) => {
      const path = segment.replace(...patterns.slash).replace(...patterns.optional);
      const root = index === 0;
      const leaf = index === segments.length - 1 && segments.length > 1;
      const node = !root && !leaf;
      const layout = segment === "_layout";
      const group = /\([\w-]+\)/.test(path);
      const insert = /^\w|\//.test(path) ? "unshift" : "push";
      if (root) {
        const last = segments.length === 1;
        if (last) {
          routes2.push({ path, ...route });
          return parent;
        }
      }
      if (root || node) {
        const current = root ? routes2 : parent.children;
        const found = current?.find((r) => r.path === path || r.id?.replace("/_layout", "").split("/").pop() === path);
        const props = group ? route?.component ? { id: path, path: "/" } : { id: path } : { path };
        if (found) found.children ??= [];
        else current?.[insert]({ ...props, children: [] });
        return found || current?.[insert === "unshift" ? 0 : current.length - 1];
      }
      if (layout) {
        return Object.assign(parent, route);
      }
      if (leaf) {
        parent?.children?.[insert](route?.index ? route : { path, ...route });
      }
      return parent;
    }, {});
    return routes2;
  }, []);
};
var generateModalRoutes = (files) => {
  return Object.keys(files).reduce((modals, key) => {
    const path = key.replace(...patterns.route).replace(/\+|\([\w-]+\)\//g, "").replace(/(\/)?index/g, "").replace(/\./g, "/");
    return { ...modals, [`/${path}`]: files[key]?.default };
  }, {});
};

// node_modules/@generouted/react-router/dist/index.js
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PRESERVED = import.meta.glob("/src/pages/(_app|404).{jsx,tsx}", { eager: true });
var MODALS = import.meta.glob("/src/pages/**/[+]*.{jsx,tsx}", { eager: true });
var ROUTES = import.meta.glob(
  ["/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}", "!/src/pages/**/(_!(layout)*(/*)?|_app|404)*"],
  { eager: true }
);
var preservedRoutes = generatePreservedRoutes(PRESERVED);
var modalRoutes = generateModalRoutes(MODALS);
var regularRoutes = generateRegularRoutes(ROUTES, (module, key) => {
  const index = /index\.(jsx|tsx|mdx)$/.test(key) && !key.includes("pages/index") ? { index: true } : {};
  const Default2 = module?.default || import_react.Fragment;
  const Page = () => module?.Pending ? (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(module.Pending, {}), children: (0, import_jsx_runtime.jsx)(Default2, {}) }) : (0, import_jsx_runtime.jsx)(Default2, {});
  return { ...index, Component: Page, ErrorBoundary: module?.Catch, loader: module?.Loader, action: module?.Action };
});
var _app = preservedRoutes?.["_app"];
var _404 = preservedRoutes?.["404"];
var Default = _app?.default || Outlet;
var Modals_ = () => {
  const Modal = modalRoutes[useLocation().state?.modal] || import_react.Fragment;
  return (0, import_jsx_runtime.jsx)(Modal, {});
};
var Layout = () => (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
  (0, import_jsx_runtime.jsx)(Default, {}),
  " ",
  (0, import_jsx_runtime.jsx)(Modals_, {})
] });
var App = () => _app?.Pending ? (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(_app.Pending, {}), children: (0, import_jsx_runtime.jsx)(Layout, {}) }) : (0, import_jsx_runtime.jsx)(Layout, {});
var app = { Component: _app?.default ? App : Layout, ErrorBoundary: _app?.Catch, loader: _app?.Loader };
var fallback = { path: "*", Component: _404?.default || import_react.Fragment };
var routes = [{ ...app, children: [...regularRoutes, fallback] }];
var router;
var createRouter = () => (router ??= createBrowserRouter(routes), router);
var Routes = () => (0, import_jsx_runtime.jsx)(RouterProvider, { router: createRouter() });
var Modals = () => (console.warn("[generouted] `<Modals />` will be removed in future releases"), null);
export {
  Modals,
  Routes,
  routes
};
//# sourceMappingURL=@generouted_react-router.js.map
