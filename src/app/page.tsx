import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Method } from "@/components/home/Method";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CtaBanner } from "@/components/layout/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <ServicesPreview />
      <Method />
      <AboutPreview />
      <CtaBanner />
    </>
  );
}
