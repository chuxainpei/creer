import Navbar from "@/components/marketing/navbar";
import HeroBanner from "@/components/marketing/hero-banner";
import TrustBar from "@/components/marketing/trust-bar";
import Section from "@/components/marketing/section";
import ValueSections from "@/components/marketing/value-sections";
import SceneSection from "@/components/marketing/scene-section";
import AudienceSection from "@/components/marketing/audience-section";
import SampleSection from "@/components/marketing/sample-section";
import FAQSection from "@/components/marketing/faq-section";
import Footer from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Carousel */}
      <HeroBanner />

      {/* Trust Bar */}
      <TrustBar />

      {/* [01] Three Core Values */}
      <ValueSections />

      {/* [02] Two Scenes + Comparison */}
      <SceneSection />

      {/* [03] Target Audience */}
      <Section
        number="03"
        title="适用对象"
        subtitle="无论是学生、高校就业办还是教育咨询机构，Creator 都能提供针对性的规划支持。"
        id="audience"
      >
        <AudienceSection />
      </Section>

      {/* [04] Output Samples */}
      <Section
        number="04"
        title="输出样例"
        subtitle="每一次回答都遵循结论先行、维度分析、阶段计划和明确下一步的结构化模板。"
        id="samples"
      >
        <SampleSection />
      </Section>

      {/* [05] FAQ */}
      <Section number="05" title="常见问题" id="faq">
        <FAQSection />
      </Section>

      {/* Footer */}
      <Footer />
    </>
  );
}
