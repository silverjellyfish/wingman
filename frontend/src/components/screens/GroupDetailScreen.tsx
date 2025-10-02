import svgPaths from "../imports/svg-mk8kbsmvx9";
import imgImage2 from "figma:asset/4b73ae532dc3366f700494427c4db1fa0d45dedd.png";
import imgAvatar from "figma:asset/ff848a98d8816cacb76768e83de57799d3b84261.png";

interface GroupDetailScreenProps {
  onNavigate: (screen: string) => void;
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_4396)" id="Frame">
          <path d={svgPaths.p17d51480} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_5_4396">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button({ onBack }: { onBack: () => void }) {
  return (
    <button 
      onClick={onBack}
      className="box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[17px] relative rounded-[6px] shrink-0 w-[83px] hover:bg-zinc-800 transition-colors cursor-pointer" 
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

function Frame6() {
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
      <Frame6 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">9:30PM</p>
      </div>
    </div>
  );
}

function Frame10() {
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
      <Frame10 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">10:00PM</p>
      </div>
    </div>
  );
}

function Frame11() {
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
      <Frame11 />
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

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
      <Frame61 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold items-center leading-[0] relative shrink-0 text-center">
      <div className="relative shrink-0 text-[16px] text-neutral-50 tracking-[0.08px] w-full">
        <p className="leading-none">Rothschild College</p>
      </div>
      <div className="relative shrink-0 text-[14px] text-zinc-400 tracking-[0.07px] w-full">
        <p className="leading-none">Jul 20 - 10:45 PM</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p14ae0c00} fill="var(--fill-0, #FAFAFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold items-center leading-[0] relative shrink-0 text-center">
      <div className="min-w-full relative shrink-0 text-[16px] text-neutral-50 tracking-[0.08px]" style={{ width: "min-content" }}>
        <p className="leading-none">BNA Terminal</p>
      </div>
      <div className="relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Jul 20 - 11:30 PM</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[12px] py-0 relative w-full">
          <Frame17 />
          <Frame12 />
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Avatar />
      <div className="[grid-area:1_/_1] font-['Geist:SemiBold',_sans-serif] font-semibold ml-[59px] mt-[7px] relative text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] translate-x-[-50%]">
        <p className="leading-none whitespace-pre">Vince L.</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[20px] items-center ml-0 mt-0 relative">
      <Group3 />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Avatar1 />
      <div className="[grid-area:1_/_1] font-['Geist:SemiBold',_sans-serif] font-semibold ml-[59px] mt-[7px] relative text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] translate-x-[-50%]">
        <p className="leading-none whitespace-pre">Lana C.</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[20px] items-center ml-0 mt-[34px] relative">
      <Group5 />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Avatar2 />
      <div className="[grid-area:1_/_1] font-['Geist:SemiBold',_sans-serif] font-semibold ml-[77px] mt-[7px] relative text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] translate-x-[-50%]">
        <p className="leading-none whitespace-pre">Samantha H.</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[20px] items-center ml-0 mt-[68px] relative">
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Group6 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold gap-[20px] h-[92px] items-start justify-center leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
      <div className="relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">929-394-6866</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">929-394-6866</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">929-394-6866</p>
      </div>
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
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase1 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">0</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase3 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">1</p>
      </div>
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase4() {
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

function BagSuitcase2ProductBusinessBriefcase5() {
  return (
    <div className="h-[19px] overflow-clip relative shrink-0 w-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase4 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase6() {
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

function BagSuitcase2ProductBusinessBriefcase7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase6 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase5 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">1</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase7 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame71 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame72 key={i} />
      ))}
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-center relative shrink-0">
      <Frame79 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame77 />
      <Frame90 />
      <Frame78 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame4 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase12() {
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

function BagSuitcase2ProductBusinessBriefcase13() {
  return (
    <div className="h-[19px] overflow-clip relative shrink-0 w-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase12 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase14() {
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

function BagSuitcase2ProductBusinessBriefcase15() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase14 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase13 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">2</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase15 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[39px] items-center justify-center relative shrink-0">
      <Frame74 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Total Luggage:</p>
      </div>
      <Frame5 />
    </div>
  );
}

function Option() {
  return (
    <div className="bg-zinc-800 relative rounded-[16px] shrink-0 w-full" data-name="Option">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[8px] py-[16px] relative w-full">
          <Frame13 />
          <Frame91 />
        </div>
      </div>
    </div>
  );
}

function Button1({ onLeaveGroup }: { onLeaveGroup: () => void }) {
  return (
    <button 
      onClick={onLeaveGroup}
      className="bg-neutral-50 relative rounded-[6px] shrink-0 w-full hover:bg-zinc-100 active:bg-zinc-200 transition-colors cursor-pointer" 
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[16px] py-[10px] relative w-full">
          <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black text-center text-nowrap tracking-[0.08px]">
            <p className="leading-none whitespace-pre">Leave Group</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame37({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const handleBack = () => {
    onNavigate('ride-with-group');
  };

  const handleLeaveGroup = () => {
    onNavigate('leave-group');
  };

  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start px-[10px] py-[40px] relative size-full">
          <Button onBack={handleBack} />
          <Frame68 />
          <Option />
          <Button1 onLeaveGroup={handleLeaveGroup} />
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

function Frame14() {
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
      <Frame14 />
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

function Frame15() {
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
      <Frame15 />
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

function Frame16() {
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
      <Frame16 />
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
          <button onClick={() => onNavigate('trips')} className="hover:opacity-75 transition-opacity">
            <Frame26 />
          </button>
          <button onClick={() => onNavigate('profile')} className="hover:opacity-75 transition-opacity">
            <Frame24 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GroupDetailScreen({ onNavigate }: GroupDetailScreenProps) {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 02">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 onNavigate={onNavigate} />
          <Nav onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}