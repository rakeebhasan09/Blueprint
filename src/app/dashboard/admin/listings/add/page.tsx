"use client";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TAddProperty } from "@/data/properties";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const featureOptions = [
	"Swimming Pool",
	"Garden",
	"Garage",
	"Gym",
	"Security",
	"Smart Home",
	"Solar Panels",
	"Wine Cellar",
	"Home Theater",
	"Fireplace",
	"Balcony",
	"Rooftop Terrace",
];
const propertyTypes = [
	"Villa",
	"Apartment",
	"Penthouse",
	"Townhouse",
	"Cottage",
	"Condo",
];

const AddListings = () => {
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [type, setType] = useState<string>("");
	const [status, setStatus] = useState("");
	const toggleFeature = (feature: string) => {
		setSelectedFeatures((prev) =>
			prev.includes(feature)
				? prev.filter((f) => f !== feature)
				: [...prev, feature],
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAddProperty>();

	const handleAddProperty = (data: TAddProperty) => {
		data.type = type;
		data.status = status;
		data.features = selectedFeatures;
		setIsSubmitting(true);
		console.log(data);
	};
	return (
		<div className="max-w-4xl mx-auto space-y-8">
			<div>
				<h1 className="text-2xl font-bold text-foreground">
					Add New Property
				</h1>
				<p className="text-muted-foreground mt-1">
					Fill in the details below to list a new property.
				</p>
			</div>
			<form
				onSubmit={handleSubmit(handleAddProperty)}
				className="space-y-8"
			>
				{/* Basic Info */}
				<section className="rounded-2xl bg-card border border-border/50 shadow-card p-6 space-y-5">
					<h2 className="text-lg font-semibold text-foreground">
						Basic Information
					</h2>
					<div className="space-y-2">
						<label className="block"> Property Title *</label>
						<input
							type="text"
							placeholder="e.g. Modern Glass Villa"
							className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
							{...register("title", { required: true })}
						/>
						{errors.title?.type === "required" && (
							<p className="text-red-400 text-xs">
								Title is required
							</p>
						)}
					</div>
					<div className="space-y-2">
						<label className="block">Description *</label>
						<textarea
							placeholder="Describe the property in detail…"
							rows={5}
							className="w-full px-4 pt-2 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition resize-none"
							{...register("description", { required: true })}
						></textarea>
						{errors.description?.type === "required" && (
							<p className="text-red-400 text-xs">
								Description is required
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="block">Property Type *</label>
							<Select onValueChange={(value) => setType(value)}>
								<SelectTrigger className="w-full bg-[#FAFAFA] py-5 px-3">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Property Type</SelectLabel>
										{propertyTypes.map((pt) => (
											<SelectItem
												key={pt}
												value={pt}
												className="data-highlighted:bg-primary"
											>
												{pt}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<label className="block">Status *</label>
							<Select onValueChange={(value) => setStatus(value)}>
								<SelectTrigger className="w-full bg-[#FAFAFA] py-5 px-3">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Status</SelectLabel>
										<SelectItem
											value="For Sale"
											className="data-highlighted:bg-primary"
										>
											For Sale
										</SelectItem>
										<SelectItem
											value="apartment"
											className="data-highlighted:bg-primary"
										>
											For Rent
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</section>

				{/* Location & Pricing */}
				<section className="rounded-2xl bg-card border border-border/50 shadow-card p-6 space-y-5">
					<h2 className="text-lg font-semibold text-foreground">
						Location & Pricing
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="block">Address *</label>
							<input
								type="text"
								placeholder="123 Main Street"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("location", { required: true })}
							/>
							{errors.location?.type === "required" && (
								<p className="text-red-400 text-xs">
									Address is required
								</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="block">City *</label>
							<input
								type="text"
								placeholder="Malibu, CA"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("city", { required: true })}
							/>
							{errors.city?.type === "required" && (
								<p className="text-red-400 text-xs">
									City is required
								</p>
							)}
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="space-y-2">
							<label className="block">Price ($) *</label>
							<input
								type="text"
								placeholder="2,500,000"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("price", { required: true })}
							/>
							{errors.price?.type === "required" && (
								<p className="text-red-400 text-xs">
									Price is required
								</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="block">Year Built *</label>
							<input
								type="text"
								placeholder="2024"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("yearBuilt", { required: true })}
							/>
							{errors.yearBuilt?.type === "required" && (
								<p className="text-red-400 text-xs">
									Year Built is required
								</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="block">Agent Name *</label>
							<input
								type="text"
								placeholder="John Doe"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("agent", { required: true })}
							/>
							{errors.agent?.type === "required" && (
								<p className="text-red-400 text-xs">
									Agent Name is required
								</p>
							)}
						</div>
					</div>
				</section>

				{/* Specifications */}
				<section className="rounded-2xl bg-card border border-border/50 shadow-card p-6 space-y-5">
					<h2 className="text-lg font-semibold text-foreground">
						Specifications
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="space-y-2">
							<label className="block">Bedrooms *</label>
							<input
								type="text"
								placeholder="4"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("bedrooms", { required: true })}
							/>
							{errors.bedrooms?.type === "required" && (
								<p className="text-red-400 text-xs">
									Bedrooms is required
								</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="block">Bathrooms *</label>
							<input
								type="text"
								placeholder="3"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("bathrooms", { required: true })}
							/>
							{errors.bathrooms?.type === "required" && (
								<p className="text-red-400 text-xs">
									Bathrooms is required
								</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="block">Square Footage *</label>
							<input
								type="text"
								placeholder="3500"
								className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
								{...register("sqft", { required: true })}
							/>
							{errors.sqft?.type === "required" && (
								<p className="text-red-400 text-xs">
									Square Footage is required
								</p>
							)}
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="rounded-2xl bg-card border border-border/50 shadow-card p-6 space-y-5">
					<h2 className="text-lg font-semibold text-foreground">
						Features
					</h2>
					<div className="flex flex-wrap gap-2">
						{featureOptions.map((f) => (
							<button
								key={f}
								type="button"
								onClick={() => toggleFeature(f)}
								className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
									selectedFeatures.includes(f)
										? "bg-primary text-primary-foreground border-primary"
										: "bg-muted text-muted-foreground border-border hover:bg-accent/10"
								}`}
							>
								{f}
							</button>
						))}
					</div>
				</section>

				{/* Images */}
				<section className="rounded-2xl bg-card border border-border/50 shadow-card p-6 space-y-5">
					<h2 className="text-lg font-semibold text-foreground">
						Image
					</h2>
					<div className="space-y-2">
						<label className="block">Single Image URL *</label>
						<input
							type="text"
							placeholder="Paste one image URL…"
							className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
							{...register("image", { required: true })}
						/>
						{errors.image?.type === "required" && (
							<p className="text-red-400 text-xs">
								Image is required
							</p>
						)}
					</div>
					<div className="space-y-2">
						<label className="block">
							Multiple Image URL (comma separeted) *
						</label>
						<input
							type="text"
							placeholder="Paste URL's (comma separeted)…"
							className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
							{...register("images", { required: true })}
						/>
						{errors.images?.type === "required" && (
							<p className="text-red-400 text-xs">
								Images is required
							</p>
						)}
					</div>
				</section>

				{/* Actions */}
				<div className="flex justify-end gap-3 pb-8">
					<Button
						type="button"
						variant="outline"
						className="py-5 px-4"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="min-w-35 py-5 px-4"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 mr-2 animate-spin" />
								Submitting…
							</>
						) : (
							"Add Property"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddListings;
