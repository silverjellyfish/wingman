import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-ornxuce90z";

interface RideScreenProps {
  onNavigate: (screen: string) => void;
  showLeaveToast?: boolean;
}

function Toast({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg font-['Geist:Medium',_sans-serif] font-medium text-[14px]">
        {message}
      </div>
    </div>
  );
}

function MagnifyingGlassGlassSearchMagnifying() {
  return (
    <div className="absolute inset-[7.143%]" data-name="magnifying-glass--glass-search-magnifying">
      <div className="absolute inset-[-8.333%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g id="magnifying-glass--glass-search-magnifying">
            <path d={svgPaths.p13620c00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M13 13L9.76923 9.76923" id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function MagnifyingGlassGlassSearchMagnifying1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="magnifying-glass--glass-search-magnifying">
      <MagnifyingGlassGlassSearchMagnifying />
    </div>
  );
}

function AddCircleButtonRemoveCrossAddButtonsPlusCircleMathematicsMath() {
  return (
    <div className="absolute inset-[-7.14%]" data-name="add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math">
          <path clipRule="evenodd" d="M12.0001 12.0001C9.79094 14.2093 6.20919 14.2093 4.00003 12.0001C1.79088 9.79094 1.79087 6.20919 4.00003 4.00003C6.20919 1.79088 9.79094 1.79088 12.0001 4.00003C14.2093 6.20919 14.2093 9.79094 12.0001 12.0001ZM10.1429 5.85719C10.3796 6.09388 10.3796 6.47765 10.1429 6.71434L8.85721 8.00007L10.1429 9.28579C10.3796 9.52248 10.3796 9.90625 10.1429 10.1429C9.90625 10.3796 9.52248 10.3796 9.28579 10.1429L8.00006 8.85722L6.71434 10.1429C6.47765 10.3796 6.09388 10.3796 5.85719 10.1429C5.6205 9.90625 5.6205 9.52248 5.85719 9.28579L7.14292 8.00007L5.85719 6.71434C5.6205 6.47765 5.6205 6.09388 5.85719 5.85719C6.09388 5.6205 6.47765 5.6205 6.71434 5.85719L8.00006 7.14292L9.28579 5.85719C9.52248 5.6205 9.90625 5.6205 10.1429 5.85719Z" fill="var(--fill-0, #A1A1AA)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function AddCircleButtonRemoveCrossAddButtonsPlusCircleMathematicsMath1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math">
      <AddCircleButtonRemoveCrossAddButtonsPlusCircleMathematicsMath />
    </div>
  );
}

// Parse flight code into airline letters and number
function parseFlightCode(input: string): { airlineCode: string; flightNumber: string } {
  const match = input.match(/^([A-Z]{1,3})(\d+)$/i);
  if (match) {
    return {
      airlineCode: match[1].toUpperCase(),
      flightNumber: match[2]
    };
  }
  return { airlineCode: '', flightNumber: '' };
}

// Initial state: clean search input (Trip12)
function InitialInput({ onFocus }: { onFocus: () => void }) {
  return (
    <div className="w-full">
      <div className="bg-zinc-950 h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center px-[13px] py-[11.5px] relative w-full">
            <MagnifyingGlassGlassSearchMagnifying1 />
            <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
              <div className="flex flex-col justify-center overflow-clip relative size-full">
                <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
                  <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
                    <p className="leading-none whitespace-pre">Search for flight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input 
          type="text"
          onFocus={onFocus}
          className="absolute inset-0 opacity-0 cursor-text"
        />
      </div>
    </div>
  );
}

// Focused state: cursor + placeholder (Trip10)
function FocusedInput({ 
  value, 
  onChange, 
  onSubmit, 
  onClear, 
  onBlur 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  onSubmit: () => void;
  onClear: () => void;
  onBlur: () => void;
}) {
  const hasValue = value.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValue) {
      onSubmit();
    }
  };

  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <form onSubmit={handleSubmit} className="basis-0 grow max-w-[320px] min-w-px">
        <div className="bg-zinc-950 h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
          <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
          <div className="flex flex-row items-center max-w-inherit relative size-full">
            <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
              <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
                <div className="flex flex-col justify-center overflow-clip relative size-full">
                  <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
                    <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap tracking-[0.07px]">
                      {hasValue ? (
                        <p className="leading-none whitespace-pre text-white">
                          {value}<span className="text-[#00bbff]">|</span>
                        </p>
                      ) : (
                        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-none not-italic whitespace-pre text-[14px]">
                          <span className="text-[#00bbff]">|</span>
                          <span className="text-zinc-400">Plane code (e.g. WN123)</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {hasValue && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex items-center justify-center relative z-10"
                >
                  <AddCircleButtonRemoveCrossAddButtonsPlusCircleMathematicsMath1 />
                </button>
              )}
            </div>
          </div>
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className="absolute inset-0 opacity-0 cursor-text"
            style={{ 
              caretColor: 'transparent',
              paddingRight: hasValue ? '30px' : '0px' // Leave space for clear button
            }}
            autoFocus
          />
        </div>
      </form>
      
      <button
        onClick={handleSubmit}
        disabled={!hasValue}
        className={`box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative rounded-[6px] shrink-0 transition-all duration-200 ${
          hasValue 
            ? 'bg-neutral-50 hover:bg-zinc-100 cursor-pointer' 
            : 'bg-zinc-800 cursor-not-allowed'
        }`}
        data-name="Button"
      >
        <div className={`flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap ${
          hasValue ? 'text-zinc-900' : 'text-zinc-900'
        }`}>
          <p className="leading-[20px] whitespace-pre">Next</p>
        </div>
      </button>
    </div>
  );
}

