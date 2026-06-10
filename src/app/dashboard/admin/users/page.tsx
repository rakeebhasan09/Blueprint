"use client";
import { mockUsers } from "@/data/properties";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Eye, Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const UsersPage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const useaxios = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await useaxios.get("/users");
            return res.data.users;
        },
    });

    const filtered = users.filter(
        (u: any) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    // Handle Delete User
    const handleDeleteUser = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed)
                useaxios.delete(`/users/${id}`).then((res) => {
                    if (res.data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${res.data.message}`,
                            icon: "success",
                        });
                        refetch();
                    }
                });
        });
    };

    // Handle Update User Role
    const handleUpdateUserRole = (id: string, newRole: string) => {
        const payload = { role: newRole };
        useaxios.patch(`/users/${id}`, payload).then((res) => {
            if (res.data.success) {
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
    return (
        <div className="space-y-6">
            <div>
                <p>Total Users {users.length}</p>
            </div>
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
                            {filtered.map((u: any) => (
                                <tr
                                    key={u._id}
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
                                        {u.createdAt.split("T")[0]}
                                    </td>
                                    <td className="p-4 text-sm text-foreground tabular-nums text-nowrap">
                                        {u.bookingCount ? u.bookingCount : "0"}
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <button className="px-3 py-2 mr-2 rounded-lg bg-secondary text-white">
                                            <Eye size={16} />
                                        </button>
                                        {/* <button className="px-3 py-2 mr-2 rounded-lg bg-accent text-white">
                                            <Pencil size={16} />
                                        </button> */}
                                        <button
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setIsEditOpen(true);
                                            }}
                                            className="px-3 py-2 mr-2 rounded-lg bg-accent text-white"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(u._id)
                                            }
                                            disabled={u.role === "admin"}
                                            className={`px-3 py-2 rounded-lg bg-destructive text-white ${
                                                u.role === "admin"
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Update user role popup */}
            <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            User Name: {selectedUser?.name}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            User Email: {selectedUser?.email}
                            <br />
                            User Role: {selectedUser?.role}
                            <br />
                            User Join Date:{" "}
                            {selectedUser?.createdAt.split("T")[0]}
                            <br />
                            Update User Role:
                            <br />
                            <Select
                                onValueChange={(newRole) =>
                                    handleUpdateUserRole(
                                        selectedUser?._id,
                                        newRole,
                                    )
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>

                                        <SelectItem
                                            value="user"
                                            className="data-highlighted:bg-primary data-highlighted:text-foreground!"
                                        >
                                            User
                                        </SelectItem>
                                        <SelectItem
                                            value="manager"
                                            className="data-highlighted:bg-primary data-highlighted:text-foreground!"
                                        >
                                            Manager
                                        </SelectItem>
                                        <SelectItem
                                            value="admin"
                                            className="data-highlighted:bg-primary data-highlighted:text-foreground!"
                                        >
                                            Admin
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UsersPage;
