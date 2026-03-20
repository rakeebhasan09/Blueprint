import React from "react";

const PropertyCardSkeleton = () => {
	return (
		<div className="bg-card rounded-[20px] shadow-card border border-border/50 overflow-hidden">
			<div className="p-4 pb-0">
				<div className="rounded-[12px] aspect-4/3 bg-muted relative overflow-hidden">
					<div className="absolute inset-0 bg-linear-to-r from-transparent via-background/5 to-transparent animate-shimmer" />
				</div>
			</div>
			<div className="p-4 space-y-3">
				<div className="h-3 w-24 bg-muted rounded" />
				<div className="h-5 w-3/4 bg-muted rounded" />
				<div className="h-3 w-full bg-muted rounded" />
				<div className="flex gap-4">
					<div className="h-4 w-12 bg-muted rounded" />
					<div className="h-4 w-12 bg-muted rounded" />
					<div className="h-4 w-16 bg-muted rounded" />
				</div>
				<div className="flex justify-between pt-3 border-t border-border">
					<div className="h-6 w-28 bg-muted rounded" />
					<div className="h-9 w-24 bg-muted rounded-lg" />
				</div>
			</div>
		</div>
	);
};

export default PropertyCardSkeleton;
