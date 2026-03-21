import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import FeaturedDrops from "@/components/FeaturedDrops";
import IdentitySection from "@/components/IdentitySection";
import LookbookSection from "@/components/LookbookSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="noise-overlay min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <FeaturedDrops />
      <IdentitySection />
      <LookbookSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
};

export default Index;
