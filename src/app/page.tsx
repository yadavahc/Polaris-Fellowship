import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import DSA from "@/components/sections/DSA";
import Hackathons from "@/components/sections/Hackathons";
import Community from "@/components/sections/Community";
import Vision from "@/components/sections/Vision";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Experience />
      <Projects />
      <Achievements />
      <DSA />
      <Hackathons />
      <Community />
      <Vision />
    </>
  );
}
