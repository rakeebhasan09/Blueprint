"use client";
import { mockBookings } from "@/components/pages/dashboard/overview/OverviewSection";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MyBookingsPage = () => {
    const [filter, setFilter] = useState("All");
    const session = useSession();
    const user = session.data?.user;
    const userEmail = user?.email;
    const useaxios = useAxios();

    const { data: userBookings = [] } = useQuery({
        queryKey: ["userBookings", userEmail],
        enabled: !!userEmail,
        queryFn: async () => {
            const res = await useaxios.get(
                `/bookings?customerEmail=${userEmail}`,
            );

            return res.data.bookings;
        },
    });

    const filtered =
        filter === "All"
            ? userBookings
            : userBookings.filter((b: any) => b.status === filter);
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                {["All", "confirmed", "pending", "cancelled"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 capitalize rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
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
                            {filtered.map((b: any) => (
                                <tr
                                    key={b._id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <td className="p-4 text-sm font-medium text-foreground">
                                        {b.propertyTitle}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground tabular-nums">
                                        {b.tourDate}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">
                                        {new Date(
                                            `1970-01-01T${b.tourTime}`,
                                        ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                b.status === "confirmed"
                                                    ? "bg-secondary/10 text-secondary"
                                                    : b.status === "pending"
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
