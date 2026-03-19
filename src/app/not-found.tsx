"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-6">
			<div className="text-center max-w-xl">
				{/* Icon */}
				<div className="flex justify-center mb-6">
					<AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400" />
				</div>

				{/* Title */}
				<h1 className="text-6xl font-bold text-foreground mb-4">404</h1>

				{/* Subtitle */}
				<h2 className="text-2xl font-semibold text-foreground/80 mb-2">
					Page Not Found
				</h2>

				{/* Description */}
				<p className="text-muted-foreground mb-6">
					Sorry, the page you are looking for doesn’t exist or has
					been moved.
				</p>

				{/* Buttons */}
				<div className="flex items-center justify-center gap-4">
					<Link href="/">
						<Button>Go Home</Button>
					</Link>
				</div>

				{/* Footer text */}
				<div className="mt-10 text-sm text-muted-foreground">
					Error code: 404 | Blueprint
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
