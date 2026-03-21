"use client";

import CategoriesSection from "@/components/pages/home/CategoriesSection";
import FeaturedProperties from "@/components/pages/home/FeaturedProperties";
import HeroSection from "@/components/pages/home/HeroSection";
import StatisticsSections from "@/components/pages/home/StatisticsSections";

export default function Home() {
	return (
		<>
			<HeroSection />
			<CategoriesSection />
			<FeaturedProperties />
			<StatisticsSections />
		</>
	);
}
