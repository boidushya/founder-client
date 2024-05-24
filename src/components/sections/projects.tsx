import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useResizeObserver } from "../../hooks";
import {
  IViewModeContext,
  VIEW_MODES,
  ViewModeContext,
  ViewModeProvider,
} from "../../contexts/ViewContext";

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
    x: -20,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
  },
};

const hoverVariants = {
  initial: {
    opacity: 0,
    filter: "blur(3px)",
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

const PROJECT_ITEMS = [
  {
    title: "EIP-6963",
    description: "A playground for testing EIP-6963",
    link: "https://eip6963.org",
    image: "https://eip6963.org/favicon.ico",
  },
  {
    title: "WalletConnect Docs",
    description:
      "Documentation for WalletConnect SDKs. I was responsible for the 2023 docs refactor.",
    link: "https://docs.walletconnect.com",
    image: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4",
  },
  {
    title: "Rang - The Color Accuracy Game",
    description:
      "The preface is pretty simple, you need to match the target color in the shortest possible time. Give it a try, I've been told it's quite addictive!",
    link: "https://rang.boidushya.com",
    image: "https://rang.boidushya.com/favicon.ico",
  },
  {
    title: "This Website is Dope",
    description: "A UI-Kit for creating neo-modern glassmorphic websites",
    link: "https://dope.boidushya.com",
    image: "https://dope.boidushya.com/logo-white.svg",
  },
  {
    title: "Sqwid App",
    description:
      "Sqwid is an NFT marketplace running on the Reef chain that features per-item customizable royalties.",
    link: "https://www.sqwid.app",
    image: "https://www.sqwid.app/favicon.ico",
  },
  {
    title: "Rezonance",
    description:
      "Rezonance lets you play your favorite songs in high quality without getting interrupted by ads",
    link: "https://listen.rezonance.in/",
    image: "https://rezonance.in/favicon.png",
  },
  {
    title: "Portfolio Website",
    description:
      "My very own portfolio website (haha not this one). The terminal system is built without using any third party modules",
    link: "https://boidushya.com",
    image: "https://www.boidushya.com/assets/favicon/logo.png",
  },
  {
    title: "Create Reef Dapp",
    description: "Starter kit/ Boilerplate for bootstrapping a React Reef Dapp",
    link: "https://github.com/boidushya/create-reef-dapp",
    image: "https://reef.io/favicons/apple-touch-icon.png",
  },
  {
    title: "Every Tom and Jerry Frame in Order",
    description:
      "A facebook bot that posted Tom and Jerry frames one at a time.",
    link: "https://www.facebook.com/etjfo/",
    image: "https://www.facebook.com/images/fb_icon_325x325.png",
  },
  {
    title: "Web3Conf India",
    description:
      "India's largest chain agnostic web3 conference. Apart from being an organizer, I also made the website for this.",
    link: "https://web3confindia.xyz/",
    image: "https://www.web3confindia.xyz/circle.png",
  },
  {
    title: "Vinyl",
    description:
      "A music-based hangman. Runners up of AWS Amplify x Hashnode Hackathon",
    link: "https://vinyl-client.vercel.app/",
    image: "https://vinyl-client.vercel.app/favicon.ico",
  },
];

const ProjectItem = ({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
}) => {
  const ref = React.useRef<HTMLLIElement>(null);

  const onResize = React.useCallback(
    (target: HTMLLIElement) => {
      if (ref.current) {
        ref.current.style.height = `${target.offsetHeight}px`;
        ref.current.style.width = `${target.offsetWidth}px`;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const contentRef = useResizeObserver(
    onResize
  ) as unknown as React.LegacyRef<HTMLDivElement>;

  const { activeViewMode } = React.useContext(
    ViewModeContext
  ) as IViewModeContext;

  return (
    <motion.li
      variants={itemVariants}
      className={"w-fit transition-[height] transition-[width] relative"}
      ref={ref}
    >
      <div className="project-content group text-nowrap w-fit" ref={contentRef}>
        <a href={link} target="_blank" rel="noreferrer">
          <AnimatePresence mode="popLayout">
            {activeViewMode === "grid" && (
              <motion.h4
                initial="initial"
                animate="animate"
                exit="exit"
                variants={hoverVariants}
                className="!mb-0"
                key="list"
              >
                <img className="flex-shrink-0 " src={image} alt={title} />
                {title}
              </motion.h4>
            )}
            {/* {activeViewMode === "list" && (
              <motion.div
                variants={hoverVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key="grid"
                className="flex-grow-0 w-full text-wrap"
              >
                <h4 className="text-2xl md:!mb-0 ">
                  <img src={image} alt={title} />
                  {title}
                </h4>
                <p>{description}</p>
              </motion.div>
            )}
            {activeViewMode === "icon" && (
              <motion.h4
                initial="initial"
                animate="animate"
                exit="exit"
                variants={hoverVariants}
                className="md:!mb-0"
                key="icon"
              >
                <img src={image} alt={title} />
              </motion.h4>
            )} */}
          </AnimatePresence>
        </a>
      </div>
    </motion.li>
  );
};

const ViewChanger = () => {
  const { activeViewMode, setActiveViewMode } = React.useContext(
    ViewModeContext
  ) as IViewModeContext;

  return (
    <div className="flex items-center overflow-hidden text-sm rounded-lg bg-black/[0.175] p-1">
      {VIEW_MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => setActiveViewMode(mode)}
          className={`p-2 ${
            activeViewMode === mode
              ? "cursor-default bg-white/[0.05] transition-all rounded"
              : ""
          }`}
        >
          {mode === "list" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
              />
            </svg>
          )}
          {mode === "grid" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-4"
              strokeWidth={1.75}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          )}
          {mode === "icon" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.75}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <ViewModeProvider>
      <h3 className="flex items-center justify-between w-full">
        Here's some stuff I've built
        {/* <ViewChanger /> */}
      </h3>
      <AnimatePresence initial={true} mode="popLayout">
        <motion.ol
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="projects"
        >
          {PROJECT_ITEMS.map((item, index) => (
            <ProjectItem
              key={index}
              title={item.title}
              description={item.description}
              link={item.link}
              image={item.image}
            />
          ))}
        </motion.ol>
      </AnimatePresence>
    </ViewModeProvider>
  );
};

export default ProjectsSection;
