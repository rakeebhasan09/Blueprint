import PropertyCard from "@/components/cards/PropertyCard";
import { properties } from "@/data/properties";
import React from "react";

const PopularProperties = () => {
	return (
		<section className="py-16">
			<div className="container">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
					Popular This Month
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{properties.slice(4, 8).map((p, i) => (
						<PropertyCard key={p._id} property={p} index={i} />
					))}
				</div>
			</div>
		</section>
	);
};

export default PopularProperties;
