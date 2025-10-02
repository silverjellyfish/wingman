import { useState } from 'react';
import svgPaths from "../imports/svg-jiyq030cru";
import imgImage1 from "figma:asset/3a6e8bd48c0bed015065b49bc3d2d32889faa1e5.png";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

function Avatar() {
  return (
    <div className="overflow-clip relative rounded-[9999px] shrink-0 size-[64px]" data-name="Avatar">
      <div className="absolute bg-center bg-cover bg-no-repeat inset-0" data-name="image 1" style={{ backgroundImage: `url('${imgImage1}')` }} />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold items-start leading-[0] relative shrink-0 w-[106px]">
      <div className="flex flex-col justify-center relative shrink-0 text-[24px] text-center text-white tracking-[0.12px] w-full">
        <p className="leading-none">Vince Lin</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[16px] text-zinc-400 tracking-[0.08px] w-full">
        <p className="leading-none">@vincelin</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[19px] items-center relative shrink-0">
      <Avatar />
      <Frame34 />
    </div>
  );
}

function PencilChangeEditModifyPencilWriteWriting() {
  return (
    <div className="absolute bottom-1/4 left-[24.99%] right-[25.02%] top-[24.99%]" data-name="pencil--change-edit-modify-pencil-write-writing">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="pencil--change-edit-modify-pencil-write-writing">
            <path d={svgPaths.p354d2400} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function PencilChangeEditModifyPencilWriteWriting1({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="overflow-clip relative shrink-0 size-[32px] hover:opacity-75 transition-opacity" 
      data-name="pencil--change-edit-modify-pencil-write-writing"
    >
      <PencilChangeEditModifyPencilWriteWriting />
    </button>
  );
}

function Frame36({ onEditClick, isEditing }: { onEditClick: () => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame35 />
      {!isEditing && <PencilChangeEditModifyPencilWriteWriting1 onClick={onEditClick} />}
    </div>
  );
}

function Container({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="email"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="Enter email"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container value={value} onChange={onChange} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

function Frame31({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Email</p>
      </div>
      <Input value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Container1({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="tel"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="Enter phone number"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input1({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container1 value={value} onChange={onChange} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

function Frame87({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Phone Number</p>
      </div>
      <Input1 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Container2({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="Age"
              min="18"
              max="100"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input2({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center px-[13px] py-[11.5px] relative w-full">
          <Container2 value={value} onChange={onChange} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

function Frame30({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Age</p>
      </div>
      <Input2 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Container3({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip relative shrink-0" data-name="Container">
      {isEditing ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full appearance-none cursor-pointer"
        >
          <option value="Male" className="bg-zinc-950 text-white">Male</option>
          <option value="Female" className="bg-zinc-950 text-white">Female</option>
          <option value="Other" className="bg-zinc-950 text-white">Other</option>
        </select>
      ) : (
        <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
          <p className="leading-none whitespace-pre">{value}</p>
        </div>
      )}
    </div>
  );
}

function Input3({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex gap-[12px] h-[40px] items-center px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <Container3 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame38({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Gender</p>
      </div>
      <Input3 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame32({ age, setAge, gender, setGender, isEditing }: { age: string; setAge: (value: string) => void; gender: string; setGender: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-wrap gap-[16px] sm:gap-[32px] items-center relative shrink-0 w-full">
      <div className="flex-1 min-w-[120px]">
        <Frame30 value={age} onChange={setAge} isEditing={isEditing} />
      </div>
      <div className="flex-1 min-w-[120px]">
        <Frame38 value={gender} onChange={setGender} isEditing={isEditing} />
      </div>
    </div>
  );
}

function Container4({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="120 mins"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input4({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <Container4 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame80({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[159px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Earliest before boarding</p>
      </div>
      <Input4 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Container5({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="60 mins"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input5({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <Container5 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame81({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[151px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Latest before boarding</p>
      </div>
      <Input5 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Container6({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 py-0 relative size-full">
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-transparent border-none outline-none font-['Geist:Medium',_sans-serif] font-medium text-[14px] text-white tracking-[0.07px] w-full h-full placeholder:text-zinc-500"
              placeholder="30 mins"
            />
          ) : (
            <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
              <p className="leading-none whitespace-pre">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input6({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${isEditing ? 'border-zinc-600' : 'border-zinc-800'}`} />
      <Container6 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame82({ value, onChange, isEditing }: { value: string; onChange: (value: string) => void; isEditing: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Longest willing to wait after landing</p>
      </div>
      <Input6 value={value} onChange={onChange} isEditing={isEditing} />
    </div>
  );
}

function Frame33({ 
  email, setEmail, 
  phone, setPhone, 
  age, setAge,
  gender, setGender,
  earliest, setEarliest, 
  latest, setLatest, 
  longestWait, setLongestWait, 
  isEditing 
}: {
  email: string; setEmail: (value: string) => void;
  phone: string; setPhone: (value: string) => void;
  age: string; setAge: (value: string) => void;
  gender: string; setGender: (value: string) => void;
  earliest: string; setEarliest: (value: string) => void;
  latest: string; setLatest: (value: string) => void;
  longestWait: string; setLongestWait: (value: string) => void;
  isEditing: boolean;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame31 value={email} onChange={setEmail} isEditing={isEditing} />
      <Frame87 value={phone} onChange={setPhone} isEditing={isEditing} />
      <Frame32 age={age} setAge={setAge} gender={gender} setGender={setGender} isEditing={isEditing} />
      <Frame80 value={earliest} onChange={setEarliest} isEditing={isEditing} />
      <Frame81 value={latest} onChange={setLatest} isEditing={isEditing} />
      <Frame82 value={longestWait} onChange={setLongestWait} isEditing={isEditing} />
    </div>
  );
}

function Frame37({ 
  onEditClick, 
  email, setEmail, 
  phone, setPhone, 
  age, setAge,
  gender, setGender,
  earliest, setEarliest, 
  latest, setLatest, 
  longestWait, setLongestWait, 
  isEditing,
  onSave
}: {
  onEditClick: () => void;
  email: string; setEmail: (value: string) => void;
  phone: string; setPhone: (value: string) => void;
  age: string; setAge: (value: string) => void;
  gender: string; setGender: (value: string) => void;
  earliest: string; setEarliest: (value: string) => void;
  latest: string; setLatest: (value: string) => void;
  longestWait: string; setLongestWait: (value: string) => void;
  isEditing: boolean;
  onSave: () => void;
}) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[69px] items-center pb-[40px] pt-[80px] px-[40px] relative size-full">
          <Frame36 onEditClick={onEditClick} isEditing={isEditing} />
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <Frame33 
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              age={age} setAge={setAge}
              gender={gender} setGender={setGender}
              earliest={earliest} setEarliest={setEarliest}
              latest={latest} setLatest={setLatest}
              longestWait={longestWait} setLongestWait={setLongestWait}
              isEditing={isEditing}
            />
            
            {/* Save button positioned right after the form */}
            {isEditing && (
              <div className="w-full flex justify-center">
                <button
                  onClick={onSave}
                  className="bg-white text-black py-[12px] px-[32px] rounded-[8px] font-['Geist:Medium',_sans-serif] font-medium text-[16px] hover:bg-gray-100 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>
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
            <path d={svgPaths.pb85cdc0} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3189a480} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p10cad180} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M17.9958 19H10.0001" id="Vector_4" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M14 5V1" id="Vector_5" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
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
            <path d={svgPaths.p259bdd00} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p391348e8} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16a72d00} id="Vector_3" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
          <button 
            onClick={() => onNavigate('ride')}
            className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]"
          >
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[28px]">
                <CarTaxi1TransportationTravelTaxiTransportCabCar />
              </div>
              <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
                <p className="leading-none">Ride</p>
              </div>
            </div>
            <div className="bg-[#28282d] h-[4px] max-w-[20px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-full" />
          </button>
          
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
          
          <button 
            onClick={() => onNavigate('profile')}
            className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]"
          >
            <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0 w-full">
              <div className="overflow-clip relative shrink-0 size-[28px]">
                <UserCircleSingleCircleGeometricHumanPersonSingleUser />
              </div>
              <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-neutral-50 tracking-[0.07px]" style={{ width: "min-content" }}>
                <p className="leading-none">Profile</p>
              </div>
            </div>
            <div className="bg-neutral-50 h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Current values
  const [email, setEmail] = useState('vince.lin@vanderbilt.edu');
  const [phone, setPhone] = useState('929-939-6866');
  const [age, setAge] = useState('21');
  const [gender, setGender] = useState('Male');
  const [earliest, setEarliest] = useState('120 mins');
  const [latest, setLatest] = useState('60 mins');
  const [longestWait, setLongestWait] = useState('30 mins');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically save to backend/database
    setIsEditing(false);
    console.log('Saving profile changes:', { email, phone, age, gender, earliest, latest, longestWait });
  };

  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Profile">
      <div className="flex flex-col relative size-full">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="box-border content-stretch flex flex-col items-center p-[12px] pb-[88px] relative size-full">
            <Frame37 
              onEditClick={handleEditClick}
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              age={age} setAge={setAge}
              gender={gender} setGender={setGender}
              earliest={earliest} setEarliest={setEarliest}
              latest={latest} setLatest={setLatest}
              longestWait={longestWait} setLongestWait={setLongestWait}
              isEditing={isEditing}
              onSave={handleSave}
            />
          </div>
        </div>
        
        {/* Sticky nav bar at bottom */}
        <div className="shrink-0 p-[12px]">
          <Nav onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}