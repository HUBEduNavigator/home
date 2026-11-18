"use client";
import { Compass } from "lucide-react";
import { hero } from "@/content/copy";
import { site } from "@/content/site";
import { useApp } from "./AppContext";
import { AudienceToggle } from "./AudienceToggle";
import { CompassRoad } from "./CompassRoad";

export function Hero() {
  const { audience, openBooking } = useApp();
  return (
    <section id="top" className="section pt-8 md:pt-14">
      <div className="container-x grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
        <div>
          <AudienceToggle className="mb-6" />
          <p className="eyebrow flex items-center gap-2"><Compass size={16} aria-hidden /> {hero.eyebrow[audience]} · {site.short}</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-tight sm:text-5xl">{hero.title[audience]}</h1>
          <p className="lead mt-5 text-lg">{hero.sub[audience]}</p>
          <p className="mt-4 font-display text-lg italic text-accenttext">{site.slogan}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-primary" onClick={() => openBooking()}>{hero.ctaBook}</button>
            <a className="btn btn-ghost" href="#tu-kiem-tra">{hero.ctaTest}</a>
          </div>
        </div>
        <CompassRoad />
      </div>
    </section>
  );
}
