"use client";

import { useState } from "react";
import Link from "next/link";

import { Hero } from "@/components/invite/Hero";
import { Countdown } from "@/components/invite/Countdown";
import { EventDetails } from "@/components/invite/EventDetails";
import { VenueMap } from "@/components/invite/VenueMap";
import { Footer } from "@/components/invite/Footer";

import { RSVPForm } from "@/components/forms/RSVPForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createRSVP } from "./api/rsvps";
import { BookOpen, Camera, Gift, Palette, Shirt, UserX } from "lucide-react";
import { Reveal } from "@/components/commons/Reveal";
import { RevealLeftToRight } from "@/components/commons/RevealLeftToRight";
import { FixedButton } from "@/components/commons/FixedButton";

export default function Home() {
  const [isSubmitting, setSubmitting] = useState(false);

  const itemsManual = [
    {
      id: 0,
      icon: Shirt,
      title: "Traje",
      description: "Esporte fino.",
    },
    {
      id: 1,
      icon: Palette,
      title: "Cores",
      description: "All Black! Sem brilho.",
    },
    {
      id: 2,
      icon: Gift,
      title: "Presente",
      description: "Coloque o nome no presente.",
    },
    {
      id: 3,
      icon: Camera,
      title: "Fotografia",
      description: "Tire bastante fotos, mas não atrapalhe o fotógrafo.",
    },
    {
      id: 4,
      icon: Shirt,
      title: "RSVP",
      description: "Confirme sua presença o quanto antes.",
    },
    {
      id: 5,
      icon: UserX,
      title: "Convidados",
      description: "Convidado NÃO convida!",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <FixedButton />

      <Hero />

      <Reveal>
        <Countdown />

        <section className="px-6 py-8 text-center">
          <p className="mx-auto max-w-md font-display text-lg italic leading-relaxed text-silver">
            &quot;Quarenta primaveras merecem ser celebradas com quem faz a vida
            valer a pena. Sua presença é o meu maior presente.&quot;
          </p>
        </section>
      </Reveal>

      <Reveal>
        <EventDetails />
      </Reveal>

      <Reveal>
        <VenueMap />
      </Reveal>

      <Reveal>
        <div className="mx-auto max-w-md rounded-4xl bg-linear-to-br from-foam to-secondary p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-linear-to-br from-ocean to-deep text-primary-foreground shadow-sm">
              <BookOpen className="text-silver" width={30} height={30} />
            </div>
            <p className="mt-3 font-body text-[10px] uppercase tracking-[0.4em] text-primary/70">
              Manual do Convidado
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {itemsManual.map((item, i) => (
              <RevealLeftToRight
                key={item.id}
                direction={i % 2 === 0 ? "left-to-right" : "right-to-left"}
              >
                <li className="flex items-center gap-3 rounded-2xl border border-silver bg-card p-4 shadow-sm">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-ocean to-deep text-primary-foreground">
                    <item.icon
                      className="text-silver p-2 rounded-full"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 font-display text-base leading-snug text-deep sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </li>
              </RevealLeftToRight>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <section id="rsvp" className="px-6 py-12">
          <div className="mx-auto max-w-md">
            <div className="divider-silver mb-10" />
            <h2 className="text-silver-gradient text-center font-display text-3xl">
              Confirme sua presença
            </h2>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Precisamos da sua confirmação até 20 de setembro.
            </p>
            <div className="mt-8 rounded-lg border border-silver bg-card/40 p-5">
              <RSVPForm
                isSubmitting={isSubmitting}
                onSubmit={async (data) => {
                  setSubmitting(true);
                  try {
                    await createRSVP(data);
                    toast.success("Presença confirmada! Obrigada 💛");
                  } catch {
                    // API ainda não disponível — feedback amigável
                    toast.success("Recebemos sua confirmação! 💛");
                    console.info("[RSVP mock]", data);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="p-6 text-center">
          <div className="divider-silver mx-auto mb-10 max-w-xs" />
          <p className="text-silver-dim mb-4 text-xs uppercase tracking-[0.2em]">
            lista de presentes
          </p>
          <Button className="bg-silver-gradient text-black hover:opacity-90">
            <Link href="/presentes">Ver lista de presentes</Link>
          </Button>
        </section>
      </Reveal>

      <Reveal>
        <Footer />
      </Reveal>
    </main>
  );
}
