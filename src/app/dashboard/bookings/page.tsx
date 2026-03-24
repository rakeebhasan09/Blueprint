"use client";
import { mockBookings } from "@/components/pages/dashboard/overview/OverviewSection";
import React, { useState } from "react";

const MyBookingsPage = () => {
	const [filter, setFilter] = useState("All");
	const bookings = mockBookings.filter((b) => b.userId === "u1");
	const filtered =
		filter === "All"
			? bookings
			: bookings.filter((b) => b.status === filter);
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				{["All", "Confirmed", "Pending", "Cancelled"].map((f) => (
					<button
						key={f}
						onClick={() => setFilter(f)}
						className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
					>
						{f}
					</button>
				))}
			</div>

			<div className="rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-muted/30">
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">
									Property
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">
									Date
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">
									Time
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{filtered.map((b) => (
								<tr
									key={b.id}
									className="hover:bg-muted/20 transition-colors"
								>
									<td className="p-4 text-sm font-medium text-foreground">
										{b.propertyTitle}
									</td>
									<td className="p-4 text-sm text-muted-foreground tabular-nums">
										{b.date}
									</td>
									<td className="p-4 text-sm text-muted-foreground">
										{b.time}
									</td>
									<td className="p-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												b.status === "Confirmed"
													? "bg-secondary/10 text-secondary"
													: b.status === "Pending"
														? "bg-accent/10 text-accent"
														: "bg-destructive/10 text-destructive"
											}`}
										>
											{b.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{filtered.length === 0 && (
					<div className="p-8 text-center text-muted-foreground text-sm">
						No bookings found.
					</div>
				)}
			</div>
		</div>
	);
};

export default MyBookingsPage;
