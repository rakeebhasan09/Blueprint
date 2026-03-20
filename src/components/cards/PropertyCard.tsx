import React from "react";
import { Property } from "@/data/properties";
import { MapPin, Bed, Bath, Maximize, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
	property: Property;
	index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="group bg-card rounded-[20px] shadow-card hover:shadow-elevated transition-all duration-300 ease-blueprint overflow-hidden border border-border/50"
		>
			<div className="relative p-4 pb-0">
				<div className="relative overflow-hidden rounded-[12px] aspect-4/3">
					<Image
						width={1000}
						height={500}
						src={property.image}
						alt={property.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-blueprint"
						loading="lazy"
					/>
					<div className="absolute top-3 left-3">
						<span
							className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
								property.status === "For Sale"
									? "bg-secondary/90 text-secondary-foreground"
									: property.status === "For Rent"
										? "bg-primary/90 text-primary-foreground"
										: "bg-muted/90 text-muted-foreground"
							}`}
						>
							{property.status}
						</span>
					</div>
					<div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-md px-2 py-1 rounded-full">
						<Star className="h-3 w-3 text-accent fill-accent" />
						<span className="text-xs font-semibold text-foreground">
							{property.rating}
						</span>
					</div>
				</div>
			</div>

			<div className="p-4">
				<div className="flex items-center gap-1 text-muted-foreground mb-1">
					<MapPin className="h-3.5 w-3.5" />
					<span className="text-xs">{property.city}</span>
				</div>
				<h3 className="font-display font-bold text-foreground text-lg leading-tight mb-2 line-clamp-1">
					{property.title}
				</h3>
				<p className="text-sm text-muted-foreground line-clamp-2 mb-3">
					{property.description}
				</p>

				<div className="flex items-center gap-4 text-muted-foreground mb-4">
					<div className="flex items-center gap-1">
						<Bed className="h-4 w-4" />
						<span className="text-xs">{property.bedrooms}</span>
					</div>
					<div className="flex items-center gap-1">
						<Bath className="h-4 w-4" />
						<span className="text-xs">{property.bathrooms}</span>
					</div>
					<div className="flex items-center gap-1">
						<Maximize className="h-4 w-4" />
						<span className="text-xs tabular-nums">
							{property.sqft.toLocaleString()} ft²
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between pt-3 border-t border-border">
					<span className="text-xl font-display font-bold text-foreground tabular-nums">
						${property.price.toLocaleString()}
					</span>
					<Link
						href={`/property/${property.id}`}
						className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
					>
						View Details
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default PropertyCard;
