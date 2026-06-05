"use client";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Eye, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Booking {
    _id?: string;
    propertyTitle?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    tourDate?: string;
    tourTime?: string;
    tourType?: string;
    status?: string;
    propertyId?: string;
    bookingId?: string;
}

const OrdersPage = () => {
    const [showViewDetailsModal, setshowViewDetailsModal] = useState(false);
    const [updateOrderStatusModal, setUpdateOrderStatusModal] = useState(false);

    const [selectedForViewDetails, setSelectedForViewDetails] =
        useState<Booking | null>(null);

    const [selectedForUpdateStatus, setSelectedForUpdateStatus] =
        useState<Booking | null>(null);
    const [filter, setFilter] = useState("All");
    const useaxios = useAxios();

    useEffect(() => {
        setSelectedForViewDetails(selectedForViewDetails);
        setUpdateOrderStatusModal(updateOrderStatusModal);
    }, [selectedForViewDetails, updateOrderStatusModal]);

    const { data: bookingsData, refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await useaxios.get("/bookings");
            return res.data.bookings;
        },
    });

    const filtered =
        filter === "All"
            ? bookingsData
            : bookingsData.filter((b: any) => b.status === filter);

    // Handle View Booking Details
    const handleViewBookingDetails = (booking: object) => {
        setSelectedForViewDetails(booking);
        setshowViewDetailsModal(true);
    };

    // Handle Update Order Status Pending to Confirm / Canelled
    const showUpdateStatusModal = (booking: object) => {
        setSelectedForUpdateStatus(booking);
        setUpdateOrderStatusModal(true);
        console.log(selectedForUpdateStatus);
    };

    const handleUpdateStatus = (_id: string, newStatus: string) => {
        const payload = {
            status: newStatus,
        };
        useaxios
            .patch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/${_id}`,
                payload,
            )
            .then((res) => {
                if (res.data.success) {
                    setUpdateOrderStatusModal(false);
                    Swal.fire({
                        title: "Updated!",
                        text: `${res.data.message}`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };

    // Handle Delete
    const handleDeleteBooking = (bookingId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                useaxios
                    .delete(
                        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/bookings/${bookingId}`,
                    )
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${res.data.message}`,
                                icon: "success",
                            });
                            refetch();
                        }
                    });
            }
        });
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                {["All", "confirmed", "pending", "cancelled"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
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
                                Tour Type
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
                        {filtered?.length > 0 ? (
                            filtered.map((b: any) => (
                                <tr
                                    key={b._id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <td className="p-4 text-sm font-medium text-foreground text-nowrap">
                                        {b.bookingId}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap">
                                        {b.propertyTitle}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground tabular-nums text-nowrap">
                                        {b.tourDate}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground text-nowrap">
                                        {new Date(
                                            `1970-01-01T${b.tourTime}`,
                                        ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground tabular-nums text-nowrap">
                                        {b.tourType}
                                    </td>
                                    <td className="p-4 text-nowrap">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${b.status === "confirmed" ? "bg-secondary/10 text-secondary" : b.status === "pending" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <button
                                            onClick={() =>
                                                handleViewBookingDetails(b)
                                            }
                                            className="px-3 py-2 mr-2 rounded-lg bg-secondary text-white"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            disabled={
                                                b.status === "confirmed" ||
                                                b.status === "cancelled"
                                            }
                                            onClick={() =>
                                                showUpdateStatusModal(b)
                                            }
                                            className={`px-3 py-2 mr-2 rounded-lg bg-accent text-white ${
                                                b.status === "confirmed" ||
                                                b.status === "cancelled"
                                                    ? "opacity-50"
                                                    : "opacity-100"
                                            }`}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteBooking(b._id)
                                            }
                                            className="px-3 py-2 rounded-lg bg-destructive text-white"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="p-8 text-center text-muted-foreground"
                                >
                                    No {filter} bookings found 😔
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            {showViewDetailsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                        onClick={() => setshowViewDetailsModal(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-card rounded-2xl shadow-elevated border border-border p-8 w-full max-w-lg"
                    >
                        <h3 className="font-display text-xl font-bold text-foreground mb-4">
                            View Booking Details
                        </h3>

                        <div>
                            <p>
                                Property Title:{" "}
                                {selectedForViewDetails?.propertyTitle}
                            </p>
                            <p>
                                Customer Name:{" "}
                                {selectedForViewDetails?.customerName}
                            </p>
                            <p>
                                Customer Email:{" "}
                                {selectedForViewDetails?.customerEmail}
                            </p>
                            <p>
                                Customer Phone:{" "}
                                {selectedForViewDetails?.customerPhone}
                            </p>
                            <p>Tour Date: {selectedForViewDetails?.tourDate}</p>
                            <p>
                                Tour Time:{" "}
                                {new Date(
                                    `1970-01-01T${selectedForViewDetails?.tourTime}`,
                                ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </p>
                            <p>Tour Type: {selectedForViewDetails?.tourType}</p>
                            <br />
                            <br />
                            <Link
                                href={`/property/${selectedForViewDetails?.propertyId}`}
                            >
                                View Property
                            </Link>
                        </div>

                        <button
                            onClick={() => setshowViewDetailsModal(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            ✕
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Update Status Modal */}
            {updateOrderStatusModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-card rounded-2xl shadow-elevated border border-border p-8 w-full max-w-lg"
                    >
                        <h3 className="font-display text-xl font-bold text-foreground mb-4">
                            Update Order Status...
                        </h3>

                        <div>
                            <p>Target ID: {selectedForUpdateStatus?._id}</p>
                            <p>
                                Booking ID: {selectedForUpdateStatus?.bookingId}
                            </p>
                            <p>
                                Property Title:{" "}
                                {selectedForUpdateStatus?.propertyTitle}
                            </p>
                            <p>Set New Status</p>
                            <div>
                                <Select
                                    onValueChange={(newStatus) => {
                                        if (!selectedForUpdateStatus?._id)
                                            return;
                                        handleUpdateStatus(
                                            selectedForUpdateStatus?._id,
                                            newStatus,
                                        );
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                New Status
                                            </SelectLabel>

                                            <SelectItem
                                                value="confirmed"
                                                className="data-highlighted:bg-primary data-highlighted:text-foreground!"
                                            >
                                                confirmed
                                            </SelectItem>
                                            <SelectItem
                                                value="cancelled"
                                                className="data-highlighted:bg-primary data-highlighted:text-foreground!"
                                            >
                                                cancelled
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <button
                            onClick={() => setUpdateOrderStatusModal(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            ✕
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
