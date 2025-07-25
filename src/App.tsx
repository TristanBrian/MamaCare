import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Education from "./pages/Education";
import Prenatal from "./pages/Prenatal";
import Community from "./pages/Community";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    chatbase: any;
  }
}

const queryClient = new QueryClient();

function App() {
  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [buttonPulse, setButtonPulse] = useState(false);

  // Initialize chatbot
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "chatbase-script";
      script.setAttribute("chatbotId", "GRdN7Z77WSMI6-1N41rSR");
      script.defer = true;

      script.onload = () => {
        setChatbotLoaded(true);
        // Hide initially
        window.chatbase("hide");
      };

      document.body.appendChild(script);
    } else {
      setChatbotLoaded(true);
    }

    return () => {
      const script = document.getElementById("chatbase-script");
      if (script) document.body.removeChild(script);
    };
  }, []);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    if (!chatbotLoaded) return;
    
    if (!showChatbot) {
      // Show with animation
      window.chatbase("show");
      
      // Pulse effect for first interaction
      if (!localStorage.getItem("chatbotUsed")) {
        setTimeout(() => {
          window.chatbase("open");
          localStorage.setItem("chatbotUsed", "true");
        }, 500);
      } else {
        window.chatbase("open");
      }
    } else {
      window.chatbase("hide");
    }
    
    setShowChatbot(!showChatbot);
  };

  // Add pulse animation on first render
  useEffect(() => {
    setButtonPulse(true);
    const timer = setTimeout(() => setButtonPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="p-2 bg-gray-100 flex justify-center gap-4">
                  <button
                    className={`px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform transition-all duration-300 flex items-center ${
                      buttonPulse ? "animate-pulse" : "hover:scale-105"
                    }`}
                    onClick={toggleChatbot}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    MamaCare Chatbot
                  </button>
                </div>
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/prenatal" element={<Prenatal />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/*"
                      element={
                        <ProtectedRoute requiredRole={["admin"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/provider/*"
                      element={
                        <ProtectedRoute requiredRole={["doctor", "hospital"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/patient/*"
                      element={
                        <ProtectedRoute requiredRole={["patient"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;