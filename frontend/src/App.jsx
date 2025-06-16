import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { UseAuthStore } from "./store/UseAuthStore";
import { UseThemeStore } from "./store/UseThemeStore";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Community = lazy(() => import("./pages/Community"));
const Thread = lazy(() => import("./pages/PostThread"));
const ViewCommunity = lazy(() => import("./components/ViewCommunity"));

// Optional: 404 fallback page
const NotFound = () => (
  <div className="text-center p-10 text-xl font-semibold text-red-600">
    404 - Page Not Found
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { authUser } = UseAuthStore();
  return authUser ? children : <Navigate to="/login" />;
};

function App() {
  const { theme } = UseThemeStore();

  return (
    <div data-theme={theme}>
      <Suspense fallback={<Loading />}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newThread"
            element={
              <ProtectedRoute>
                <Thread />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewCommunity/:id"
            element={
              <ProtectedRoute>
                <ViewCommunity />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
