import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Resources from "./pages/Resources";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register";
import Questionnaire from "./components/Questionaire.tsx";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/AuthStore.ts";
import AdminApp from "./admin/AdminApp.tsx";
import ChatPage from "./pages/AI/ChatPage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Profile from "./pages/Profile.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { isLogin, setIsLogin, toggleLogin } = useAuthStore();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation isLogin={isLogin} />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index isLogin={isLogin} />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chatpage" element={<ChatPage />} />
              {/* <Route path="/admin" element={<Admin />} /> */}
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/admin/*" element={<AdminApp />} />
              {/* <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/reports" element={<Reports />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
