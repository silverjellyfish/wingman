import { useState, useMemo } from 'react';
import svgPaths from "../imports/svg-ykv25x6ih7";
import imgImage2 from "figma:asset/4b73ae532dc3366f700494427c4db1fa0d45dedd.png";

// Helper function to calculate arrival times
function calculateArrivalTime(boardingTime: string, minutesBefore: number): string {
  // Parse boarding time (e.g., "9:30PM")
  const timeMatch = boardingTime.match(/(\d+):(\d+)(AM|PM)/);
  if (!timeMatch) return boardingTime;
  
  let hours = parseInt(timeMatch[1]);
  const minutes = parseInt(timeMatch[2]);
  const period = timeMatch[3];
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  // Calculate arrival time
  const totalMinutes = hours * 60 + minutes - minutesBefore;
  const arrivalHours = Math.floor(totalMinutes / 60);
  const arrivalMinutes = totalMinutes % 60;
  
  // Convert back to 12-hour format
  let displayHours = arrivalHours % 24;
  if (displayHours < 0) displayHours += 24;
  
  const displayPeriod = displayHours >= 12 ? 'PM' : 'AM';
  if (displayHours > 12) displayHours -= 12;
  if (displayHours === 0) displayHours = 12;
  
  return `${displayHours}:${arrivalMinutes.toString().padStart(2, '0')}${displayPeriod}`;
}

interface FlightPreferencesScreenProps {
  onNavigate: (screen: string) => void;
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_3_996)" id="Frame">
          <path d={svgPaths.p17d51480} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_996">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button 
      onClick={onBack}
      className="box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[17px] relative rounded-[6px] shrink-0 w-[83px] hover:bg-zinc-800 transition-colors" 
      data-name="Button"
    >
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Frame />
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Back</p>
      </div>
    </button>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-center bg-cover bg-no-repeat ml-0 mt-0 size-[22px]" data-name="image 2" style={{ backgroundImage: `url('${imgImage2}')` }} />
      <div className="[grid-area:1_/_1] font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] ml-[57px] mt-[3px] relative text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px] translate-x-[-50%]">
        <p className="leading-none whitespace-pre">AA 1819</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
      <Group1 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Jul 20 → Jul 21</p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex font-['Geist:Medium',_sans-serif] font-medium items-center justify-between leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] w-full">
      <div className="relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">Nashville to Ohio</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">BNA → CMH</p>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame39 />
      <Frame41 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p2a05c680} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame4 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">9:30PM</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p3412c700} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame5 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">10:00PM</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p5fec400} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame6 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">1:00AM</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame7 />
      <Frame9 />
      <Frame8 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame76 />
      <Frame40 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-zinc-800 relative rounded-[16px] shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[12px] relative w-full">
          <Frame63 />
        </div>
      </div>
    </div>
  );
}

