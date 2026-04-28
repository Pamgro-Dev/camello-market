import HeroBanner from "@/components/hero-banner";
import HomeProducts from "@/components/home-products";

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroBanner />
      <HomeProducts />
    </div>
  );
}
