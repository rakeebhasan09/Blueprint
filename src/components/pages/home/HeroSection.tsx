import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const heroSlides = [
	{
		image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
		title: "Find Your Architectural Soulmate",
		subtitle:
			"A curated marketplace for architectural landmarks and high-yield residential assets.",
	},
	{
		image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
		title: "Invest in Permanence",
		subtitle:
			"Properties that appreciate in value and stand the test of time.",
	},
	{
		image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
		title: "Architecture Meets Investment",
		subtitle:
			"4.8% average appreciation in Q3. Data-driven decisions, tangible results.",
	},
];

const HeroSection = () => {
	const [loading, setLoading] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const interval = setInterval(
			() => setCurrentSlide((p) => (p + 1) % heroSlides.length),
			5000,
		);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			<section className="relative h-[65vh] flex items-center overflow-hidden">
				{/* Background Image */}
				{heroSlides.map((slide, i) => (
					<div
						key={i}
						className={`absolute inset-0 transition-opacity duration-700 ease-blueprint ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
					>
						<Image
							width={2000}
							height={500}
							src={slide.image}
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-foreground/50" />
					</div>
				))}

				{/* Content */}
				<div className="relative container z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
						className="max-w-2xl"
					>
						{/* Title and Subtitle */}
						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight">
							{heroSlides[currentSlide].title}
						</h1>
						<p className="text-background/80 text-lg md:text-xl mb-8 max-w-lg">
							{heroSlides[currentSlide].subtitle}
						</p>
						{/* Search Bar */}
						<div className="flex items-center bg-card/95 backdrop-blur-xl rounded-full shadow-elevated p-2 max-w-xl">
							<div className="flex items-center gap-2 px-4 flex-1">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<input
									type="text"
									placeholder="Search by location, type..."
									className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full py-2"
								/>
							</div>
							<Link href="/explore">
								<Button className="rounded-full py-5 px-6">
									<Search className="h-4 w-4 mr-2" /> Search
								</Button>
							</Link>
						</div>
					</motion.div>
					{/* Slider Controls */}
					<div className="absolute -bottom-16 lg:bottom-8 right-[50%] translate-x-[50%] lg:translate-x-0 lg:right-8 flex items-center gap-2">
						<button
							onClick={() =>
								setCurrentSlide(
									(p) =>
										(p - 1 + heroSlides.length) %
										heroSlides.length,
								)
							}
							className="h-10 w-10 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-card/40 transition-colors"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							onClick={() =>
								setCurrentSlide(
									(p) => (p + 1) % heroSlides.length,
								)
							}
							className="h-10 w-10 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center text-background hover:bg-card/40 transition-colors"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
						<div className="flex gap-1.5 ml-2">
							{heroSlides.map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentSlide(i)}
									className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-background" : "w-2 bg-background/40"}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HeroSection;
