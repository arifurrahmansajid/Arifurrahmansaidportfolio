import AboutMe from "@/components/modules/home/AboutMe";
import ContactSection from "@/components/modules/home/ContactSection";
import FeaturedBlogs from "@/components/modules/home/FeaturedBlogs";
import HeroSection from "@/components/modules/home/HeroSection";
import Projects from "@/components/modules/home/Projects";
import TechStack from "@/components/modules/home/techStack";

export default function Home() {
  return (
    <>

<div id="home"  >
  <HeroSection/>
  
</div>


 
<div id='skill'><TechStack/></div>

<div id='about'><AboutMe/></div>

<div id='blog'><FeaturedBlogs/></div>
<div id='project'><Projects/></div>
<div id='contact'>
  
  <ContactSection/>
</div>
    </>
  );
}
