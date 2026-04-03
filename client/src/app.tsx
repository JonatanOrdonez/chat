import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./providers/UserProvider";
import { AxiosProvider } from "./providers/AxiosProvider";
import { ToastProvider } from "./providers/ToastProvider";
import { RoomsProvider } from "./providers/RoomsProvider";
import { ChatProvider } from "./providers/ChatProvider";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RoomsPage } from "./pages/RoomsPage";
import { ChatPage } from "./pages/ChatPage";

const AppRoutes = () => {
  const { auth } = useUser();

  return (
    <Routes>
      <Route
        path="/login"
        element={!auth ? <LoginPage /> : <Navigate to="/rooms" />}
      />
      <Route
        path="/register"
        element={!auth ? <RegisterPage /> : <Navigate to="/rooms" />}
      />
      <Route
        path="/rooms"
        element={
          auth ? (
            <RoomsProvider>
              <RoomsPage />
            </RoomsProvider>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/rooms/:id"
        element={
          auth ? (
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={auth ? "/rooms" : "/login"} />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AxiosProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AxiosProvider>
      </UserProvider>
    </BrowserRouter>
  );
};
