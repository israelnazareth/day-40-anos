"use client";

import { Children, PropsWithChildren, useEffect, useRef } from "react";
import { motion, stagger, useAnimation, useInView } from "motion/react";

interface Props {
  delay?: number;
}

const containerVariants = (delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.1, {
        startDelay: delay,
      }),
    },
  },
});

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const Reveal = ({ children, delay = 0 }: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={containerVariants(delay)}
        initial="hidden"
        animate={controls}
      >
        {Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
