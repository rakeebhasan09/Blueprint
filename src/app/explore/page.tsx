"use client";
import PropertyCard from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { Search, SlidersHorizontal, X } from "lucide-react";
import React, { useMemo, useState } from "react";

const propertyTypes = [
	"All",
	"Villa",
	"Penthouse",
	"House",
	"Condo",
	"Apartment",
];
const priceRanges = [
	{ label: "Any Price", min: 0, max: Infinity },
	{ label: "Under $1M", min: 0, max: 1000000 },
	{ label: "$1M - $2M", min: 1000000, max: 2000000 },
	{ label: "$2M - $3M", min: 2000000, max: 3000000 },
	{ label: "Over $3M", min: 3000000, max: Infinity },
];
const sortOptions = [
	{ label: "Newest", key: "date" },
	{ label: "Price: Low to High", key: "price-asc" },
	{ label: "Price: High to Low", key: "price-desc" },
	{ label: "Rating", key: "rating" },
];

const ExplorePage = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("All");
	const [priceFilter, setPriceFilter] = useState(0);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState("date");
	const perPage = 8;

	const filtered = useMemo(() => {
		let result = [...properties];
		if (search)
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(search.toLowerCase()) ||
					p.city.toLowerCase().includes(search.toLowerCase()),
			);
		if (typeFilter !== "All")
			result = result.filter((p) => p.type === typeFilter);
		const pr = priceRanges[priceFilter];
		result = result.filter((p) => p.price >= pr.min && p.price < pr.max);
		if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
		else if (sortBy === "price-desc")
			result.sort((a, b) => b.price - a.price);
		else if (sortBy === "rating")
			result.sort((a, b) => b.rating - a.rating);
		else
			result.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime(),
			);
		return result;
	}, [search, typeFilter, priceFilter, sortBy]);

	const totalPages = Math.ceil(filtered.length / perPage);

	const paginated = filtered.slice((page - 1) * perPage, page * perPage);
	return (
		<div className="py-10 lg:pt-15 lg:pb-16">
			<div className="container">
				<div className="mb-8">
					<h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
						Explore Properties
					</h1>
					<p className="text-muted-foreground">
						Showing {filtered.length} properties
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Filters */}
					<div
						className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
					>
						<div className="sticky top-20 space-y-6 p-6 rounded-2xl bg-card shadow-card border border-border/50">
							<div className="flex items-center justify-between">
								<h3 className="font-display font-semibold text-foreground">
									Filters
								</h3>
								<button
									onClick={() => {
										setTypeFilter("All");
										setPriceFilter(0);
										setSearch("");
									}}
									className="text-xs text-primary hover:underline"
								>
									Clear All
								</button>
							</div>
							{/* Search */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<input
									type="text"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										setPage(1);
									}}
									placeholder="Search properties..."
									className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
							{/* Type Filter */}
							<div>
								<label className="text-sm font-medium text-foreground mb-2 block">
									Property Type
								</label>
								<div className="flex flex-wrap gap-2">
									{propertyTypes.map((t) => (
										<button
											key={t}
											onClick={() => {
												setTypeFilter(t);
												setPage(1);
											}}
											className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
												typeFilter === t
													? "bg-primary text-primary-foreground"
													: "bg-muted text-muted-foreground hover:bg-muted/80"
											}`}
										>
											{t}
										</button>
									))}
								</div>
							</div>
							{/* Price Filter */}
							<div>
								<label className="text-sm font-medium text-foreground mb-2 block">
									Price Range
								</label>
								<div className="space-y-1.5">
									{priceRanges.map((pr, i) => (
										<button
											key={pr.label}
											onClick={() => {
												setPriceFilter(i);
												setPage(1);
											}}
											className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
												priceFilter === i
													? "bg-primary/10 text-primary font-medium"
													: "text-muted-foreground hover:bg-muted"
											}`}
										>
											{pr.label}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					{/* Content */}
					<div className="flex-1">
						{/* Sort & Mobile Filter Toggle */}
						<div className="flex items-center justify-between mb-6">
							<button
								onClick={() => setShowFilters(!showFilters)}
								className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-card border border-border/50 text-sm font-medium text-foreground"
							>
								<SlidersHorizontal className="h-4 w-4" />
								Filters
								{showFilters && <X className="h-3 w-3" />}
							</button>
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground hidden sm:block">
									Sort by:
								</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="h-10 px-3 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
								>
									{sortOptions.map((opt) => (
										<option key={opt.key} value={opt.key}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
						</div>
						{/* Grid */}
						{paginated.length === 0 ? (
							<div className="text-center py-20">
								<p className="text-muted-foreground">
									No properties found matching your criteria.
								</p>
								<button
									onClick={() => {
										setTypeFilter("All");
										setPriceFilter(0);
										setSearch("");
									}}
									className="text-primary text-sm mt-2 hover:underline"
								>
									Clear filters
								</button>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
								{paginated.map((p, i) => (
									<PropertyCard
										key={p.id}
										property={p}
										index={i}
									/>
								))}
							</div>
						)}

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-2 mt-10">
								<Button
									variant="outline"
									size="sm"
									disabled={page === 1}
									onClick={() => setPage(page - 1)}
									className="rounded-lg"
								>
									Previous
								</Button>
								{Array.from({ length: totalPages }).map(
									(_, i) => (
										<button
											key={i}
											onClick={() => setPage(i + 1)}
											className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
												page === i + 1
													? "bg-primary text-primary-foreground"
													: "text-muted-foreground hover:bg-muted"
											}`}
										>
											{i + 1}
										</button>
									),
								)}
								<Button
									variant="outline"
									size="sm"
									disabled={page === totalPages}
									onClick={() => setPage(page + 1)}
									className="rounded-lg"
								>
									Next
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExplorePage;
