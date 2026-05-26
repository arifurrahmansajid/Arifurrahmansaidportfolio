import Image from "next/image";
import { techStack } from './../../lib/Items';
import { Marquee } from './../magicui/Marquee';

const info = techStack

const icons = info.map(item => item.icon);

export default function SkillSlider() {
  return (
    <div className="relative w-full overflow-hidden pt-4">
     <Marquee pauseOnHover className="[--duration:20s]" >
    
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-14 h-14 glass-card rounded-lg shadow-lg p-2"
          >
            <Image
              src={icon}
              alt="Technology Icon"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>

    </div>
  );
}