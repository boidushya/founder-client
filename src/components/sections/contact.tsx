import { HTMLMotionProps, motion } from "framer-motion";
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    filter: "blur(3px)",
    y: 12,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
};

const MotionLink = ({ children, ...props }: HTMLMotionProps<"a">) => {
  return (
    <motion.a variants={itemVariants} {...props}>
      {children}
    </motion.a>
  );
};

const ContactSection = () => {
  return (
    <>
      <h3>Catch me on your favorite social media</h3>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-wrap items-center gap-4"
      >
        <MotionLink
          href="https://twitter.com/boidushya"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </MotionLink>
        <MotionLink
          href="https://warpcast.com/boi"
          target="_blank"
          rel="noreferrer"
        >
          Warpcast
        </MotionLink>
        <MotionLink
          href="https://t.me/boidushyaB"
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </MotionLink>
        <MotionLink
          href="https://github.com/boidushya"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </MotionLink>
        <MotionLink
          href="https://linkedin.com/in/boidushya"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
        </MotionLink>
        <MotionLink
          href="mailto:hi@boidushya.com?subject=Hi Boidushya!&body=I'm coming from your website, are you up for a chat?"
          target="_blank"
          rel="noreferrer"
        >
          Email
        </MotionLink>
      </motion.div>
    </>
  );
};

export default ContactSection;
