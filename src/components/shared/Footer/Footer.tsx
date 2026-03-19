"use client";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
	const fullYear = new Date().getFullYear();
	return (
		<div className="bg-foreground text-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* About Company */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Building2 className="h-6 w-6" />
							<span className="font-display text-lg font-bold">
								Blueprint
							</span>
						</div>
						<p className="text-background/60 text-sm leading-relaxed mb-6">
							A curated marketplace for architectural landmarks
							and high-yield residential assets.
						</p>
						<div className="flex gap-4">
							{["X", "In", "Fb", "Ig"].map((s) => (
								<a
									key={s}
									href="#"
									className="h-9 w-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-xs font-bold transition-colors"
								>
									{s}
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<h4 className="font-display font-semibold mb-4">
							Navigation
						</h4>
						<div className="space-y-3">
							{[
								{ label: "Home", path: "/" },
								{
									label: "Explore Properties",
									path: "/explore",
								},
								{ label: "About Us", path: "/about" },
								{ label: "Blog", path: "/blog" },
								{ label: "Contact", path: "/contact" },
							].map((link) => (
								<Link
									key={link.path}
									href={link.path}
									className="block text-sm text-background/60 hover:text-background transition-colors"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					{/* Services */}
					<div>
						<h4 className="font-display font-semibold mb-4">
							Services
						</h4>
						<div className="space-y-3">
							{[
								"Property Valuation",
								"Legal Advisory",
								"Home Staging",
								"Market Analysis",
								"Investment Consulting",
							].map((s) => (
								<span
									key={s}
									className="block text-sm text-background/60"
								>
									{s}
								</span>
							))}
						</div>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-display font-semibold mb-4">
							Contact
						</h4>
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm text-background/60">
								<MapPin className="h-4 w-4 shrink-0" /> 65/6
								Sherpur, 2100
							</div>
							<div className="flex items-center gap-3 text-sm text-background/60">
								<Phone className="h-4 w-4 shrink-0" />{" "}
								+8801701028688
							</div>
							<div className="flex items-center gap-3 text-sm text-background/60">
								<Mail className="h-4 w-4 shrink-0" />{" "}
								mdrakeebhasan1@gmail.com
							</div>
						</div>
					</div>
				</div>

				{/* Copy right area */}
				<div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-background/40">
						© {fullYear} Blueprint Estate. All rights reserved.
					</p>
					<div className="flex gap-6 text-sm text-background/40">
						<Link
							href="/about"
							className="hover:text-background/60 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/about"
							className="hover:text-background/60 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
