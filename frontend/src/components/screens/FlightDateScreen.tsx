import { useState } from 'react';
import svgPaths from "../imports/svg-m08n5llniw";

interface FlightDateScreenProps {
  onNavigate: (screen: string) => void;
}

// Calendar component with all the same structure as the Figma import
function Container() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.07px]">
            <p className="leading-none whitespace-pre">AA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[46px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.07px]">
            <p className="leading-none whitespace-pre">1819</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[54px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container1 />
    </div>
  );
}

function Input2({ selectedDate, onDateInputClick }: { 
  selectedDate: string; 
  onDateInputClick: () => void;
}) {
  return (
    <button 
      onClick={onDateInputClick}
      className="basis-0 bg-zinc-950 grow h-[40px] max-w-[320px] min-h-px min-w-px relative rounded-[6px] shrink-0 hover:bg-zinc-900 transition-colors cursor-pointer" 
      data-name="Input"
    >
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
            <div className="flex flex-col justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
                <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap tracking-[0.07px]">
                  <p className="leading-none whitespace-pre">
                    <span className={selectedDate ? "text-neutral-50" : "text-zinc-400"}>
                      {selectedDate || "MM/DD/YYYY"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Button({ onSearch }: { onSearch: () => void }) {
  return (
    <button 
      onClick={onSearch}
      className="bg-zinc-800 box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative rounded-[6px] shrink-0 hover:bg-zinc-700 transition-colors" 
      data-name="Button"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">Search</p>
      </div>
    </button>
  );
}

function Frame47({ selectedDate, onSearch, onDateInputClick }: { 
  selectedDate: string; 
  onSearch: () => void;
  onDateInputClick: () => void;
}) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input />
      <Input1 />
      <Input2 selectedDate={selectedDate} onDateInputClick={onDateInputClick} />
      <Button onSearch={onSearch} />
    </div>
  );
}

// Calendar grid components
function CalendarDay({ day, isSelected = false, isDisabled = false, onClick }: { 
  day: string | number; 
  isSelected?: boolean; 
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const baseClasses = "box-border content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[36px] cursor-pointer hover:bg-zinc-700 transition-colors";
  const textClasses = isDisabled 
    ? "text-zinc-400 opacity-50" 
    : isSelected 
      ? "text-zinc-900" 
      : "text-neutral-50";
  const bgClasses = isSelected ? "bg-neutral-50" : "";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${bgClasses}`}
      disabled={isDisabled}
    >
      <div className={`flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap ${textClasses}`}>
        <p className="leading-[20px] whitespace-pre">{day}</p>
      </div>
    </button>
  );
}

function Calendar({ onDateSelect }: { onDateSelect: (date: string) => void }) {
  const [selectedDate, setSelectedDate] = useState(20);

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    onDateSelect(`07/${day.toString().padStart(2, '0')}/2024`);
  };

  const monthDays = [
    { day: 30, isDisabled: true },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
    { day: 1, isDisabled: true }, { day: 2, isDisabled: true }, { day: 3, isDisabled: true }
  ];

  return (
    <div className="bg-[#16161b] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[6px] shrink-0" data-name="Calendar">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      
      {/* Calendar Header */}
      <div className="content-stretch flex flex-col gap-[16px] items-start relative self-stretch shrink-0">
        <div className="h-[24px] relative shrink-0 w-[252px]">
          <div className="absolute content-stretch flex flex-col items-start translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 2px)", left: "calc(50% - 4.62px)" }}>
            <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-50 text-nowrap">
              <p className="leading-[20px] whitespace-pre">July 2024</p>
            </div>
          </div>
        </div>
        
        {/* Days of week header */}
        <div className="content-stretch flex items-start relative shrink-0 w-full">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="box-border content-stretch flex flex-col items-center justify-center pb-[1.09px] pt-[0.9px] px-[10px] relative rounded-[6px] self-stretch shrink-0 w-[36px]">
              <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12.8px] text-center text-nowrap text-zinc-400">
                <p className="leading-[19.2px] whitespace-pre">{day}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[8px] px-0 relative shrink-0">
          {Array.from({ length: 5 }, (_, weekIndex) => (
            <div key={weekIndex} className="content-stretch flex items-start relative shrink-0 w-full">
              {monthDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayData, dayIndex) => (
                <div key={`${weekIndex}-${dayIndex}`} className="content-stretch flex flex-col items-center relative shrink-0 size-[36px]">
                  <CalendarDay
                    day={dayData.day}
                    isSelected={dayData.day === selectedDate && !dayData.isDisabled}
                    isDisabled={dayData.isDisabled}
                    onClick={() => !dayData.isDisabled && handleDateClick(dayData.day as number)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame75({ selectedDate, setSelectedDate, onSearch }: { 
  selectedDate: string; 
  setSelectedDate: (date: string) => void; 
  onSearch: () => void; 
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleDateInputClick = () => {
    setShowCalendar(true);
  };

  const handleClickOutside = () => {
    setShowCalendar(false);
  };

  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center relative shrink-0 w-full">
      <Frame47 selectedDate={selectedDate} onSearch={onSearch} onDateInputClick={handleDateInputClick} />
      {showCalendar && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleClickOutside} />
          <div className="relative z-20">
            <Calendar onDateSelect={handleDateSelect} />
          </div>
        </>
      )}
    </div>
  );
}

function Frame37({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = () => {
    onNavigate('results');
  };

  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-center px-[12px] py-[40px] relative size-full">
          <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-nowrap text-white tracking-[0.12px]">
            <p className="leading-none whitespace-pre">Hello, Vince</p>
          </div>
          <Frame75 selectedDate={selectedDate} setSelectedDate={setSelectedDate} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
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

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
      <CarTaxi1TransportationTravelTaxiTransportCabCar1 />
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-neutral-50 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Ride</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame1 />
      <div className="bg-neutral-50 h-[4px] max-w-[20px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-full" />
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

function ClipboardCheckCheckmarkEditTaskEditionChecklistCheckSuccessClipboardForm1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form">
      <ClipboardCheckCheckmarkEditTaskEditionChecklistCheckSuccessClipboardForm />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
      <ClipboardCheckCheckmarkEditTaskEditionChecklistCheckSuccessClipboardForm1 />
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Trips</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame2 />
      <div className="bg-[#28282d] h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
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

function UserCircleSingleCircleGeometricHumanPersonSingleUser1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="user-circle-single--circle-geometric-human-person-single-user">
      <UserCircleSingleCircleGeometricHumanPersonSingleUser />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
      <UserCircleSingleCircleGeometricHumanPersonSingleUser1 />
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Profile</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame3 />
      <div className="bg-[#28282d] h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
    </div>
  );
}

function Nav({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="bg-[#28282d] relative rounded-[28px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Nav">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[48px] py-0 relative w-full">
          <Frame25 />
          <button onClick={() => onNavigate('trips')}>
            <Frame26 />
          </button>
          <button onClick={() => onNavigate('profile')}>
            <Frame24 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FlightDateScreen({ onNavigate }: FlightDateScreenProps) {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 07">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 onNavigate={onNavigate} />
          <Nav onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}