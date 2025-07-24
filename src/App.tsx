
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

const queryClient = new QueryClient();

function App() {
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
                    {/* Protected routes with role-based access */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Admin-only routes */}
                    <Route
                      path="/admin/*"
                      element={
                        <ProtectedRoute requiredRole={["admin"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Healthcare provider routes (doctors and hospitals) */}
                    <Route
                      path="/provider/*"
                      element={
                        <ProtectedRoute requiredRole={["doctor", "hospital"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* Patient-only routes */}
                    <Route
                      path="/patient/*"
                      element={
                        <ProtectedRoute requiredRole={["patient"]}>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
