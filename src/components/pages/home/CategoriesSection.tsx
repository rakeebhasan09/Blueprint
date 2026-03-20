import { categories } from "@/data/properties";
import Link from "next/link";
import React from "react";

const CategoriesSection = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
					Browse by Style
				</h2>
				<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
					{categories.map((cat) => (
						<Link
							key={cat.name}
							href={`/explore?type=${cat.name}`}
							className="shrink-0 flex flex-col items-center gap-2 p-6 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 ease-blueprint min-w-[120px]"
						>
							<span className="text-3xl">{cat.icon}</span>
							<span className="text-sm font-semibold text-foreground">
								{cat.name}
							</span>
							<span className="text-xs text-muted-foreground">
								{cat.count} listings
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategoriesSection;