function Input({ value, onChange, placeholder, unit }: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string;
  unit?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = isFocused && unit ? value.replace(/[^0-9]/g, '') : value;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (unit && value && !value.includes(unit)) {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue) {
        onChange(`${numericValue} ${unit}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (isFocused && unit) {
      onChange(inputValue.replace(/[^0-9]/g, ''));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <input 
            type="text"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none w-full font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white placeholder-zinc-400 tracking-[0.07px]"
          />
        </div>
      </div>
    </div>
  );
}

function Frame52({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Earliest before boarding</p>
      </div>
      <Input value={value} onChange={onChange} placeholder="120 mins" unit="mins" />
    </div>
  );
}

function Frame53({ earliestArrival }: { earliestArrival: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-[97px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-zinc-400 tracking-[0.07px] w-full">
        <p className="leading-none">Earliest Arrival</p>
      </div>
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px] w-full">
        <p className="leading-none">{earliestArrival}</p>
      </div>
    </div>
  );
}

function Frame56({ earliestTime, setEarliestTime, earliestArrival }: { 
  earliestTime: string; 
  setEarliestTime: (value: string) => void;
  earliestArrival: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-[159px]">
      <Frame52 value={earliestTime} onChange={setEarliestTime} />
      <Frame53 earliestArrival={earliestArrival} />
    </div>
  );
}

function Frame51({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Latest before boarding</p>
      </div>
      <Input value={value} onChange={onChange} placeholder="60 mins" unit="mins" />
    </div>
  );
}

function Frame54({ latestArrival }: { latestArrival: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-[89px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-zinc-400 tracking-[0.07px] w-full">
        <p className="leading-none">Latest Arrival</p>
      </div>
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px] w-full">
        <p className="leading-none">{latestArrival}</p>
      </div>
    </div>
  );
}

function Frame55({ latestTime, setLatestTime, latestArrival }: { 
  latestTime: string; 
  setLatestTime: (value: string) => void;
  latestArrival: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-[151px]">
      <Frame51 value={latestTime} onChange={setLatestTime} />
      <Frame54 latestArrival={latestArrival} />
    </div>
  );
}

function Frame57({ earliestTime, setEarliestTime, latestTime, setLatestTime }: { 
  earliestTime: string; 
  setEarliestTime: (value: string) => void;
  latestTime: string;
  setLatestTime: (value: string) => void;
}) {
  const boardingTime = "9:30PM"; // This should come from flight data
  
  // Calculate dynamic arrival times based on user input
  const earliestArrival = useMemo(() => {
    const minutesMatch = earliestTime.match(/(\d+)/);
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 120;
    return calculateArrivalTime(boardingTime, minutes);
  }, [earliestTime, boardingTime]);
  
  const latestArrival = useMemo(() => {
    const minutesMatch = latestTime.match(/(\d+)/);
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 60;
    return calculateArrivalTime(boardingTime, minutes);
  }, [latestTime, boardingTime]);

  return (
    <div className="content-stretch flex gap-[26px] items-center relative shrink-0 w-full">
      <Frame56 
        earliestTime={earliestTime} 
        setEarliestTime={setEarliestTime} 
        earliestArrival={earliestArrival}
      />
      <Frame55 
        latestTime={latestTime} 
        setLatestTime={setLatestTime} 
        latestArrival={latestArrival}
      />
    </div>
  );
}

function Frame58({ earliestTime, setEarliestTime, latestTime, setLatestTime }: { 
  earliestTime: string; 
  setEarliestTime: (value: string) => void;
  latestTime: string;
  setLatestTime: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[0.12px] w-full">
        <p className="leading-none">Timing</p>
      </div>
      <Frame57 earliestTime={earliestTime} setEarliestTime={setEarliestTime} latestTime={latestTime} setLatestTime={setLatestTime} />
    </div>
  );
}

function Frame59({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Checked Bags</p>
      </div>
      <Input value={value} onChange={onChange} placeholder="number of bags" unit="bags" />
    </div>
  );
}

function Frame60({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Carry-On Bags</p>
      </div>
      <Input value={value} onChange={onChange} placeholder="number of bags" unit="bags" />
    </div>
  );
}

function Frame65({ checkedBags, setCheckedBags, carryOnBags, setCarryOnBags }: { 
  checkedBags: string;
  setCheckedBags: (value: string) => void;
  carryOnBags: string;
  setCarryOnBags: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex gap-[51px] items-center relative shrink-0 w-full">
      <Frame59 value={checkedBags} onChange={setCheckedBags} />
      <Frame60 value={carryOnBags} onChange={setCarryOnBags} />
    </div>
  );
}

function Frame66({ checkedBags, setCheckedBags, carryOnBags, setCarryOnBags }: { 
  checkedBags: string;
  setCheckedBags: (value: string) => void;
  carryOnBags: string;
  setCarryOnBags: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-[321px]">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[0.12px] w-full">
        <p className="leading-none">Luggage</p>
      </div>
      <Frame65 checkedBags={checkedBags} setCheckedBags={setCheckedBags} carryOnBags={carryOnBags} setCarryOnBags={setCarryOnBags} />
    </div>
  );
}

function LocationInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const locations = [
    'Zeppos Tower',
    'Rothschild College', 
    'Carmichael College',
    'EBI',
    'Kissam',
    'Commons'
  ];

  const filteredLocations = locations.filter(location => 
    location.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleLocationSelect = (location: string) => {
    onChange(location);
    setInputValue('');
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue('');
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay to allow clicking on dropdown items
  };

  return (
    <div className="relative w-full">
      <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
        <div className="max-w-inherit relative size-full">
          <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
            <input 
              type="text"
              value={isFocused ? inputValue : value}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="location"
              className="bg-transparent border-none outline-none w-full font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white placeholder-zinc-400 tracking-[0.07px]"
            />
          </div>
        </div>
      </div>
      
      {isFocused && filteredLocations.length > 0 && (
        <div className="absolute top-[44px] left-0 right-0 bg-zinc-800 border border-zinc-700 rounded-[6px] shadow-lg z-10 max-h-[200px] overflow-y-auto">
          {filteredLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full text-left px-[13px] py-[8px] hover:bg-zinc-700 transition-colors font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] first:rounded-t-[6px] last:rounded-b-[6px]"
            >
              {location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Frame67({ location, setLocation }: { location: string; setLocation: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[193px]">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-white tracking-[0.12px] w-full">
        <p className="leading-none">Pick up Location</p>
      </div>
      <LocationInput value={location} onChange={setLocation} />
    </div>
  );
}

function Frame69({ 
  earliestTime, 
  setEarliestTime, 
  latestTime, 
  setLatestTime, 
  checkedBags, 
  setCheckedBags, 
  carryOnBags, 
  setCarryOnBags, 
  location, 
  setLocation 
}: { 
  earliestTime: string; 
  setEarliestTime: (value: string) => void;
  latestTime: string;
  setLatestTime: (value: string) => void;
  checkedBags: string;
  setCheckedBags: (value: string) => void;
  carryOnBags: string;
  setCarryOnBags: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame58 earliestTime={earliestTime} setEarliestTime={setEarliestTime} latestTime={latestTime} setLatestTime={setLatestTime} />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(39, 39, 42, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 345 2">
            <line id="Line 1" stroke="var(--stroke-0, #27272A)" strokeLinecap="round" strokeWidth="2" x1="1" x2="344" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <Frame66 checkedBags={checkedBags} setCheckedBags={setCheckedBags} carryOnBags={carryOnBags} setCarryOnBags={setCarryOnBags} />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(39, 39, 42, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 345 2">
            <line id="Line 1" stroke="var(--stroke-0, #27272A)" strokeLinecap="round" strokeWidth="2" x1="1" x2="344" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <Frame67 location={location} setLocation={setLocation} />
    </div>
  );
}

function Frame68({ 
  earliestTime, 
  setEarliestTime, 
  latestTime, 
  setLatestTime, 
  checkedBags, 
  setCheckedBags, 
  carryOnBags, 
  setCarryOnBags, 
  location, 
  setLocation 
}: { 
  earliestTime: string; 
  setEarliestTime: (value: string) => void;
  latestTime: string;
  setLatestTime: (value: string) => void;
  checkedBags: string;
  setCheckedBags: (value: string) => void;
  carryOnBags: string;
  setCarryOnBags: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
      <Frame61 />
      <Frame69 
        earliestTime={earliestTime} 
        setEarliestTime={setEarliestTime} 
        latestTime={latestTime} 
        setLatestTime={setLatestTime} 
        checkedBags={checkedBags} 
        setCheckedBags={setCheckedBags} 
        carryOnBags={carryOnBags} 
        setCarryOnBags={setCarryOnBags} 
        location={location} 
        setLocation={setLocation} 
      />
    </div>
  );
}

function SearchButton({ onSearch }: { onSearch: () => void }) {
  return (
    <button 
      onClick={onSearch}
      className="bg-[#aa67d2] h-[44px] relative rounded-[6px] shrink-0 w-full hover:bg-[#9855c4] transition-colors" 
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[44px] items-center justify-center pb-[12.5px] pt-[11.5px] px-[32px] relative w-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
            <p className="leading-none whitespace-pre">Search for rideshare</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame37({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [earliestTime, setEarliestTime] = useState('120 mins');
  const [latestTime, setLatestTime] = useState('60 mins');
  const [checkedBags, setCheckedBags] = useState('');
  const [carryOnBags, setCarryOnBags] = useState('');
  const [location, setLocation] = useState('');

  const handleBack = () => {
    onNavigate('results');
  };

  const handleSearch = () => {
    onNavigate('loading');
  };

  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start px-[12px] py-[40px] relative size-full">
          <BackButton onBack={handleBack} />
          <Frame68 
            earliestTime={earliestTime} 
            setEarliestTime={setEarliestTime} 
            latestTime={latestTime} 
            setLatestTime={setLatestTime} 
            checkedBags={checkedBags} 
            setCheckedBags={setCheckedBags} 
            carryOnBags={carryOnBags} 
            setCarryOnBags={setCarryOnBags} 
            location={location} 
            setLocation={setLocation} 
          />
          <SearchButton onSearch={handleSearch} />
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

export default function FlightPreferencesScreen({ onNavigate }: FlightPreferencesScreenProps) {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 04">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 onNavigate={onNavigate} />
          <Nav onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}