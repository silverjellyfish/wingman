type Screen = "ride" | "trip" | "profile";

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({
  currentScreen,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <div className="max-w-[400px] shrink-0 w-full">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex items-center justify-between max-w-inherit p-[10px] relative w-full">
          <div className="basis-0 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] bg-card content-stretch flex gap-[69px] grow items-center justify-center min-h-px min-w-px relative rounded-[20px] shrink-0">
            {/* Ride Tab */}
            <button
              onClick={() => onNavigate("ride")}
              className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px] cursor-pointer border-none bg-transparent outline-none"
            >
              <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[28px] flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      currentScreen === "ride"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    local_taxi
                  </span>
                </div>
                <div
                  className={`flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center tracking-[0.07px] w-[min-content] ${
                    currentScreen === "ride"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <p className="leading-none">Ride</p>
                </div>
              </div>
              <div
                className={`h-[4px] max-w-[20px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-full ${
                  currentScreen === "ride" ? "bg-foreground" : "bg-card"
                }`}
              />
            </button>

            {/* Trips Tab */}
            <button
              onClick={() => onNavigate("trip")}
              className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px] cursor-pointer border-none bg-transparent outline-none"
            >
              <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[28px] flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      currentScreen === "trip"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    luggage
                  </span>
                </div>
                <div
                  className={`flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center tracking-[0.07px] w-[min-content] ${
                    currentScreen === "trip"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <p className="leading-none">Trips</p>
                </div>
              </div>
              <div
                className={`h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px] ${
                  currentScreen === "trip" ? "bg-foreground" : "bg-card"
                }`}
              />
            </button>

            {/* Profile Tab */}
            <button
              onClick={() => onNavigate("profile")}
              className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px] cursor-pointer border-none bg-transparent outline-none"
            >
              <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[28px] flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      currentScreen === "profile"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    person
                  </span>
                </div>
                <div
                  className={`flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center tracking-[0.07px] w-[min-content] ${
                    currentScreen === "profile"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <p className="leading-none">Profile</p>
                </div>
              </div>
              <div
                className={`h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px] ${
                  currentScreen === "profile" ? "bg-foreground" : "bg-card"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
