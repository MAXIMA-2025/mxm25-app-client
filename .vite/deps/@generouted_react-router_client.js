import "./chunk-OLWF5IBG.js";
import {
  Link,
  Navigate,
  generatePath,
  redirect,
  useLocation,
  useNavigate,
  useParams
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

// node_modules/@generouted/react-router/dist/chunk-BGYCOGYF.js
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var components = () => {
  return {
    // @ts-expect-error
    Link: (0, import_react.forwardRef)(({ to, params, ...props }, ref) => {
      const path = generatePath(typeof to === "string" ? to : to.pathname, params || {});
      return (0, import_jsx_runtime.jsx)(
        Link,
        {
          ref,
          ...props,
          to: typeof to === "string" ? path : { pathname: path, search: to.search, hash: to.hash }
        }
      );
    }),
    Navigate: ({ to, params, ...props }) => {
      const path = generatePath(typeof to === "string" ? to : to.pathname, params || {});
      return (0, import_jsx_runtime.jsx)(
        Navigate,
        {
          ...props,
          to: typeof to === "string" ? path : { pathname: path, search: to.search, hash: to.hash }
        }
      );
    }
  };
};

// node_modules/@generouted/react-router/dist/chunk-Q7AH3ZVR.js
var import_react2 = __toESM(require_react(), 1);
var hooks = () => {
  return {
    useParams: (path) => useParams(),
    useNavigate: () => {
      const navigate = useNavigate();
      return (0, import_react2.useCallback)(
        (to, ...[options]) => {
          if (typeof to === "number") return navigate(to);
          const path = generatePath(typeof to === "string" ? to : to.pathname, options?.params || {});
          return navigate(typeof to === "string" ? path : { pathname: path, search: to.search, hash: to.hash }, options);
        },
        [navigate]
      );
    },
    useModals: () => {
      const location = useLocation();
      const navigate = useNavigate();
      return (0, import_react2.useMemo)(() => {
        return {
          current: location.state?.modal || "",
          open: (path, options) => {
            const { at, state, ...opts } = options || {};
            const pathname = options?.params ? generatePath(at || "", options.params || {}) : at;
            navigate(pathname || location.pathname, { ...opts, state: { ...location.state, ...state, modal: path } });
          },
          close: (options) => {
            const { at, state, ...opts } = options || {};
            const pathname = options?.params ? generatePath(at || "", options.params || {}) : at;
            navigate(pathname || location.pathname, { ...opts, state: { ...location.state, ...state, modal: "" } });
          }
        };
      }, [location, navigate]);
    }
  };
};

// node_modules/@generouted/react-router/dist/chunk-HT536EA6.js
var utils = () => {
  return {
    redirect: (url, ...[options]) => {
      return redirect(options?.params ? generatePath(url, options.params) : url, options);
    }
  };
};
export {
  components,
  hooks,
  utils
};
//# sourceMappingURL=@generouted_react-router_client.js.map
