import svgPaths from "./svg-0x09f7aqgn";
import imgImage2 from "figma:asset/4b73ae532dc3366f700494427c4db1fa0d45dedd.png";
import imgAvatar from "figma:asset/ff848a98d8816cacb76768e83de57799d3b84261.png";

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

function Frame10() {
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
      <Frame10 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">9:30PM</p>
      </div>
    </div>
  );
}

function Frame12() {
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
      <Frame12 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">10:00PM</p>
      </div>
    </div>
  );
}

function Frame13() {
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
      <Frame13 />
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

function Button1() {
  return (
    <div className="bg-neutral-50 box-border content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black text-center text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Accept</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Option 1 (recommended)</p>
      </div>
      <Button1 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[4px] items-center relative shrink-0">
      <Avatar />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Vince L.</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex gap-[6px] items-center relative shrink-0">
      <Avatar1 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Lana C.</p>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar2 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Samantha H.</p>
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Avatar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g clipPath="url(#clip0_4_3111)" id="Avatar">
          <circle cx="14" cy="14" fill="var(--fill-0, #16161B)" id="Image" r="14" />
        </g>
        <defs>
          <clipPath id="clip0_4_3111">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar3 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Empty</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="gap-[6px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[62px] relative shrink-0 w-full">
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame15() {
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

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-center">
        <p className="leading-none text-nowrap whitespace-pre">Time:</p>
      </div>
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">7/20 - 7:15 PM</p>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame15 />
      <Frame6 />
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

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center justify-center relative shrink-0">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">All Luggage:</p>
      </div>
      <Frame71 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame72 />
      <Frame5 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame14 />
      <Frame16 />
    </div>
  );
}

function Option() {
  return (
    <div className="bg-zinc-800 relative rounded-[16px] shrink-0 w-full" data-name="Option">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[12px] pr-[8px] py-[8px] relative w-full">
          <Frame11 />
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-neutral-50 box-border content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black text-center text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Accept</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Option 2</p>
      </div>
      <Button2 />
    </div>
  );
}

function Avatar4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[4px] items-center relative shrink-0">
      <Avatar4 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Vince L.</p>
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex gap-[6px] items-center relative shrink-0">
      <Avatar5 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Lana C.</p>
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar6 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Samantha H.</p>
      </div>
    </div>
  );
}

function Avatar7() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Avatar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g clipPath="url(#clip0_4_3111)" id="Avatar">
          <circle cx="14" cy="14" fill="var(--fill-0, #16161B)" id="Image" r="14" />
        </g>
        <defs>
          <clipPath id="clip0_4_3111">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar7 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Empty</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="gap-[6px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[62px] relative shrink-0 w-full">
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function Frame27() {
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

function Frame28() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-center">
        <p className="leading-none text-nowrap whitespace-pre">Time:</p>
      </div>
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">7/20 - 7:15 PM</p>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame27 />
      <Frame28 />
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

function Frame77() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase5 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">2</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase7 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center justify-center relative shrink-0">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">All Luggage:</p>
      </div>
      <Frame77 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame75 />
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame30 />
    </div>
  );
}

function Option1() {
  return (
    <div className="bg-zinc-800 relative rounded-[16px] shrink-0 w-full" data-name="Option">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[12px] pr-[8px] py-[8px] relative w-full">
          <Frame18 />
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-neutral-50 box-border content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-black text-center text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Accept</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap tracking-[0.08px]">
        <p className="leading-none whitespace-pre">Option 3</p>
      </div>
      <Button3 />
    </div>
  );
}

function Avatar8() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[4px] items-center relative shrink-0">
      <Avatar8 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Vince L.</p>
      </div>
    </div>
  );
}

function Avatar9() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex gap-[6px] items-center relative shrink-0">
      <Avatar9 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Lana C.</p>
      </div>
    </div>
  );
}

function Avatar10() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Avatar">
      <img alt="" className="block max-w-none size-full" height="28" src={imgAvatar} width="28" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar10 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Samantha H.</p>
      </div>
    </div>
  );
}

function Avatar11() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Avatar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g clipPath="url(#clip0_4_3111)" id="Avatar">
          <circle cx="14" cy="14" fill="var(--fill-0, #16161B)" id="Image" r="14" />
        </g>
        <defs>
          <clipPath id="clip0_4_3111">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex gap-[6px] items-center relative self-start shrink-0">
      <Avatar11 />
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">Empty</p>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="gap-[6px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[62px] relative shrink-0 w-full">
      <Frame33 />
      <Frame34 />
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame42() {
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

function Frame43() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-center">
        <p className="leading-none text-nowrap whitespace-pre">Time:</p>
      </div>
      <div className="font-['Geist:Medium',_sans-serif] font-medium relative shrink-0">
        <p className="leading-none text-nowrap whitespace-pre">7/20 - 7:15 PM</p>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase8() {
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

function BagSuitcase2ProductBusinessBriefcase9() {
  return (
    <div className="h-[19px] overflow-clip relative shrink-0 w-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase8 />
    </div>
  );
}

function BagSuitcase2ProductBusinessBriefcase10() {
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

function BagSuitcase2ProductBusinessBriefcase11() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="bag-suitcase-2--product-business-briefcase">
      <BagSuitcase2ProductBusinessBriefcase10 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <BagSuitcase2ProductBusinessBriefcase9 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">2</p>
      </div>
      <BagSuitcase2ProductBusinessBriefcase11 />
      <div className="font-['Geist:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-center justify-center relative shrink-0">
      <div className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px]">
        <p className="leading-none whitespace-pre">All Luggage:</p>
      </div>
      <Frame79 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame78 />
      <Frame44 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame38 />
      <Frame45 />
    </div>
  );
}

function Option2() {
  return (
    <div className="bg-zinc-800 relative rounded-[16px] shrink-0 w-full" data-name="Option">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[12px] pr-[8px] py-[8px] relative w-full">
          <Frame32 />
          <Frame46 />
        </div>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Option />
      <Option1 />
      <Option2 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[0.12px] w-full">
        <p className="leading-none">Groups</p>
      </div>
      <Frame73 />
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
          <Frame74 />
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

function Frame47() {
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
      <Frame47 />
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

function Frame48() {
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
      <Frame48 />
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

function Frame49() {
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
      <Frame49 />
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

export default function Trip03() {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 03">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 />
          <Nav />
        </div>
      </div>
    </div>
  );
}