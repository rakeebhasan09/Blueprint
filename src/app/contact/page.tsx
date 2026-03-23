"use client";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const contactInfo = [
	{
		icon: MapPin,
		title: "Office",
		info: "100 Architecture Lane\nSan Francisco, CA 94102",
	},
	{ icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
	{ icon: Mail, title: "Email", info: "hello@blueprint.estate" },
	{
		icon: Clock,
		title: "Hours",
		info: "Mon — Fri: 9AM — 6PM\nSat: 10AM — 4PM",
	},
];

type ContactFormData = {
	email: string;
	name: string;
	subject: string;
	message: string;
};

const ContactPage = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormData>();

	const handleContactForm = (data: ContactFormData) => {
		setLoading(true);
		console.log(data);
		setSuccess(true);
	};
	return (
		<>
			<div className="pt-5 pb-16">
				<div className="container">
					<div className="text-center mb-12 pt-8">
						<h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
							Get in Touch
						</h1>
						<p className="text-muted-foreground max-w-lg mx-auto">
							Have a question about a listing or our services?
							We&apos;d love to hear from you.
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{/* Contact Info */}
						<div className="space-y-6">
							{contactInfo.map((item) => (
								<div
									key={item.title}
									className="flex gap-4 p-5 rounded-2xl bg-card shadow-card border border-border/50"
								>
									<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
										<item.icon className="h-5 w-5 text-primary" />
									</div>
									<div>
										<div className="text-sm font-semibold text-foreground">
											{item.title}
										</div>
										<div className="text-sm text-muted-foreground whitespace-pre-line">
											{item.info}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="lg:col-span-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="p-8 rounded-2xl bg-card shadow-card border border-border/50"
							>
								{success ? (
									<div className="text-center py-12">
										<div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
											<Mail className="h-8 w-8 text-secondary" />
										</div>
										<h3 className="font-display text-xl font-bold text-foreground mb-2">
											Message Sent!
										</h3>
										<p className="text-muted-foreground mb-6">
											We&apos;ll get back to you within 24
											hours.
										</p>
										<Button
											variant="outline"
											onClick={() => setSuccess(false)}
											className="rounded-xl"
										>
											Send Another
										</Button>
									</div>
								) : (
									<form
										onSubmit={handleSubmit(
											handleContactForm,
										)}
										className="space-y-5"
									>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
											<div>
												<label className="text-sm font-medium text-foreground mb-1.5 block">
													Name
												</label>
												<input
													type="text"
													className="w-full h-11 px-4 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
													placeholder="John Doe"
													{...register("name", {
														required: true,
													})}
												/>
												{errors.name?.type ===
													"required" && (
													<p className="text-xs text-destructive mt-1">
														Name is required!
													</p>
												)}
											</div>
											<div>
												<label className="text-sm font-medium text-foreground mb-1.5 block">
													Email
												</label>
												<input
													type="email"
													className="w-full h-11 px-4 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
													placeholder="John Doe"
													{...register("email", {
														required: true,
													})}
												/>
												{errors.email?.type ===
													"required" && (
													<p className="text-xs text-destructive mt-1">
														Email is required!
													</p>
												)}
											</div>
										</div>
										<div>
											<label className="text-sm font-medium text-foreground mb-1.5 block">
												Subject
											</label>
											<input
												type="text"
												className="w-full h-11 px-4 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
												placeholder="Property inquiry"
												{...register("subject", {
													required: true,
												})}
											/>
											{errors.subject?.type ===
												"required" && (
												<p className="text-xs text-destructive mt-1">
													Subject is required!
												</p>
											)}
										</div>
										<div>
											<label className="text-sm font-medium text-foreground mb-1.5 block">
												Message
											</label>
											<textarea
												rows={5}
												className="w-full px-4 py-2 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
												placeholder="Tell us how we can help..."
												{...register("message", {
													required: true,
												})}
											></textarea>
											{errors.message?.type ===
												"required" && (
												<p className="text-xs text-destructive mt-1">
													Message is required!
												</p>
											)}
										</div>
										<Button
											type="submit"
											disabled={loading}
											className="w-full rounded-xl h-11"
										>
											{loading ? (
												<span className="flex items-center gap-2">
													<span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{" "}
													Sending...
												</span>
											) : (
												"Send Message"
											)}
										</Button>
									</form>
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
