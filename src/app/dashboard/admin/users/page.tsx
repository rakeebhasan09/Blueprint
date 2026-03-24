"use client";
import { mockUsers } from "@/data/properties";
import { Eye, Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";

const UsersPage = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const filtered = mockUsers.filter(
		(u) =>
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<div className="space-y-6">
			<div className="relative max-w-sm">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search users..."
					className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div className="rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-muted/30">
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Name
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Email
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Role
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Joined
								</th>
								<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Bookings
								</th>
								<th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{filtered.map((u) => (
								<tr
									key={u.id}
									className="hover:bg-muted/20 transition-colors text-nowrap"
								>
									<td className="p-4 text-sm font-medium text-foreground text-nowrap">
										{u.name}
									</td>
									<td className="p-4 text-sm text-muted-foreground text-nowrap">
										{u.email}
									</td>
									<td className="p-4 text-nowrap">
										<span
											className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
										>
											{u.role}
										</span>
									</td>
									<td className="p-4 text-sm text-muted-foreground tabular-nums text-nowrap">
										{u.joined}
									</td>
									<td className="p-4 text-sm text-foreground tabular-nums text-nowrap">
										{u.bookings}
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
		</div>
	);
};

export default UsersPage;
