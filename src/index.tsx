import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./i18n";
import { LazyAbout } from "./components/pages/about/About.lazy";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/about",
          element: (
            <Suspense fallback={"Loading..."}>
              <LazyAbout />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/weather-app",
  }
);

// root.render(<App />);
root.render(<RouterProvider router={router} />);
