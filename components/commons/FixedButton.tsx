import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

export function FixedButton() {
  const [hideButton, setHideButton] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = document.getElementById("rsvp");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideButton(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Esconde quando 50% da seção estiver visível
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed bottom-9 left-1/2 z-[999] -translate-x-1/2"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: showButton && !hideButton ? 1 : 0,
        y: showButton && !hideButton ? 0 : 16,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        pointerEvents: showButton && !hideButton ? "auto" : "none",
      }}
    >
      <Button
        onClick={() => (window.location.href = "#rsvp")}
        className="bg-silver-gradient text-black hover:brightness-75 p-5 text-md"
      >
        <Sparkles />
        Confirmar presença
      </Button>
    </motion.div>
  );
}
