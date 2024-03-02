import type { Variants } from "framer-motion";

const pageLoadVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
};

export { pageLoadVariant };
