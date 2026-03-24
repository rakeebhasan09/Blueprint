"use client";
import { mockBookings } from "@/components/pages/dashboard/overview/OverviewSection";
import { Eye, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";

const OrdersPage = () => {
	const [filter, setFilter] = useState("All");
	const filtered =
		filter === "All"
			? mockBookings
			: mockBookings.filter((b) => b.status === filter);
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

			<div className="rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border bg-muted/30">
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Booking ID
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Property
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Date
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Time
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Status
							</th>
							<th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{filtered.map((b) => (
							<tr
								key={b.id}
								className="hover:bg-muted/20 transition-colors"
							>
								<td className="p-4 text-sm font-medium text-foreground text-nowrap">
									{b.id}
								</td>
								<td className="p-4 text-sm text-foreground text-nowrap">
									{b.propertyTitle}
								</td>
								<td className="p-4 text-sm text-muted-foreground tabular-nums text-nowrap">
									{b.date}
								</td>
								<td className="p-4 text-sm text-muted-foreground text-nowrap">
									{b.time}
								</td>
								<td className="p-4 text-nowrap">
									<span
										className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.status === "Confirmed" ? "bg-secondary/10 text-secondary" : b.status === "Pending" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}
									>
										{b.status}
									</span>
								</td>
								<td className="text-center text-nowrap">
									<button className="px-3 py-2 mr-2 rounded-lg bg-secondary text-white">
										<Eye size={16} />
									</button>
									<button className="px-3 py-2 mr-2 rounded-lg bg-accent text-white">
										<Pencil size={16} />
									</button>
									<button className="px-3 py-2 rounded-lg bg-destructive text-white">
										<Trash size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrdersPage;
