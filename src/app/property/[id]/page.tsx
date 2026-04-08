"use client";
import PropertyCard from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/properties";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Bath,
	Bed,
	Calendar,
	CheckCircle2,
	MapPin,
	Maximize,
	Star,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const PropertyDetails = () => {
	const params = useParams();
	const id = params.id;
	const useaxios = useAxios();
	const { data: property } = useQuery({
		queryKey: ["property"],
		queryFn: async () => {
			const res = await useaxios.get(`/properties/${id}`);
			return res.data.property;
		},
	});

	const [activeImage, setActiveImage] = useState(0);
	const [showTourModal, setShowTourModal] = useState(false);

	const propertyReviews = reviews.filter((r) => r.propertyId === id);

	const { data: relatedProperties = [] } = useQuery({
		queryKey: ["related-properties", property?.type, id],

		queryFn: async () => {
			const res = await useaxios.get(
				`/properties?type=${property?.type}&excludeId=${id}`,
			);
			return res.data.relatedProperties;
		},
	});

	console.log(relatedProperties);

	if (!property) {
		return (
			<div className="bg-background">
				<div className="py-24 text-center">
					<h1 className="font-display text-2xl font-bold text-foreground">
						Property not found
					</h1>
					<Link
						href="/explore"
						className="text-primary mt-4 inline-block hover:underline"
					>
						Back to Explore
					</Link>
				</div>
			</div>
		);
	}
	return (
		<div className="pt-15 pb-16">
			<div className="container">
				<Link
					href="/explore"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
				>
					<ArrowLeft className="h-4 w-4" /> Back to Explore
				</Link>
				{/* Image Gallery */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
					<div className="rounded-[20px] overflow-hidden aspect-4/3">
						<Image
							width={600}
							height={300}
							src={property.images[activeImage]}
							alt={property.title}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{property.images.map((img, i: number) => (
							<button
								key={i}
								onClick={() => setActiveImage(i)}
								className={`rounded-[12px] overflow-hidden aspect-4/3 border-2 transition-colors ${activeImage === i ? "border-primary" : "border-transparent"}`}
							>
								<Image
									width={600}
									height={300}
									src={img}
									alt=""
									className="w-full h-full object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						<div>
							<div className="flex items-center gap-3 mb-2">
								<span
									className={`px-3 py-1 rounded-full text-xs font-semibold ${
										property.status === "For Sale"
											? "bg-secondary/10 text-secondary"
											: "bg-primary/10 text-primary"
									}`}
								>
									{property.status}
								</span>
								<span className="text-sm text-muted-foreground">
									{property.type}
								</span>
							</div>
							<h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
								{property.title}
							</h1>
							<div className="flex items-center gap-2 text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span className="text-sm">
									{property.location}, {property.city}
								</span>
							</div>
						</div>

						{/* Key Info */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							{[
								{
									icon: Bed,
									label: "Bedrooms",
									value: property.bedrooms,
								},
								{
									icon: Bath,
									label: "Bathrooms",
									value: property.bathrooms,
								},
								{
									icon: Maximize,
									label: "Square Feet",
									value: `${property.sqft.toLocaleString()} ft²`,
								},
								{
									icon: Calendar,
									label: "Year Built",
									value: property.yearBuilt,
								},
							].map((item) => (
								<div
									key={item.label}
									className="p-4 rounded-2xl bg-muted/50 text-center"
								>
									<item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
									<div className="text-sm font-semibold text-foreground tabular-nums">
										{item.value}
									</div>
									<div className="text-xs text-muted-foreground">
										{item.label}
									</div>
								</div>
							))}
						</div>

						{/* Description */}
						<div>
							<h2 className="font-display text-xl font-bold text-foreground mb-3">
								Description
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{property.description}
							</p>
						</div>

						{/* Features */}
						<div>
							<h2 className="font-display text-xl font-bold text-foreground mb-3">
								Features
							</h2>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{property.features.map((f) => (
									<div
										key={f}
										className="flex items-center gap-2 text-sm text-foreground"
									>
										<CheckCircle2 className="h-4 w-4 text-secondary" />{" "}
										{f}
									</div>
								))}
							</div>
						</div>

						{/* Reviews */}
						<div>
							<h2 className="font-display text-xl font-bold text-foreground mb-4">
								Reviews ({propertyReviews.length})
							</h2>
							<div className="flex items-center gap-2 mb-6">
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${i < Math.round(property.rating) ? "text-accent fill-accent" : "text-border"}`}
										/>
									))}
								</div>
								<span className="font-semibold text-foreground">
									{property.rating}
								</span>
								<span className="text-sm text-muted-foreground">
									({property.reviews} reviews)
								</span>
							</div>
							<div className="space-y-4">
								{propertyReviews.length > 0 ? (
									propertyReviews.map((r) => (
										<div
											key={r.id}
											className="p-5 rounded-2xl bg-card shadow-card border border-border/50"
										>
											<div className="flex items-center gap-3 mb-3">
												<div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
													<User className="h-4 w-4 text-primary" />
												</div>
												<div>
													<div className="text-sm font-semibold text-foreground">
														{r.userName}
													</div>
													<div className="text-xs text-muted-foreground">
														{new Date(
															r.date,
														).toLocaleDateString()}
													</div>
												</div>
												<div className="ml-auto flex gap-0.5">
													{Array.from({
														length: r.rating,
													}).map((_, i) => (
														<Star
															key={i}
															className="h-3.5 w-3.5 text-accent fill-accent"
														/>
													))}
												</div>
											</div>
											<p className="text-sm text-muted-foreground">
												{r.comment}
											</p>
										</div>
									))
								) : (
									<p className="text-sm text-muted-foreground">
										No reviews yet for this property.
									</p>
								)}
							</div>
						</div>
					</div>
					{/* Sidebar */}
					<div>
						<div className="sticky top-20 space-y-6">
							<div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
								<div className="text-3xl font-display font-bold text-foreground tabular-nums mb-1">
									${property.price.toLocaleString()}
								</div>
								<div className="text-sm text-muted-foreground mb-6">
									Listed on{" "}
									{new Date(
										property.date,
									).toLocaleDateString()}
								</div>
								<Button
									className="w-full mb-3 rounded-xl py-5"
									onClick={() => setShowTourModal(true)}
								>
									Schedule Tour
								</Button>
								<Button
									variant="outline"
									className="w-full rounded-xl py-5"
								>
									Contact Agent
								</Button>
								<div className="mt-6 pt-6 border-t border-border">
									<div className="text-sm font-medium text-foreground mb-1">
										Listing Agent
									</div>
									<div className="text-sm text-muted-foreground">
										{property.agent}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Related */}
				{relatedProperties.length > 0 ? (
					<div className="mt-16">
						<h2 className="font-display text-2xl font-bold text-foreground mb-6">
							Similar Properties
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{relatedProperties.map((p, i: number) => (
								<PropertyCard
									key={p._id}
									property={p}
									index={i}
								/>
							))}
						</div>
					</div>
				) : (
					<div className="mt-16 text-center">
						<h2 className="text-xl font-semibold text-muted-foreground">
							No related properties found 😔
						</h2>
					</div>
				)}
			</div>
			{/* Tour Modal */}
			{showTourModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
						onClick={() => setShowTourModal(false)}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative bg-card rounded-2xl shadow-elevated border border-border p-8 w-full max-w-md"
					>
						<h3 className="font-display text-xl font-bold text-foreground mb-4">
							Schedule a Tour
						</h3>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								setShowTourModal(false);
							}}
							className="space-y-4"
						>
							<input
								type="text"
								placeholder="Your Name"
								required
								className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
							/>
							<input
								type="email"
								placeholder="Email Address"
								required
								className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
							/>
							<input
								type="date"
								required
								className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
							/>
							<select className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary">
								<option>In-Person Tour</option>
								<option>Virtual Tour</option>
							</select>
							<Button
								type="submit"
								className="w-full rounded-xl py-5"
							>
								Confirm Tour
							</Button>
						</form>
						<button
							onClick={() => setShowTourModal(false)}
							className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
						>
							✕
						</button>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default PropertyDetails;
