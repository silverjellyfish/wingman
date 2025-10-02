import svgPaths from "./svg-u6r2detkgu";
import imgImage2 from "figma:asset/4b73ae532dc3366f700494427c4db1fa0d45dedd.png";

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

function Button() {
  return (
    <div className="box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[17px] relative rounded-[6px] shrink-0 w-[83px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Frame />
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Back</p>
      </div>
    </div>
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

function Container() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
            <p className="leading-none whitespace-pre">120 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Earliest before boarding</p>
      </div>
      <Input />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-[97px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-zinc-400 tracking-[0.07px] w-full">
        <p className="leading-none">Earliest Arrival</p>
      </div>
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px] w-full">
        <p className="leading-none">7:30PM</p>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-[159px]">
      <Frame52 />
      <Frame53 />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
            <p className="leading-none whitespace-pre">60 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Latest before boarding</p>
      </div>
      <Input1 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-[89px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0 text-[14px] text-zinc-400 tracking-[0.07px] w-full">
        <p className="leading-none">Latest Arrival</p>
      </div>
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px] w-full">
        <p className="leading-none">6:30PM</p>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-[151px]">
      <Frame51 />
      <Frame54 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[26px] items-center relative shrink-0 w-full">
      <Frame56 />
      <Frame55 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[0.12px] w-full">
        <p className="leading-none">Timing</p>
      </div>
      <Frame57 />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">number of bags</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Checked Bags</p>
      </div>
      <Input2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">number of bags</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Carry-On Bags</p>
      </div>
      <Input3 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[51px] items-center relative shrink-0 w-full">
      <Frame59 />
      <Frame60 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-[321px]">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[0.12px] w-full">
        <p className="leading-none">Luggage</p>
      </div>
      <Frame65 />
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">location</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-zinc-950 h-[40px] max-w-[320px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex h-[40px] items-start max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[193px]">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-white tracking-[0.12px] w-full">
        <p className="leading-none">Pick up Location</p>
      </div>
      <Input4 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame58 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(39, 39, 42, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 345 2">
            <line id="Line 1" stroke="var(--stroke-0, #27272A)" strokeLinecap="round" strokeWidth="2" x1="1" x2="344" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <Frame66 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(39, 39, 42, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 345 2">
            <line id="Line 1" stroke="var(--stroke-0, #27272A)" strokeLinecap="round" strokeWidth="2" x1="1" x2="344" y1="1" y2="1" />
          </svg>
        </div>
      </div>
      <Frame67 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
      <Frame61 />
      <Frame69 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#aa67d2] h-[44px] relative rounded-[6px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[44px] items-center justify-center pb-[12.5px] pt-[11.5px] px-[32px] relative w-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
            <p className="leading-none whitespace-pre">Search for rideshare</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start px-[12px] py-[40px] relative size-full">
          <Button />
          <Frame68 />
          <Button1 />
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

function Nav() {
  return (
    <div className="bg-[#28282d] relative rounded-[28px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Nav">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[48px] py-0 relative w-full">
          <Frame25 />
          <Frame26 />
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

export default function Trip04() {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 04">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 />
          <Nav />
        </div>
      </div>
    </div>
  );
}