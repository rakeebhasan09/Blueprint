import React from "react";
import {
	CheckCircle2,
	Shield,
	TrendingUp,
	Home,
	Scale,
	Palette,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
	{
		icon: TrendingUp,
		title: "Property Valuation",
		desc: "Data-driven market analysis and accurate property valuations backed by real-time analytics.",
	},
	{
		icon: Scale,
		title: "Legal Advisory",
		desc: "Expert legal guidance through every transaction, from contract review to closing.",
	},
	{
		icon: Palette,
		title: "Home Staging",
		desc: "Professional staging services that increase perceived value and accelerate sales.",
	},
	{
		icon: Shield,
		title: "Investment Consulting",
		desc: "Strategic portfolio advice to maximize returns and minimize risk exposure.",
	},
	{
		icon: Home,
		title: "Property Management",
		desc: "Full-service management for rental properties including tenant placement and maintenance.",
	},
	{
		icon: CheckCircle2,
		title: "Market Analysis",
		desc: "Comprehensive neighborhood and market reports to inform your decisions.",
	},
];

const ServicesSection = () => {
	return (
		<section className="py-16 bg-muted/30">
			<div className="container">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
					Our Services
				</h2>
				<p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
					Comprehensive real estate services designed for discerning
					buyers and investors.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, i) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="p-8 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 ease-blueprint"
						>
							<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
								<service.icon className="h-6 w-6 text-primary" />
							</div>
							<h3 className="font-display font-semibold text-foreground mb-2">
								{service.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{service.desc}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
