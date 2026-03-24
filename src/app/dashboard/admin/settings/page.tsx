"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const SettingsPage = () => {
	const [success, setSuccess] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");

		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setIsDarkMode(true);
		} else {
			document.documentElement.classList.remove("dark");
			setIsDarkMode(false);
		}
	}, []);

	const toggleDarkMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);

		if (newMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};
	return (
		<div className="max-w-2xl space-y-6">
			{success && (
				<div className="p-3 rounded-xl bg-secondary/10 text-secondary text-sm font-medium">
					Settings saved successfully!
				</div>
			)}
			<div className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
				<h3 className="font-display font-bold text-foreground mb-4">
					Appearance
				</h3>
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm font-medium text-foreground">
							Dark Mode
						</div>
						<div className="text-xs text-muted-foreground">
							Toggle between light and dark themes
						</div>
					</div>
					<button
						onClick={toggleDarkMode}
						className={`relative w-14 h-7 rounded-full transition-colors ${isDarkMode ? "bg-primary" : "bg-muted"}`}
					>
						<div
							className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-transform flex items-center justify-center ${isDarkMode ? "translate-x-7" : "translate-x-0.5"}`}
						>
							{isDarkMode ? (
								<Moon className="h-3 w-3 text-primary" />
							) : (
								<Sun className="h-3 w-3 text-muted-foreground" />
							)}
						</div>
					</button>
				</div>
			</div>

			<div className="p-6 rounded-2xl bg-card shadow-card border border-border/50 space-y-4">
				<h3 className="font-display font-bold text-foreground">
					Notifications
				</h3>
				{[
					"Email notifications",
					"Push notifications",
					"Marketing emails",
				].map((item) => (
					<div
						key={item}
						className="flex items-center justify-between py-2"
					>
						<span className="text-sm text-foreground">{item}</span>
						<button className="relative w-10 h-5 rounded-full bg-primary">
							<div className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-card shadow-sm" />
						</button>
					</div>
				))}
			</div>

			<div className="p-6 rounded-2xl bg-card shadow-card border border-border/50 space-y-4">
				<h3 className="font-display font-bold text-foreground">
					Site Configuration
				</h3>
				<div>
					<label className="text-sm font-medium text-foreground mb-1.5 block">
						Site Name
					</label>
					<input
						type="text"
						defaultValue="Blueprint Estate"
						className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-foreground mb-1.5 block">
						Support Email
					</label>
					<input
						type="email"
						defaultValue="hello@blueprint.estate"
						className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<Button
					className="rounded-xl"
					onClick={() => {
						setSuccess(true);
						setTimeout(() => setSuccess(false), 3000);
					}}
				>
					Save Settings
				</Button>
			</div>
		</div>
	);
};

export default SettingsPage;
