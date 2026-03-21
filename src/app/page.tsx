"use client";

import BlogSection from "@/components/pages/home/BlogSection";
import CategoriesSection from "@/components/pages/home/CategoriesSection";
import FeaturedProperties from "@/components/pages/home/FeaturedProperties";
import HeroSection from "@/components/pages/home/HeroSection";
import PopularProperties from "@/components/pages/home/PopularProperties";
import ServicesSection from "@/components/pages/home/ServicesSection";
import StatisticsSections from "@/components/pages/home/StatisticsSections";
import Testimonials from "@/components/pages/home/Testimonials";

export default function Home() {
	return (
		<>
			<HeroSection />
			<CategoriesSection />
			<FeaturedProperties />
			<StatisticsSections />
			<ServicesSection />
			<PopularProperties />
			<Testimonials />
			<BlogSection />
		</>
	);
}
