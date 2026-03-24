"use client";
import { properties } from "@/data/properties";
import { Eye, Pencil, Search, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ListingsPage = () => {
	const [search, setSearch] = useState("");
	const filtered = properties.filter((p) =>
		p.title.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<div className="space-y-6">
			<div className="relative max-w-sm">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search listings..."
					className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div className="rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border bg-muted/30">
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Property
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Type
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Price
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Status
							</th>
							<th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
								Agent
							</th>
							<th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{filtered.map((p) => (
							<tr
								key={p.id}
								className="hover:bg-muted/20 transition-colors"
							>
								<td className="p-4">
									<div className="flex items-center gap-3">
										<Image
											width={250}
											height={125}
											src={p.image}
											alt=""
											className="h-10 w-14 rounded-lg object-cover"
										/>
										<span className="text-sm font-medium text-foreground text-nowrap">
											{p.title}
										</span>
									</div>
								</td>
								<td className="p-4 text-sm text-muted-foreground text-nowrap">
									{p.type}
								</td>
								<td className="p-4 text-sm font-medium text-foreground tabular-nums text-nowrap">
									${p.price.toLocaleString()}
								</td>
								<td className="p-4 text-nowrap">
									<span
										className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === "For Sale" ? "bg-secondary/10 text-secondary" : p.status === "For Rent" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground text-nowrap"}`}
									>
										{p.status}
									</span>
								</td>
								<td className="p-4 text-sm text-muted-foreground text-nowrap">
									{p.agent}
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

export default ListingsPage;
