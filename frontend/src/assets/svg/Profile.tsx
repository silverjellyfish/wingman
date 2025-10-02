import svgPaths from "./svg-jiyq030cru";
import imgImage1 from "figma:asset/3a6e8bd48c0bed015065b49bc3d2d32889faa1e5.png";

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

function PencilChangeEditModifyPencilWriteWriting1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="pencil--change-edit-modify-pencil-write-writing">
      <PencilChangeEditModifyPencilWriteWriting />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame35 />
      <PencilChangeEditModifyPencilWriteWriting1 />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">vince.lin@vanderbilt.edu</p>
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
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Email</p>
      </div>
      <Input />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">929-939-6866</p>
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

function Frame87() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Phone Number</p>
      </div>
      <Input1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">21</p>
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
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-inherit px-[13px] py-[11.5px] relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[43px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-white tracking-[0.07px] w-full">
        <p className="leading-none">Age</p>
      </div>
      <Input2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-full items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Male</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex gap-[12px] h-[40px] items-center max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container3 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[43px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Gender</p>
      </div>
      <Input3 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full">
      <Frame30 />
      <Frame38 />
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">120 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-start max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container4 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[159px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Earliest before boarding</p>
      </div>
      <Input4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">60 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-start max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container5 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[151px]">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Latest before boarding</p>
      </div>
      <Input5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="flex flex-col justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center pl-0 pr-[258.05px] py-0 relative size-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
            <p className="leading-none whitespace-pre">30 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-zinc-950 box-border content-stretch flex h-[40px] items-start max-w-[320px] px-[13px] py-[11.5px] relative rounded-[6px] shrink-0 w-[85px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[6px]" />
      <Container6 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[14px] text-white tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Longest willing to wait after landing</p>
      </div>
      <Input6 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame31 />
      <Frame87 />
      <Frame32 />
      <Frame80 />
      <Frame81 />
      <Frame82 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[69px] items-center pb-[40px] pt-[80px] px-[40px] relative size-full">
          <Frame36 />
          <Frame33 />
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
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-zinc-400 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Ride</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame1 />
      <div className="bg-[#28282d] h-[4px] max-w-[20px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-full" />
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
            <path d={svgPaths.p259bdd00} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p391348e8} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16a72d00} id="Vector_3" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-neutral-50 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Profile</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame3 />
      <div className="bg-neutral-50 h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
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

export default function Profile() {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Profile">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 />
          <Nav />
        </div>
      </div>
    </div>
  );
}