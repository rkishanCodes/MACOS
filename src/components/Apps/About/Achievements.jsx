import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import AvishkarAward from "../../../assets/AvishkarAward.png";

export const Achievements = () => {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({
    container: scrollRef,
  });

  return (
    <div ref={scrollRef} className="bg-zinc-950 h-full w-full overflow-y-auto">
      <div className="relative">
        <Hero scrollY={scrollY} />
        <Schedule />
      </div>
    </div>
  );
};

const Hero = ({ scrollY }) => {
  return (
    <div className="relative w-full h-[200vh]">
      <CenterImage scrollY={scrollY} />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = ({ scrollY }) => {
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, 2000], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [1500, 2000], [1, 0]);

  return (
    <motion.div
      className="sticky top-[-100px] h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${AvishkarAward})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="relative z-10 mx-auto max-w-5xl px-4  text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Proud Achievements
      </motion.h1>
      <AchievementItem
        title="Research Paper"
        content="Authored research papers in the fields of IoT and Machine Learning, contributing to advancements in technology and innovation."
      />
      <AchievementItem
        title="IT Club"
        content="Co-founded the IT Club and inspired fellow students to engage actively with technology and innovation."
      />
      <AchievementItem
        title="Teaching"
        content="Guided a 10th-grade student through their exams and supported peers with backlogs, helping them achieve 90+ marks."
      />
      <AchievementItem
        title="Tech Fest"
        content="As Vice President of the IT Club, I successfully orchestrated the Tech Fest event, engaging over 450 students and boosting participation by 90%."
      />
      <AchievementItem
        title="Startup"
        content="Co-founded Street2Site, a company dedicated to assisting small and growing businesses in their journey to success."
      />
      <AchievementItem
        title="Academics"
        content="Achieved top honors as the college topper in PU with 96% and as the BCA topper in the 6th semester with a 9.52 SGPA."
      />
      <AchievementItem
        title="Innovations"
        content="Developed IoT models, such as smart irrigation systems, to support farmers and enhance agricultural practices."
      />
    </section>
  );
};

const AchievementItem = ({ title, content }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50 uppercase">{title}</p>
        <p className="text-[1.125rem] text-zinc-500">{content}</p>
      </div>
    </motion.div>
  );
};
