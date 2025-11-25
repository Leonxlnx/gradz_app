import ThreeBackground from '../components/ThreeBackground';
import CreativeHero from '../components/CreativeHero';
import GlassNavigation from '../components/GlassNavigation';
import HappyDecorations from '../components/HappyDecorations';
import KineticMarquee from '../components/KineticMarquee';
import KindnessGenerator from '../components/KindnessGenerator';
import WisdomCards from '../components/WisdomCards';
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

        {/* Wisdom Section */}
        <section id="about">
          <WisdomCards />
        </section>

        {/* Daily Kindness */}
        <section id="how">
          <KindnessGenerator />
        </section>

        {/* Impact Stats */}
        <section id="impact">
          <ModernImpact />
        </section>

        {/* Community Messages */}
        <section id="community">
          <ModernMessages />
        </section>

        {/* Philosophy & Voices */}
        <PhilosophyScroll />
        <VoicesSection />

        {/* Proof of Humanity */}
        <ProofOfHumanity />

        <Footer />
      </div>
    </div>
  );
}
