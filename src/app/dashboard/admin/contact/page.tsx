"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TContact } from "@/data/properties";

const ContactFormPage = () => {
    const [showDetailsModal, setshowDetailsModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<TContact | null>(
        null,
    );
    const useaxios = useAxios();
    const { data: contactMessages = [], refetch } = useQuery<TContact[]>({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await useaxios.get("/contacts");
            return res.data.contacts;
        },
    });
    const handleViewDetails = (cm: TContact) => {
        setSelectedMessage(cm);
        setshowDetailsModal(true);
    };
    return (
        <div>
            <p className="pb-5">
                Total {contactMessages.length} messages found.
            </p>
            <div className="rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Serial No
                            </th>
                            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Customer Name
                            </th>
                            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Customer Email
                            </th>
                            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Subject
                            </th>
                            <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Date
                            </th>
                            <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase text-nowrap">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {contactMessages?.length > 0 ? (
                            contactMessages.map((cm: any, index: number) => (
                                <tr
                                    key={cm._id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <td className="p-4 text-sm font-bold text-foreground text-nowrap">
                                        {index + 1 < 10
                                            ? `0${index + 1}`
                                            : index + 1}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap">
                                        {cm.name}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap">
                                        {cm.email}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap">
                                        {cm.subject}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap">
                                        {cm.createdAt.split("T")[0]}
                                    </td>
                                    <td className="p-4 text-sm text-foreground text-nowrap text-center">
                                        <button
                                            onClick={() =>
                                                handleViewDetails(cm)
                                            }
                                            className="px-3 py-2 mr-2 rounded-lg bg-secondary text-white"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-8 text-center text-muted-foreground"
                                >
                                    0 Message Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* View Details Modal */}
            {showDetailsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                        onClick={() => setshowDetailsModal(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-card rounded-2xl shadow-elevated border border-border p-8 w-full max-w-xl"
                    >
                        <h3 className="font-display text-xl font-bold text-foreground mb-4">
                            View Contact Details
                        </h3>
                        <div>
                            <p>Message ID: {selectedMessage?._id}</p>
                            <p>Customer Name: {selectedMessage?.name}</p>
                            <p>Cuntomer Email: {selectedMessage?.email}</p>
                            <p>Subject: {selectedMessage?.subject}</p>
                            <p>Description: {selectedMessage?.message}</p>
                        </div>
                        <button
                            onClick={() => setshowDetailsModal(false)}
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

export default ContactFormPage;
