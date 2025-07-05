
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import RouteGuard from "../client/src/components/RouteGuard";
import ProfileCompletionModal from "../client/src/components/ProfileCompletionModal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SongsPage from "./pages/SongsPage";
import ShopPage from "./pages/ShopPage";
import DonatePage from "./pages/DonatePage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteGuard>
              <ProfileCompletionModal />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/songs" element={<SongsPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteGuard>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
