import { stats } from "@/data/properties";
import React from "react";
import { motion } from "framer-motion";

const StatisticsSections = () => {
	return (
		<section className="py-16">
			<div className="container">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="text-center p-8 rounded-2xl bg-card shadow-card border border-border/50"
						>
							<div className="text-3xl md:text-4xl font-display font-bold text-foreground tabular-nums mb-1">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground mb-2">
								{stat.label}
							</div>
							<span className="text-xs font-semibold text-secondary">
								{stat.change}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatisticsSections;
