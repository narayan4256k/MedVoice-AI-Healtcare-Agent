
import { BentoGridThirdDemo } from "./_components/Cards";
import { CardHoverEffectDemo } from "./_components/features";
import { TypewriterEffectSmoothDemo } from "./_components/Featurestext";
import { Footer } from "./_components/footer";
import HeroSectionOne from "./_components/Hero";
import { NavbarDemo } from "./_components/Navbar";
import { ModeToggle } from "./_components/toggle";

export default function Page() {
  return (
    <>
      {/* Sticky Navbar outside */}
      <div className="sticky top-0 z-50  dark:bg-transparent transition-all duration-300">
        <div className="mx-auto w-full max-w-screen-xl">
          <NavbarDemo />
        </div>
      </div>

      {/* Scrollable Hero Section */}
      <HeroSectionOne />
      <div id="features">
        <TypewriterEffectSmoothDemo/>
        <CardHoverEffectDemo/>
        <Footer/>
      </div>
    </>
  );
}
