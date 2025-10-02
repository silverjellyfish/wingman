function Frame2() {
  return (
    <div className="bg-zinc-800 content-stretch flex gap-[10px] h-[13px] items-start relative rounded-[46px] shrink-0 w-full">
      <div className="bg-neutral-50 h-full rounded-[21px] shrink-0 w-[142px]" />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]">
      <Frame2 />
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white tracking-[0.08px] w-[153px]">
        <p className="leading-none">Finding the best rideshare group :)</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center justify-center px-[10px] py-[40px] relative size-full">
          <Frame70 />
        </div>
      </div>
    </div>
  );
}

export default function Trip01() {
  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full" data-name="Trip 01">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}