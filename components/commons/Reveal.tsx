import { PropsWithChildren, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

interface Props {
  delay?: number;
}

export const Reveal = (props: PropsWithChildren<Props>) => {
  const { children, delay = 0 } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
