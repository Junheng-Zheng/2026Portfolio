import { ArrowDown } from "lucide-react";

export default function BlogFlow({ steps, caption }) {
  return (
    <figure className="flex w-full flex-col gap-3">
      {/* {caption ? (
        <p className="text-[14px] leading-normal text-white/55">{caption}</p>
      ) : null} */}
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-full rounded-sm  bg-white/[0.04] px-4 py-3 text-center text-[14px] leading-snug text-white/90">
              {step}
            </div>
            {index < steps.length - 1 ? (
              <ArrowDown
                strokeWidth={1.5}
                size={16}
                className="my-1 shrink-0 text-white/30"
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
