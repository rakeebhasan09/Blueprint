import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
	return (
		<section className="py-[15vh] bg-primary">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
						List Your Property Today
					</h2>
					<p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
						Join 1,420 architectural landmarks and high-yield assets
						on Blueprint.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/contact">
							<Button
								size="lg"
								variant="secondary"
								className="rounded-full px-8 py-5"
							>
								Get Started{" "}
								<ArrowRight className="h-4 w-4 ml-2" />
							</Button>
						</Link>
						<Link href="/explore">
							<Button
								size="lg"
								variant="outline"
								className="rounded-full px-8 py-5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent dark:bg-black"
							>
								Browse Listings
							</Button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CTASection;
