import React from "react";
import BGContainer from "./components/bg-container";
import HeroWrapper from "./components/hero-wrapper";
import Nav from "./components/nav";
import ContactSection from "./components/sections/contact";
import MusicSection from "./components/sections/music";
import ProjectsSection from "./components/sections/projects";
import WorkSection from "./components/sections/work";
import { AnimatePresence, motion } from "framer-motion";
import { ITabContext, TabContext, TDirection } from "./contexts/TabContext";

const variants = {
  initial: (direction: TDirection) => ({
    opacity: 0.25,
    x: direction === "forward" ? 24 : -24,
    filter: "blur(3px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: TDirection) => ({
    opacity: 0.25,
    x: direction === "forward" ? -24 : 24,
    filter: "blur(3px)",
    transition: {
      duration: 0.075,
    },
  }),
};

const App = () => {
  const { activeTab, direction } = React.useContext(TabContext) as ITabContext;

  return (
    <>
      <BGContainer />
      <HeroWrapper />
      <Nav />
      <main className="pb-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.section
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-start"
          >
            {activeTab === "projects" && <ProjectsSection key="projects" />}
            {activeTab === "work" && <WorkSection key="work" />}
            {activeTab === "music" && <MusicSection key="music" />}
            {activeTab === "contact" && <ContactSection key="contact" />}
          </motion.section>
        </AnimatePresence>
      </main>
    </>
  );
};

export default App;
