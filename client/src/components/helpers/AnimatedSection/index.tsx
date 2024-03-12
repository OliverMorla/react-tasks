import { pageLoadVariant } from "@/config/framer-variants";
import { MotionProps, motion } from "framer-motion";

const AnimatedSection: React.FC<AnimatedSectionProps & MotionProps> = ({
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

export default AnimatedSection;
