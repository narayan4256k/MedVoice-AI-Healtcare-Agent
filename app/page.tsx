
import { BentoGridThirdDemo } from "./_components/Cards";
import HeroSectionOne from "./_components/Hero";
import { NavbarDemo } from "./_components/Navbar";

export default function Page() {
  return (
    <>
      {/* Sticky Navbar outside */}
      <div className="sticky top-0 z-50  dark:bg-black transition-all duration-300">
        <div className="mx-auto w-full max-w-screen-xl">
          <NavbarDemo />
        </div>
      </div>

      {/* Scrollable Hero Section */}
      <HeroSectionOne />
      <BentoGridThirdDemo/>
    </>
  );
}
