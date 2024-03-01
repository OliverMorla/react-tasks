/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnimationProps, Variants } from "framer-motion";

type Props = {
  hidden: AnimationProps["initial"];
  visible: AnimationProps["animate"];
};
const pageLoadVariant: Props = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export { pageLoadVariant };
