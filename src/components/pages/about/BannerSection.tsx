import React from "react";
import { motion } from "framer-motion";

const BannerSection = () => {
	return (
		<section className="py-20 bg-primary">
			<div className="container text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
						Our Mission
					</h1>
					<p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
						We believe great architecture is the foundation of
						meaningful living. Blueprint connects discerning buyers
						with properties that endure.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default BannerSection;
