import { MotionProps, motion } from "framer-motion";
import { pageLoadVariant } from "@/config/framer-variants";

const AnimatedDiv: React.FC<AnimatedDivProps & MotionProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={pageLoadVariant}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
