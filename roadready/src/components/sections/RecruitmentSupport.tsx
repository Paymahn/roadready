"use client";

import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1920";

const PILLARS = [
  {
    title: "Recruiter connections",
    body: "We work alongside an experienced recruiter with strong links to recruitment firms and logistics employers. Where it makes sense, we can help you access that network — introductions and conversations, not shortcuts around how hiring actually works.",
  },
  {
    title: "CV and interview support",
    body: "Logistics employers look for specific things on paper and in the room. We offer practical help with your CV and straightforward coaching on what to expect in interviews — so you can present yourself clearly when opportunities arise.",
  },
  {
    title: "Schemes and opportunities",
    body: "New driver schemes, funding routes, and employer programmes appear and change over time. We keep our ears to the ground and, when we hear something relevant, we pass it on so you can explore options that fit your situation.",
  },
] as const;

function RecruitmentSupport() {
  return (
    <section className="relative bg-slate-950 border-t border-slate-800/80 overflow-hidden">
      {/* Faded full-bleed hero — photo subdued, single overlay */}
      <div className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden min-h-[240px] sm:min-h-[280px] lg:min-h-[300px]">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover object-center opacity-[0.22] sm:opacity-[0.26]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/82" aria-hidden />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            After your qualification
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Recruitment support that doesn&apos;t stop at the pass
          </h2>
        </div>
      </div>

      {/* Editorial three-point band — hairline dividers, no cards */}
      <div className="relative border-y border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-slate-700/50">
            {PILLARS.map((item, index) => (
              <div
                key={item.title}
                className={`py-10 lg:py-12 lg:px-8 xl:px-10 ${
                  index > 0 ? "border-t border-slate-700/50 lg:border-t-0" : ""
                }`}
              >
                <p className="font-mono text-sm tabular-nums text-primary/90 tracking-widest mb-4">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecruitmentSupport;
