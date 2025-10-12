import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { RideScreen } from "@/pages/RideScreen";
import { FlightInputScreen } from "@/pages/FlightInputScreen";
import { FlightDateScreen } from "@/pages/FlightDateScreen";
import { LoadingScreen } from "@/pages/LoadingScreen";
import { GroupMatchingScreen } from "@/pages/GroupMatchingScreen";
import { FlightResultsScreen } from "@/pages/FlightResultsScreen";
import { FlightPreferencesScreen } from "@/pages/FlightPreferencesScreen";
import { GroupDetailScreen } from "@/pages/GroupDetailScreen";
import { RideScreenWithGroup } from "@/pages/RideScreenWithGroup";
import { TripScreen } from "@/pages/TripScreen";
import { ProfileScreen } from "@/pages/ProfileScreen";
import "./App.css";

type Screen =
   | "login"
   | "register"
   | "ride"
   | "flightInput"
   | "flightDate"
   | "loading"
   | "groupMatching"
   | "flightResults"
   | "flightPreferences"
   | "groupDetail"
   | "rideWithGroup"
   | "trip"
   | "profile";

function AuthenticatedApp() {
   const [currentScreen, setCurrentScreen] = useState<Screen>("ride");
   const [hasJoinedGroup, setHasJoinedGroup] = useState(false);

   const navigateTo = (screen: Screen) => {
      setCurrentScreen(screen);
   };

   const handleJoinGroup = () => {
      setHasJoinedGroup(true);
      setCurrentScreen("rideWithGroup");
   };

   const handleLeaveGroup = () => {
      setHasJoinedGroup(false);
      setCurrentScreen("ride");
   };

   const renderScreen = () => {
      switch (currentScreen) {
         case "ride":
            return (
               <RideScreen
                  onNavigate={navigateTo}
                  hasJoinedGroup={hasJoinedGroup}
               />
            );
         case "flightInput":
            return <FlightInputScreen onNavigate={navigateTo} />;
         case "flightDate":
            return <FlightDateScreen onNavigate={navigateTo} />;
         case "loading":
            return <LoadingScreen onNavigate={navigateTo} />;
         case "groupMatching":
            return (
               <GroupMatchingScreen
                  onNavigate={navigateTo}
                  onJoinGroup={handleJoinGroup}
               />
            );
         case "flightResults":
            return <FlightResultsScreen onNavigate={navigateTo} />;
         case "flightPreferences":
            return <FlightPreferencesScreen onNavigate={navigateTo} />;
         case "groupDetail":
            return (
               <GroupDetailScreen
                  onNavigate={navigateTo}
                  onJoinGroup={handleJoinGroup}
                  onLeaveGroup={handleLeaveGroup}
               />
            );
         case "rideWithGroup":
            return (
               <RideScreenWithGroup
                  onNavigate={navigateTo}
                  onLeaveGroup={handleLeaveGroup}
               />
            );
         case "trip":
            return <TripScreen onNavigate={navigateTo} />;
         case "profile":
            return <ProfileScreen onNavigate={navigateTo} />;
         default:
            return (
               <RideScreen
                  onNavigate={navigateTo}
                  hasJoinedGroup={hasJoinedGroup}
               />
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
   const [authScreen, setAuthScreen] = useState<"login" | "register" | "app">(
      "login"
   );

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
   authScreen: "login" | "register" | "app";
   setAuthScreen: (screen: "login" | "register" | "app") => void;
}) {
   const { isAuthenticated, isLoading } = useAuth();

   if (isLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#16161b]">
            <p className="text-muted-foreground">Loading...</p>
         </div>
      );
   }

   if (!isAuthenticated) {
      if (authScreen === "login") {
         return (
            <LoginPage onNavigateToRegister={() => setAuthScreen("register")} />
         );
      }
      return <RegisterPage onNavigateToLogin={() => setAuthScreen("login")} />;
   }

   return <AuthenticatedApp />;
}

export default App;