function SearchInputSection({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!searchValue.trim()) {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setIsFocused(false);
  };

  const handleSubmit = () => {
    if (searchValue.trim()) {
      const parsed = parseFlightCode(searchValue.trim());
      if (parsed.airlineCode && parsed.flightNumber) {
        onNavigate('date');
      }
    }
  };

  // Show focused input if user has clicked or typed
  if (isFocused) {
    return (
      <FocusedInput 
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSubmit}
        onClear={handleClear}
        onBlur={handleBlur}
      />
    );
  }

  // Show initial clean input
  return <InitialInput onFocus={handleFocus} />;
}

function CarTaxi1TransportationTravelTaxiTransportCabCar() {
  return (
    <div className="absolute inset-[14.29%_3.57%_10.71%_3.57%]" data-name="car-taxi-1--transportation-travel-taxi-transport-cab-car">
      <div className="absolute inset-[-4.76%_-3.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 23">
          <g id="car-taxi-1--transportation-travel-taxi-transport-cab-car">
            <path d={svgPaths.pb85cdc0} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3189a480} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p10cad180} id="Vector_3" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M17.9958 19H10.0001" id="Vector_4" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M14 5V1" id="Vector_5" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CarTaxi1TransportationTravelTaxiTransportCabCar1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="car-taxi-1--transportation-travel-taxi-transport-cab-car">
      <CarTaxi1TransportationTravelTaxiTransportCabCar />
    </div>
  );
}

function ClipboardCheckCheckmarkEditTaskEditionChecklistCheckSuccessClipboardForm() {
  return (
    <div className="absolute inset-[5.51%_14.06%]" data-name="clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form">
      <div className="absolute inset-[-4.01%_-4.97%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 27">
          <g id="clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form">
            <path d={svgPaths.p20e4da00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p178e6800} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pe5cd280} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function UserCircleSingleCircleGeometricHumanPersonSingleUser() {
  return (
    <div className="absolute inset-[4.69%]" data-name="user-circle-single--circle-geometric-human-person-single-user">
      <div className="absolute inset-[-3.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g id="user-circle-single--circle-geometric-human-person-single-user">
            <path d={svgPaths.p259bdd00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p391348e8} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16a72d00} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Nav({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="bg-[#28282d] relative rounded-[28px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Nav">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[48px] py-0 relative w-full">
          {/* Active Ride Button */}
          <button 
            onClick={() => onNavigate('ride')}
            className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]"
          >
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[28px]">
                <CarTaxi1TransportationTravelTaxiTransportCabCar />
              </div>
              <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-neutral-50 tracking-[0.07px]" style={{ width: "min-content" }}>
                <p className="leading-none">Ride</p>
              </div>
            </div>
            <div className="bg-neutral-50 h-[4px] max-w-[20px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-full" />
          </button>
          
          {/* Inactive Trips Button */}
          <button 
            onClick={() => onNavigate('trips')}
            className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]"
          >
            <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[28px]">
                <ClipboardCheckCheckmarkEditTaskEditionChecklistCheckSuccessClipboardForm />
              </div>
              <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
                <p className="leading-none">Trips</p>
              </div>
            </div>
            <div className="bg-[#28282d] h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
          </button>
          
          {/* Inactive Profile Button */}
          <button 
            onClick={() => onNavigate('profile')}
            className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]"
          >
            <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[28px]">
                <UserCircleSingleCircleGeometricHumanPersonSingleUser />
              </div>
              <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
                <p className="leading-none">Profile</p>
              </div>
            </div>
            <div className="bg-[#28282d] h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RideContent({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex flex-col items-center relative size-full">
      <div className="box-border content-stretch flex flex-col gap-[40px] items-center px-[12px] py-[40px] pb-[88px] relative size-full">
        <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-nowrap text-white tracking-[0.12px]">
          <p className="leading-none whitespace-pre">Hello, Vince</p>
        </div>
        <SearchInputSection onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default function RideScreen({ onNavigate, showLeaveToast }: RideScreenProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showLeaveToast) {
      setShowToast(true);
    }
  }, [showLeaveToast]);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full">
      <div className="flex flex-col relative size-full">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <RideContent onNavigate={onNavigate} />
        </div>
        
        {/* Sticky nav bar at bottom */}
        <div className="shrink-0 p-[12px]">
          <Nav onNavigate={onNavigate} />
        </div>
      </div>
      
      {/* Toast notification */}
      <Toast 
        message="You left the group" 
        isVisible={showToast} 
        onClose={handleCloseToast}
      />
    </div>
  );
}