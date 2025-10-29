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
import { LoadingScreen } from "@/pages/FindingPodLoadingScreen";
import { PodListScreen } from "@/pages/PodListScreen";
import { mockFlights } from "@/mock/mockFlights";
import { CreatePodScreen } from "@/pages/CreatePodScreen";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import type { Screen } from "@/types/index.ts";

import "./App.css";

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
      if (planeCodeArg) setPlaneCode(planeCodeArg);
      if (dateArg) setSelectedDate(dateArg);

      if (payloadArg?.flight) {
         setPayload(payloadArg);
      } else if (payloadArg) {
         setSelectedFlight(payloadArg);
      }

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
               <FlightInputScreen
                  onNavigate={navigateTo}
                  planeCode={planeCode}
               />
            );
         case "flightInput":
            return (
               <FlightInputScreen
                  onNavigate={navigateTo}
                  planeCode={planeCode}
               />
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
         case "flightPreferences":
            return (
               <RidePreferencesScreen
                  onNavigate={navigateTo}
                  flight={selectedFlight}
               />
            );
         case "loading":
            return payload ? (
               <LoadingScreen onNavigate={navigateTo} payload={payload} />
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
               <CreatePodScreen
                  onNavigate={navigateTo}
                  flight={selectedFlight}
               />
            ) : null;

         default:
            return (
               <FlightInputScreen
                  onNavigate={navigateTo}
                  planeCode={planeCode}
               />
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
   setAuthScreen: (
      screen: "login" | "register" | "profileInfo" | "app"
   ) => void;
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
