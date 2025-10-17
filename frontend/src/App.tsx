import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { RideScreen } from "@/pages/RideScreen";
import { TripScreen } from "@/pages/TripScreen";
import { ProfileScreen } from "@/pages/ProfileScreen";
import { ProfileInfoPage } from "@/pages/auth/ProfileInfoPage";
import { FlightInputScreen } from "./pages/FlightInputScreen";
import { FlightResultsScreen } from "./pages/FlightResultsScreen";
import { mockFlights } from "@/mock/mockFlights";
import type { Screen } from "@/types/index.ts";

import "./App.css";

function AuthenticatedApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("ride");
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
  const [planeCode, setPlaneCode] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const navigateTo = (
    screen: Screen,
    planeCodeArg?: string,
    dateArg?: string
  ) => {
    if (planeCodeArg) setPlaneCode(planeCodeArg);
    if (dateArg) setSelectedDate(dateArg);
    setCurrentScreen(screen);
  };

  //   const handleJoinGroup = () => {
  //     setHasJoinedGroup(true);
  //     setCurrentScreen("rideWithGroup");
  //   };

  //   const handleLeaveGroup = () => {
  //     setHasJoinedGroup(false);
  //     setCurrentScreen("ride");
  //   };

  const renderScreen = () => {
    switch (currentScreen) {
      case "ride":
        return (
          <RideScreen onNavigate={navigateTo} hasJoinedGroup={hasJoinedGroup} />
        );
      case "flightInput":
        return (
          <FlightInputScreen onNavigate={navigateTo} planeCode={planeCode} />
        );
      case "flightResults":
        return (
          <FlightResultsScreen
            onNavigate={navigateTo}
            flights={mockFlights}
            planeCode={planeCode}
            date={selectedDate}
          />
        );
      case "trip":
        return <TripScreen onNavigate={navigateTo} />;
      case "profile":
        return <ProfileScreen onNavigate={navigateTo} />;
      default:
        return (
          <RideScreen onNavigate={navigateTo} hasJoinedGroup={hasJoinedGroup} />
        );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#16161b] flex items-center justify-center">
      <div className="max-w-[393px] w-screen h-screen">{renderScreen()}</div>
    </div>
  );
}

function App() {
  const [authScreen, setAuthScreen] = useState<
    "login" | "register" | "profileInfo" | "app"
  >("login");

  return (
    <AuthProvider>
      <AuthWrapper authScreen={authScreen} setAuthScreen={setAuthScreen} />
    </AuthProvider>
  );
}

function AuthWrapper({
  authScreen,
  setAuthScreen,
}: {
  authScreen: "login" | "register" | "profileInfo" | "app";
  setAuthScreen: (screen: "login" | "register" | "profileInfo" | "app") => void;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#16161b]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  switch (authScreen) {
    case "login":
      return (
        <LoginPage
          onNavigateToRegister={() => setAuthScreen("register")}
          onLoginSuccess={() => setAuthScreen("app")}
        />
      );

    case "register":
      return (
        <RegisterPage
          onNavigateToLogin={() => setAuthScreen("login")}
          onNavigateToProfileInfo={() => setAuthScreen("profileInfo")}
        />
      );

    case "profileInfo":
      return <ProfileInfoPage onContinue={() => setAuthScreen("app")} />;

    case "app":
      if (isAuthenticated) return <AuthenticatedApp />;
      return (
        <LoginPage
          onNavigateToRegister={() => setAuthScreen("register")}
          onLoginSuccess={() => setAuthScreen("app")}
        />
      );

    default:
      return (
        <LoginPage
          onNavigateToRegister={() => setAuthScreen("register")}
          onLoginSuccess={() => setAuthScreen("app")}
        />
      );
  }
}

export default App;
