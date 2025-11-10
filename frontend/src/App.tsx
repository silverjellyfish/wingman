// Contributors: Michelle, Vince, Samantha
// Time: 1 hour

import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { TripScreen } from "@/pages/TripScreen";
import { ProfileScreen } from "@/pages/ProfileScreen";
import { ProfileInfoPage } from "@/pages/auth/ProfileInfoPage";
import { FlightInputScreen } from "@/pages/SearchFlightScreen";
import { FlightResultsScreen } from "@/pages/FlightResultsScreen";
import { RidePreferencesScreen } from "@/pages/RidePreferencesScreen";
import { LoadingScreen } from "@/pages/LoadingScreen";
import { PodListScreen } from "@/pages/PodListScreen";
// import { mockFlights } from "@/mock/mockFlights";
import { CreatePodScreen } from "@/pages/CreatePodScreen";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import type { Screen } from "@/types/index.ts";
import { Toaster } from "sonner";

import "./App.css";

interface MappedFlight {
  id: string;
  flightCode: string;
  dateRange: string;
  route: string;
  airports: string;
  boardingTime: string;
  departureTime: string;
  arrivalTime: string;
}

interface FlightPayload {
  flight: any;
  flights?: MappedFlight[];
}

function AuthenticatedApp() {
  const [payload, setPayload] = useState<any>(null);

  const [currentScreen, setCurrentScreen] = useState<Screen>("ride");
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
  const [planeCode, setPlaneCode] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState("");

  const navigateTo = (
    screen: Screen,
    planeCodeArg?: string,
    dateArg?: string,
    payloadArg?: any
  ) => {
    if (planeCodeArg) {
      setPlaneCode(planeCodeArg);
    }
    if (dateArg) {
      setSelectedDate(dateArg);
    }

    // CONSOLIDATED LOGIC: Set payload only once if provided
    if (payloadArg) {
      setPayload(payloadArg);
      // Save selected flight only when it’s a flight object
      if (payloadArg?.flight) {
        setSelectedFlight(payloadArg.flight);
      }
    }

    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "ride":
        return (
          <FlightInputScreen onNavigate={navigateTo} planeCode={planeCode} />
        );
      case "flightInput":
        return (
          <FlightInputScreen onNavigate={navigateTo} planeCode={planeCode} />
        );
      case "flightResults":
        return (
          <FlightResultsScreen
            onNavigate={navigateTo}
            planeCode={planeCode}
            date={selectedDate}
            payload={payload}
          />
        );

      case "flightPreferences":
        const flightsFromPayload = payload?.flights || [];
        return (
          <RidePreferencesScreen
            onNavigate={navigateTo}
            flight={selectedFlight}
            flights={flightsFromPayload}
          />
        );
      case "loading":
        return payload ? (
          <LoadingScreen
            text="Searching for rides..."
            duration={3000}
            onComplete={() =>
              navigateTo("rideWithGroup", undefined, undefined, payload)
            }
          />
        ) : null;

      case "rideWithGroup":
        return payload ? (
          <PodListScreen onNavigate={navigateTo} payload={payload} />
        ) : null;

      case "trip":
        return <TripScreen onNavigate={navigateTo} />;
      case "profile":
        return <ProfileScreen onNavigate={navigateTo} />;
      case "createPod":
        return selectedFlight ? (
          <CreatePodScreen onNavigate={navigateTo} flight={selectedFlight} />
        ) : null;

      default:
        return (
          <FlightInputScreen onNavigate={navigateTo} planeCode={planeCode} />
        );
    }
  };

  // Determine if current screen should show the bottom navigation
  const shouldShowNavbar = !["loading", "createPod"].includes(currentScreen);

  // Map currentScreen to BottomNavigation screen type
  const getNavbarScreen = (): "ride" | "trip" | "profile" => {
    if (currentScreen === "trip") return "trip";
    if (currentScreen === "profile") return "profile";
    return "ride"; // Default for all ride-related screens
  };

  return (
    <div className="min-h-screen w-screen bg-[#16161b] flex items-center justify-center">
      <div className="max-w-[393px] w-screen h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">{renderScreen()}</div>
        {shouldShowNavbar && (
          <div className="sticky bottom-0 w-full z-50">
            <BottomNavigation
              currentScreen={getNavbarScreen()}
              onNavigate={navigateTo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [authScreen, setAuthScreen] = useState<
    "login" | "register" | "profileInfo" | "app"
  >("login");
  const [tempUserData, setTempUserData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  return (
    <AuthProvider>
      <AuthWrapper
        authScreen={authScreen}
        setAuthScreen={setAuthScreen}
        tempUserData={tempUserData}
        setTempUserData={setTempUserData}
      />
      <Toaster richColors position="top-center" duration={2000} />
    </AuthProvider>
  );
}

function AuthWrapper({
  authScreen,
  setAuthScreen,
  tempUserData,
  setTempUserData,
}: {
  authScreen: "login" | "register" | "profileInfo" | "app";
  setAuthScreen: (screen: "login" | "register" | "profileInfo" | "app") => void;
  tempUserData: { name: string; email: string; password: string } | null;
  setTempUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
    } | null>
  >;
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
          onNext={(data) => {
            setTempUserData(data);
            setAuthScreen("profileInfo");
          }}
          // onNavigateToProfileInfo={() => setAuthScreen("profileInfo")}
        />
      );

    case "profileInfo":
      return tempUserData ? (
        <ProfileInfoPage
          tempUserData={tempUserData}
          onComplete={() => setAuthScreen("app")}
        />
      ) : null;
    // return <ProfileInfoPage onContinue={() => setAuthScreen("app")} />;

    case "app":
      return isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
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
