import React from "react";

const StorySection = () => {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container max-w-3xl">
				<h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
					Our Story
				</h2>
				<div className="prose prose-lg mx-auto text-muted-foreground space-y-4">
					<p>
						Founded in 2020, Blueprint was born from a simple
						frustration: the gap between exceptional architecture
						and accessible real estate platforms. Our founders — an
						architect, a data scientist, and a real estate veteran —
						set out to build something different.
					</p>
					<p>
						Today, Blueprint serves over 1,200 clients across 12
						cities, curating a marketplace where every property
						tells a story of design excellence and investment
						potential. Our average client sees 6.4% annual
						appreciation on their portfolio.
					</p>
					<p>
						We are not a volume business. We are a quality business.
						Every listing undergoes our proprietary evaluation
						process, assessing architectural significance,
						structural integrity, market trajectory, and long-term
						yield potential.
					</p>
				</div>
			</div>
		</section>
	);
};

export default StorySection;
