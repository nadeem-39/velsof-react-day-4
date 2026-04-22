import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClint = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClint}>
          <Toaster />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
