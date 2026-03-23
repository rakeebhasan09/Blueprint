import { Award, Eye, Target, Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const values = [
	{
		icon: Target,
		title: "Precision",
		desc: "Every listing is verified by our team of architects and market analysts.",
	},
	{
		icon: Eye,
		title: "Transparency",
		desc: "No hidden fees. No inflated valuations. Just honest, data-driven insights.",
	},
	{
		icon: Users,
		title: "Community",
		desc: "We serve buyers, sellers, and investors with equal dedication and care.",
	},
	{
		icon: Award,
		title: "Excellence",
		desc: "Only properties meeting our rigorous standards make it to Blueprint.",
	},
];
const ValuesSection = () => {
	return (
		<section className="py-20">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{values.map((v, i) => (
						<motion.div
							key={v.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="p-8 rounded-2xl bg-card shadow-card border border-border/50 text-center"
						>
							<div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<v.icon className="h-7 w-7 text-primary" />
							</div>
							<h3 className="font-display text-lg font-bold text-foreground mb-2">
								{v.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{v.desc}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ValuesSection;
