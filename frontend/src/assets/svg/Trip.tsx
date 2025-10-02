import svgPaths from "./svg-ldsvj6tbv8";
import imgAvatar from "figma:asset/92ef0d986644a1287bf0feb1c0ba24539ef35ce8.png";
import imgAvatar1 from "figma:asset/07c133efda7e5486186ed6883b4d6c0d30941e10.png";
import imgAvatar2 from "figma:asset/b10100d26a034cc37925b3de100c0be872e98f18.png";

function Avatar() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar1} width="28" />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar2} width="28" />
    </div>
  );
}

function Group() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[66px]" data-name="Group">
      <Avatar />
      <Avatar1 />
      <Avatar2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">{`Aug 30, 2025 10:30PM `}</p>
      </div>
      <Group />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] w-full">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">Location:</p>
      </div>
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">{` Rothschild College`}</p>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame7 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase() {
  return (
    <div className="absolute h-[17px] left-px top-px w-[12px]" data-name="bag-suitcase-2--product-business-briefcase">
      <div className="absolute inset-[-5.88%_-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 19">
          <g id="bag-suitcase-2--product-business-briefcase">
            <path d={svgPaths.p3f59ff80} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pdde6c80} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase1() {
  return (
    <div className="h-[19px] overflow-clip relative shrink-0 w-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase2() {
  return (
    <div className="absolute h-[11.5px] left-[2px] top-px w-[11px]" data-name="bag-suitcase-2--product-business-briefcase">
      <div className="absolute inset-[-8.7%_-9.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 14">
          <g id="bag-suitcase-2--product-business-briefcase">
            <path d={svgPaths.p2acb3880} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pa288600} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase2 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase1 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">2</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase3 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame72 />
      <Frame71 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Option() {
  return (
    <div className="bg-zinc-800 box-border content-stretch flex flex-col gap-[10px] items-start pl-[12px] pr-[8px] py-[8px] relative rounded-[16px] shrink-0 w-[336px]" data-name="Option">
      <Frame11 />
      <Frame9 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[17px] items-start relative shrink-0">
      {[...Array(3).keys()].map((_, i) => (
        <Option key={i} />
      ))}
    </div>
  );
}

function Frame37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[69px] items-center p-[40px] relative size-full">
          <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-neutral-50 text-nowrap tracking-[0.12px]">
            <p className="leading-none whitespace-pre">Trip History</p>
          </div>
          <Frame41 />
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
            <path d={svgPaths.p20e4da00} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p178e6800} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pe5cd280} id="Vector_3" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[14px] text-center text-neutral-50 tracking-[0.07px]" style={{ width: "min-content" }}>
        <p className="leading-none">Trips</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center pb-0 pt-[12px] px-0 relative shrink-0 w-[45px]">
      <Frame2 />
      <div className="bg-neutral-50 h-[4px] rounded-tl-[100px] rounded-tr-[100px] shrink-0 w-[20px]" />
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

export default function Trip() {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 />
          <Nav />
        </div>
      </div>
    </div>
  );
}