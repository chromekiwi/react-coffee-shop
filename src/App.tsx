import { BrowserRouter, Routes, Route } from "react-router";

import { ThemeProvider } from "@/providers/theme-provider";
import { AccountProvider } from "@/contexts/AccountContext";
import routes from "@/router";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route) =>
              route.children ? (
                <Route key={route.url} path={route.url}>
                  {route.children.map((child) => (
                    <Route
                      key={child.url}
                      path={child.url.replace(route.url, "").substring(1)}
                      element={child.component ? <child.component /> : null}
                    />
                  ))}
                </Route>
              ) : (
                <Route
                  key={route.url}
                  path={route.url}
                  element={<route.component />}
                />
              )
            )}
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </ThemeProvider>
  );
}
