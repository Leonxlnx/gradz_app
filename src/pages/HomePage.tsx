import ThreeBackground from '../components/ThreeBackground';
import CreativeHero from '../components/CreativeHero';
import GlassNavigation from '../components/GlassNavigation';
import HappyDecorations from '../components/HappyDecorations';
import KineticMarquee from '../components/KineticMarquee';
import KindnessGenerator from '../components/KindnessGenerator';
import PhilosophyScroll from '../components/PhilosophyScroll';
import VoicesSection from '../components/VoicesSection';
import ProofOfHumanity from '../components/ProofOfHumanity';
import ModernImpact from '../components/ModernImpact';
import ModernMessages from '../components/ModernMessages';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ThreeBackground />
      <GlassNavigation />
      <HappyDecorations />
      <CreativeHero />

      <div className="relative z-10 bg-cream" style={{ marginTop: '100vh' }}>
        <KineticMarquee />
        <section id="how">
          <KindnessGenerator />
        </section>
        <PhilosophyScroll />
        <section id="about">
          <VoicesSection />
        </section>
        <ProofOfHumanity />
        <section id="impact">
          <ModernImpact />
        </section>
        <section id="community">
          <ModernMessages />
        </section>
        <Footer />
      </div>
    </div>
  );
}
