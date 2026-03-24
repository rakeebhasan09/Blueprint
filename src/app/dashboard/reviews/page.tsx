import { reviews } from "@/data/properties";
import { Star, User } from "lucide-react";
import React from "react";

const ReviewsPage = () => {
	const userReviews = reviews.slice(0, 3);
	return (
		<div className="space-y-4">
			{userReviews.map((r) => (
				<div
					key={r.id}
					className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
				>
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
								<User className="h-4 w-4 text-primary" />
							</div>
							<div>
								<div className="text-sm font-semibold text-foreground">
									{r.userName}
								</div>
								<div className="text-xs text-muted-foreground">
									{new Date(r.date).toLocaleDateString()}
								</div>
							</div>
						</div>
						<div className="flex gap-0.5">
							{Array.from({ length: r.rating }).map((_, i) => (
								<Star
									key={i}
									className="h-4 w-4 text-accent fill-accent"
								/>
							))}
						</div>
					</div>
					<p className="text-sm text-muted-foreground">{r.comment}</p>
				</div>
			))}
			{userReviews.length === 0 && (
				<p className="text-center text-muted-foreground py-12">
					No reviews yet.
				</p>
			)}
		</div>
	);
};

export default ReviewsPage;
