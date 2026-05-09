import Navbar from "@/components/marketing/navbar";
import HeroBanner from "@/components/marketing/hero-banner";
import TrustBar from "@/components/marketing/trust-bar";
import Section from "@/components/marketing/section";
import ValueSections from "@/components/marketing/value-sections";
import SceneSection from "@/components/marketing/scene-section";
import FAQSection from "@/components/marketing/faq-section";
import Footer from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero Carousel ── */}
      <HeroBanner />

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── [01] Three Core Values ── */}
      <ValueSections />

      {/* ── [02] Two Scenes + Comparison ── */}
      <SceneSection />

      {/* ── [03] FAQ ── */}
      <Section number="03" title="常见问题" id="faq">
        <FAQSection />
      </Section>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
