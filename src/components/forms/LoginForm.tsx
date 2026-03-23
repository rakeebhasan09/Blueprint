import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2 } from "lucide-react";

const LoginForm = () => {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
			>
				<div className="text-center mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 mb-6"
					>
						<Building2 className="h-8 w-8 text-primary" />
						<span className="font-display text-2xl font-bold text-foreground">
							Blueprint
						</span>
					</Link>
					<h1 className="font-display text-2xl font-bold text-foreground">
						Welcome Back
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Sign in to your account
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginForm;
