"use client";

import Image from "next/image";
import { useReveal } from "@/lib/hooks";

function StudyTools() {
  const { ref, revealed } = useReveal();
  const tools = [
    {
      title: "Spaced Repetition Study Tool",
      description: "Our AI-powered tool uses the Ebbinghaus forgetting curve and Leitner system — the same science behind Duolingo and Anki. Questions you struggle with come back more often. 15 minutes a day beats 5 hours of cramming. Included free with every course, forever.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 0 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      badge: "Free with every course",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    {
      title: "User Hub",
      description: "Your personal dashboard to track study progress, review weak areas, access all learning tools, and manage your entire training journey — from first enquiry to first day on the job.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-slate-700/50 text-slate-400 border-slate-600",
    },
    {
      title: "Driver Wellness Hub",
      description: "We\u2019re championing physical and mental health in the driving industry. Back care, nutrition on the road, sleep hygiene, mental health check-ins, and financial planning — because your wellbeing matters as much as your licence.",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      badge: "Coming Soon",
      badgeColor: "bg-slate-700/50 text-slate-400 border-slate-600",
    },
  ];

  return (
    <section id="study-tools" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark green background matching site theme */}
      <div className="absolute inset-0 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${!revealed ? "opacity-0 translate-y-5" : "animate-reveal-up"}`}>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 lg:items-start">
          {/* Image — repositioned to left on desktop, top on mobile */}
          <div className="w-full lg:w-[42%] order-2 lg:order-1 shrink-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-[2rem] blur-2xl" />
              <div className="relative w-full rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden aspect-[4/3] lg:aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                  alt="RoadReady Study App Interface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight mb-6">
              We Create Our Own{" "}
              <span className="font-heading text-amber-400 block mt-2 text-5xl sm:text-6xl lg:text-7xl xl:text-[4rem]">
                Study Materials
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-slate-400 leading-relaxed max-w-2xl mb-12">
              Most schools hand you a textbook. We built AI-powered study tools backed by cognitive science — included free with every course, and we never stop improving them.
            </p>

            <div className="space-y-10">
              {tools.map((tool) => (
                <div key={tool.title} className="flex gap-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{tool.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <p className="text-slate-500 text-base max-w-xl">
                Based on the Ebbinghaus forgetting curve — proven to improve long-term retention by up to 400% vs traditional study methods.
              </p>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
}

export default StudyTools;
