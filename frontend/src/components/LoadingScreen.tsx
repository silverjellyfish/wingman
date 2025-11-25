import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="bg-zinc-800 content-stretch flex gap-[10px] h-[13px] items-start relative rounded-[46px] shrink-0 w-full">
      <div
        className="bg-neutral-50 h-full rounded-[21px] shrink-0 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Frame70({ progress }: { progress: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]">
      <ProgressBar progress={progress} />
      <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white tracking-[0.08px] w-[153px]">
        <p className="leading-none">Finding the best rideshare group :)</p>
      </div>
    </div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <div className="bg-[#16161b] flex flex-col items-center justify-center relative size-full h-screen" data-name="Loading">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]">
        <div className="bg-zinc-800 content-stretch flex gap-[10px] h-[13px] items-start relative rounded-[46px] shrink-0 w-full">
          <div
            className="bg-neutral-50 h-full rounded-[21px] shrink-0 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-col font-['Geist:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white tracking-[0.08px] w-[153px]">
          <p className="leading-none">Finding the best rideshare group :)</p>
        </div>
      </div>
    </div>
  );
}
