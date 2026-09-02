import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EVENT } from "@/config/event";
import Logo from "@/public/logo-no-bg.png";
import Name from "@/public/name.png";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../commons/Reveal";

const photos = [
  "/day40anos/day0.jpeg",
  "/day40anos/day1.jpeg",
  "/day40anos/day2.jpeg",
  "/day40anos/day3.jpeg",
];

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-10 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 20%, rgba(220,220,220,0.15), transparent 70%), radial-gradient(50% 50% at 50% 100%, rgba(220,220,220,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal delay={0.1}>
          <p className="text-silver-dim mb-4 text-xs uppercase tracking-[0.25em]">
            Convite especial • 02 . 10 . 2026
          </p>

          {/* <h1 className="font-display text-5xl font-semibold sm:text-6xl">
            <span className="text-silver-gradient">{EVENT.honoree}</span>
          </h1> */}

          <Image
            src={Name}
            alt="Name"
            className="mt-6 rounded-2xl m-auto w-full max-w-xs"
            loading="eager"
          />

          <Carousel
            className="mt-8 w-full max-w-sm"
            opts={{ align: "start", loop: true }}
            aria-label={`Fotos de ${EVENT.honoree}`}
          >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={photo}>
                  <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-silver/30 bg-card shadow-xl">
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1} de ${EVENT.honoree}`}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 3rem), 384px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 border-white/60 bg-black/35 text-white hover:bg-black/60 hover:text-white" />
            <CarouselNext className="right-3 border-white/60 bg-black/35 text-white hover:bg-black/60 hover:text-white" />
          </Carousel>

          <Image
            src={Logo}
            alt="Logo"
            className="mt-6 rounded-2xl m-auto w-48"
            loading="eager"
          />

          {/* <div className="mb-6 flex justify-between items-center">
            <div className="divider-silver w-16 mt-12" />

            <span className="text-silver-gradient font-display text-[7rem] leading-none font-bold sm:text-[9rem]">
              {EVENT.age}
            </span>

            <div className="divider-silver w-16 mt-12" />
          </div>

          <p
            className="font-display text-lg italic text-muted-foreground"
            suppressHydrationWarning
          >
            quarenta anos
          </p> */}

          <div className="mt-10 space-y-1 text-sm uppercase tracking-[0.3em] text-silver">
            <div>{EVENT.dateLabel}</div>
            <div>·</div>
            <div>{EVENT.timeLabel}</div>
          </div>

          <div className="mt-12 m-auto">
            {/* <Button variant="outline">
              <Link href="/presentes">Lista de presentes</Link>
            </Button> */}
            <Button className="bg-silver-gradient text-black hover:brightness-75 p-5 text-md">
              <Sparkles />
              <Link href="/presentes">Lista de presentes</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
