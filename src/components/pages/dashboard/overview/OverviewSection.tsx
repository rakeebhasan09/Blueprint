"use client";
import { Building, CalendarCheck, Star, TrendingUp } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface Booking {
	id: string;
	propertyId: string;
	propertyTitle: string;
	date: string;
	time: string;
	status: "Confirmed" | "Pending" | "Cancelled";
	userId: string;
}

export const mockBookings: Booking[] = [
	{
		id: "b1",
		propertyId: "1",
		propertyTitle: "Modern Glass Villa",
		date: "2024-04-20",
		time: "10:00 AM",
		status: "Confirmed",
		userId: "u1",
	},
	{
		id: "b2",
		propertyId: "3",
		propertyTitle: "Mid-Century Ranch Estate",
		date: "2024-04-22",
		time: "2:00 PM",
		status: "Pending",
		userId: "u1",
	},
	{
		id: "b3",
		propertyId: "5",
		propertyTitle: "Waterfront Modern Condo",
		date: "2024-04-25",
		time: "11:00 AM",
		status: "Confirmed",
		userId: "u2",
	},
	{
		id: "b4",
		propertyId: "2",
		propertyTitle: "Brutalist Penthouse Loft",
		date: "2024-04-28",
		time: "3:00 PM",
		status: "Cancelled",
		userId: "u4",
	},
	{
		id: "b5",
		propertyId: "6",
		propertyTitle: "Mountain Retreat Cabin",
		date: "2024-05-01",
		time: "9:00 AM",
		status: "Pending",
		userId: "u5",
	},
];

const OverviewSection = () => {
	const userBookings = mockBookings.filter((b) => b.userId === "u1");
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[
					{
						label: "Active Bookings",
						value: userBookings.filter(
							(b) => b.status === "Confirmed",
						).length,
						icon: CalendarCheck,
						color: "text-primary",
					},
					{
						label: "Pending Tours",
						value: userBookings.filter(
							(b) => b.status === "Pending",
						).length,
						icon: Building,
						color: "text-accent",
					},
					{
						label: "Reviews Given",
						value: 4,
						icon: Star,
						color: "text-secondary",
					},
					{
						label: "Saved Properties",
						value: 12,
						icon: TrendingUp,
						color: "text-primary",
					},
				].map((stat, i) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
					>
						<div className="flex items-center justify-between mb-3">
							<stat.icon className={`h-5 w-5 ${stat.color}`} />
						</div>
						<div className="text-2xl font-display font-bold text-foreground tabular-nums">
							{stat.value}
						</div>
						<div className="text-sm text-muted-foreground">
							{stat.label}
						</div>
					</motion.div>
				))}
			</div>
			{/* Recent Bookings */}
			<div className="rounded-2xl bg-card shadow-card border border-border/50">
				<div className="p-6 border-b border-border flex items-center justify-between">
					<h2 className="font-display font-bold text-foreground">
						Recent Bookings
					</h2>
					<Link
						href="/dashboard/bookings"
						className="text-sm text-primary hover:underline"
					>
						View All
					</Link>
				</div>
				<div className="divide-y divide-border">
					{userBookings.slice(0, 3).map((booking) => (
						<div
							key={booking.id}
							className="p-4 sm:p-6 flex items-center justify-between"
						>
							<div>
								<div className="font-medium text-foreground text-sm">
									{booking.propertyTitle}
								</div>
								<div className="text-xs text-muted-foreground">
									{booking.date} at {booking.time}
								</div>
							</div>
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold ${
									booking.status === "Confirmed"
										? "bg-secondary/10 text-secondary"
										: booking.status === "Pending"
											? "bg-accent/10 text-accent"
											: "bg-destructive/10 text-destructive"
								}`}
							>
								{booking.status}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OverviewSection;
