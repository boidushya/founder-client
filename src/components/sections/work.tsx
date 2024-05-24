import { motion } from "framer-motion";

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
    y: -20,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
};

const WorkSection = () => {
  return (
    <>
      <h3>
        I'm currently working at{" "}
        <a href="https://walletconnect.com" target="_blank" rel="noreferrer">
          WalletConnect
        </a>
      </h3>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={itemVariants} className="work-title">
          <img
            className="work-logo"
            src="https://avatars.githubusercontent.com/u/37784886?s=200&v=4"
            alt="WalletConnect"
          />
          <span>
            I'm a Developer Relations Engineer at{" "}
            <a
              href="https://walletconnect.com"
              target="_blank"
              rel="noreferrer"
            >
              WalletConnect
            </a>
            . I work on developer education, documentation, and community
            engagement. I also help developers build dapps using WalletConnect.
          </span>
        </motion.p>
        <br />
        <motion.p variants={itemVariants} className="work-title">
          <img
            className="work-logo"
            src="https://avatars.githubusercontent.com/u/69769634?s=200&v=4"
            alt="Reef"
          />
          <span>
            Previously, I've worked at{" "}
            <a href="https://reef.io" target="_blank" rel="noreferrer">
              Reef{" "}
            </a>
            as a Mobile & App Developer. During my time at Reef, I worked on{" "}
            <a href="https://sqwid.app" target="_blank" rel="noreferrer">
              Sqwid
            </a>
            , an NFT marketplace running on the Reef chain that features
            per-item customizable royalties. I was also a part of the Developer
            Relations team at Reef & hosted several workshops both virtually and
            irl.
          </span>
        </motion.p>
        <br />

        <motion.p variants={itemVariants} className="work-title">
          <img className="work-logo" src="/logo.jpg" alt="Freelance" />
          <span>
            I'm always open to freelance work. If you're interested, feel free
            to{" "}
            <a
              href="mailto:hi@boidushya.com?subject=Hi Boidushya!&body=Heard you're available for freelancing, are you up for a chat?"
              target="_blank"
              rel="noreferrer"
            >
              email me
            </a>
          </span>
        </motion.p>
      </motion.div>
    </>
  );
};

export default WorkSection;
