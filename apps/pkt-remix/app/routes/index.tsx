import { Header } from "@/components/Header";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Hero } from "@/components/Hero";
import type { MetaFunction } from "@remix-run/node";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { CallToAction } from "@/components/CallToAction";
import { Reviews } from "@/components/Reviews";
import { Pricing } from "@/components/Pricing";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";

export const meta: MetaFunction = () => ({
  title: "Pocket - Invest at the perfect time.",
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
});

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Reviews />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
