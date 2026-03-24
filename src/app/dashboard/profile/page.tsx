"use client";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import React, { useState } from "react";

const MyProfilePage = () => {
	const [editing, setEditing] = useState(false);
	const [success, setSuccess] = useState(false);
	const user = {
		name: "Rakeeb Hasan",
		email: "mdrakeebhasan1@gmail.com",
		role: "user",
		phone: "+8801701028688",
		bio: "My bio",
	};
	const handleSave = () => {
		setEditing(false);
		setSuccess(true);
		setTimeout(() => setSuccess(false), 3000);
	};
	return (
		<div className="max-w-2xl space-y-6">
			{success && (
				<div className="p-3 rounded-xl bg-secondary/10 text-secondary text-sm font-medium">
					Profile updated successfully!
				</div>
			)}
			{/* Avatar */}
			<div className="flex items-center gap-6 p-6 rounded-2xl bg-card shadow-card border border-border/50">
				<div className="relative">
					<div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
						<span className="text-2xl font-display font-bold text-primary-foreground">
							{user?.name.charAt(0)}
						</span>
					</div>
					<button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-card shadow-card border border-border flex items-center justify-center">
						<Camera className="h-3.5 w-3.5 text-muted-foreground" />
					</button>
				</div>
				<div>
					<h2 className="font-display font-bold text-foreground text-lg">
						{user?.name}
					</h2>
					<p className="text-sm text-muted-foreground">
						{user?.email}
					</p>
					<span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mt-1 inline-block capitalize">
						{user?.role}
					</span>
				</div>
			</div>

			{/* Form */}
			<div className="p-6 rounded-2xl bg-card shadow-card border border-border/50 space-y-5">
				<div className="flex items-center justify-between">
					<h3 className="font-display font-bold text-foreground">
						Profile Information
					</h3>
					{!editing && (
						<Button
							variant="outline"
							size="sm"
							className="rounded-lg px-4 py-4"
							onClick={() => setEditing(true)}
						>
							Edit
						</Button>
					)}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<div>
						<label className="text-sm font-medium text-foreground mb-1.5 block">
							Full Name
						</label>
						<input
							type="text"
							value={user.name}
							disabled={!editing}
							className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
						/>
					</div>
					<div>
						<label className="text-sm font-medium text-foreground mb-1.5 block">
							Email
						</label>
						<input
							type="email"
							value={user.email}
							disabled={!editing}
							className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
						/>
					</div>
					<div>
						<label className="text-sm font-medium text-foreground mb-1.5 block">
							Phone
						</label>
						<input
							type="tel"
							value={user.phone}
							disabled={!editing}
							className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
						/>
					</div>
				</div>
				<div>
					<label className="text-sm font-medium text-foreground mb-1.5 block">
						Bio
					</label>
					<textarea
						value={user.bio}
						disabled={!editing}
						rows={3}
						className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-60"
					/>
				</div>
				{editing && (
					<div className="flex gap-3">
						<Button
							className="rounded-xl px-4 py-5"
							onClick={handleSave}
						>
							Save Changes
						</Button>
						<Button
							variant="outline"
							className="rounded-xl px-4 py-5"
							onClick={() => setEditing(false)}
						>
							Cancel
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyProfilePage;
