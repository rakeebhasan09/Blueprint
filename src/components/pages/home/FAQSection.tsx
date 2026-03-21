import { ChevronRight } from "lucide-react";
import React from "react";

const faqs = [
	{
		q: "How does Blueprint select properties?",
		a: "Every listing undergoes a rigorous evaluation process that assesses architectural significance, structural integrity, market potential, and investment yield. Only properties meeting our standards are featured.",
	},
	{
		q: "What are the fees for buyers?",
		a: "Blueprint charges no fees to buyers. Our commission is paid by the seller upon successful completion of a transaction, typically 2.5% of the sale price.",
	},
	{
		q: "Can I schedule a virtual tour?",
		a: "Yes, all properties offer virtual tour options. Simply click 'Schedule Tour' on any property detail page and select your preferred format — in-person or virtual.",
	},
	{
		q: "Do you offer investment consulting?",
		a: "Our in-house investment team provides portfolio analysis, market forecasting, and strategic acquisition guidance. Contact us for a complimentary consultation.",
	},
];

const FAQSection = () => {
	return (
		<section className="py-16 bg-muted/30">
			<div className="container max-w-3xl">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
					Frequently Asked Questions
				</h2>
				<div className="space-y-4">
					{faqs.map((faq, i) => (
						<details
							key={i}
							className="group rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden"
						>
							<summary className="flex items-center justify-between p-6 cursor-pointer font-display font-semibold text-foreground">
								{faq.q}
								<ChevronRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
							</summary>
							<div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
								{faq.a}
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
