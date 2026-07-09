import { PropsWithChildren, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

interface Props {
  direction?: "left-to-right" | "right-to-left";
}

export const RevealLeftToRight = (props: PropsWithChildren<Props>) => {
  const { children, direction = "left-to-right" } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const hidden =
    direction === "left-to-right"
      ? { opacity: 0, x: -100 }
      : { opacity: 0, x: 100 };
  const visible =
    direction === "left-to-right" ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 };

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        variants={{ hidden, visible }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
