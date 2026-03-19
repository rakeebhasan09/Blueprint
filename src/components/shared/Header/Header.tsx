"use client";
import { Button } from "@/components/ui/button";
import { Building2, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	const publicLinks = [
		{ label: "Home", path: "/" },
		{ label: "Explore", path: "/explore" },
		{ label: "About", path: "/about" },
		{ label: "Contact", path: "/contact" },
	];

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<nav className="glass border-b border-border/50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Website Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Building2 className="h-7 w-7 text-primary" />
						<span className="font-display text-xl font-bold text-foreground">
							Blueprint
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden lg:flex items-center gap-1">
						{publicLinks.map((link) => {
							const isActive = pathname === link.path;

							return (
								<Link
									key={link.path}
									href={link.path}
									className={`px-4 py-2 rounded-lg text-base font-medium transition-colors
				${
					isActive
						? "bg-primary/10 text-primary"
						: "text-muted-foreground hover:text-foreground hover:bg-muted"
				}`}
								>
									{link.label}
								</Link>
							);
						})}
					</div>

					{/* Auth Buttons */}
					<div className="hidden lg:flex items-center gap-3">
						<button
							onClick={toggleDarkMode}
							className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
						>
							{isDarkMode ? (
								<Sun className="h-4 w-4" />
							) : (
								<Moon className="h-4 w-4" />
							)}
						</button>

						<div className="flex items-center gap-2">
							<Link href="/login">
								<Button className="bg-transparent transition-colors duration-300 text-[#1B222B] hover:text-white hover:bg-[#F59F0A]">
									Sign In
								</Button>
							</Link>
							<Link href="/register">
								<Button>Get Started</Button>
							</Link>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="lg:hidden p-2 text-foreground"
					>
						{mobileOpen ? (
							<X className="h-8 w-8" />
						) : (
							<Menu className="h-8 w-8" />
						)}
					</button>
				</div>
			</div>
			{/* Mobile Menu */}
			{mobileOpen && (
				<div className="md:hidden bg-card border-t border-border">
					<div className="px-4 py-4 space-y-1">
						{/* Links */}
						{publicLinks.map((link) => {
							const isActive = pathname === link.path;
							return (
								<Link
									key={link.path}
									href={link.path}
									onClick={() => setMobileOpen(false)}
									className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
										isActive
											? "bg-primary/10 text-primary"
											: "text-muted-foreground hover:bg-muted"
									}`}
								>
									{link.label}
								</Link>
							);
						})}
						{/* Buttons */}
						<div className="pt-3 border-t border-border mt-3 flex items-center gap-2">
							<button
								onClick={toggleDarkMode}
								className="p-2 rounded-lg text-muted-foreground hover:bg-muted"
							>
								{isDarkMode ? (
									<Sun className="h-4 w-4" />
								) : (
									<Moon className="h-4 w-4" />
								)}
							</button>
							<>
								<Link
									href="/login"
									onClick={() => setMobileOpen(false)}
									className="flex-1"
								>
									<Button
										variant="ghost"
										size="sm"
										className="w-full"
									>
										Sign In
									</Button>
								</Link>
								<Link
									href="/register"
									onClick={() => setMobileOpen(false)}
									className="flex-1"
								>
									<Button size="sm" className="w-full">
										Get Started
									</Button>
								</Link>
							</>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Header;
