"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const NewsletterSection = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) return;

		// এখানে চাইলে API call করতে পারো

		setIsSubmitted(true);
		setEmail("");
	};

	return (
		<section className="py-16">
			<div className="container max-w-2xl text-center">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
					Stay Informed
				</h2>
				<p className="text-muted-foreground mb-8">
					Get weekly market insights and new listings delivered to
					your inbox.
				</p>

				{isSubmitted ? (
					<div className="p-6 rounded-xl bg-green-100 text-green-700 border border-green-300">
						🎉 Congratulations! You have successfully subscribed.
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="flex gap-3 max-w-md mx-auto"
					>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
						/>
						<Button type="submit" className="h-12 px-6 rounded-xl">
							Subscribe
						</Button>
					</form>
				)}
			</div>
		</section>
	);
};

export default NewsletterSection;
