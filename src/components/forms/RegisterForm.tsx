import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Building2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import SocialLogin from "../shared/SocialLogin/SocialLogin";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type LoginFormData = {
	fullname: string;
	email: string;
	password: string;
};

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const handleLoginForm = (data: LoginFormData) => {
		setLoading(true);
		console.log(data);
	};
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
						Create Account
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Start your real estate journey
					</p>
				</div>
				<div className="p-8 rounded-2xl bg-card shadow-card border border-border/50">
					<form
						onSubmit={handleSubmit(handleLoginForm)}
						className="space-y-4"
					>
						<div>
							<label className="text-sm font-medium text-foreground mb-1.5 block">
								Full Name
							</label>
							<input
								type="text"
								className="w-full h-11 px-4 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
								placeholder="John Doe"
								{...register("fullname", { required: true })}
							/>
							{errors.fullname?.type === "required" && (
								<p className="text-xs text-destructive mt-1">
									Email is required!
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
								placeholder="john@example.com"
								{...register("email", { required: true })}
							/>
							{errors.email?.type === "required" && (
								<p className="text-xs text-destructive mt-1">
									Email is required!
								</p>
							)}
						</div>
						<div>
							<label className="text-sm font-medium text-foreground mb-1.5 block">
								Select Role
							</label>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Roles</SelectLabel>
										<SelectItem
											value="admin"
											className="data-highlighted:bg-primary data-highlighted:text-foreground!"
										>
											Admin
										</SelectItem>
										<SelectItem
											value="manager"
											className="data-highlighted:bg-primary data-highlighted:text-foreground!"
										>
											Manager
										</SelectItem>
										<SelectItem
											value="user"
											className="data-highlighted:bg-primary data-highlighted:text-foreground!"
										>
											User
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<label className="text-sm font-medium text-foreground mb-1.5 block">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									className="w-full h-11 px-4 rounded-xl border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
									placeholder="********"
									{...register("password", {
										required: true,
									})}
								/>
								{errors.password?.type === "required" && (
									<p className="text-xs text-destructive mt-1">
										Email is required!
									</p>
								)}
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>
						<Button
							type="submit"
							disabled={loading}
							className="w-full rounded-xl h-11"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{" "}
									Creating...
								</span>
							) : (
								"Create Account"
							)}
						</Button>
					</form>

					<div className="mt-6">
						<div className="relative mb-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border" />
							</div>
							<div className="relative flex justify-center">
								<span className="bg-card px-3 text-xs text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<SocialLogin />
					</div>
					<p className="text-center text-sm text-muted-foreground mt-6">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary font-medium hover:underline"
						>
							Sign In
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default RegisterForm;
