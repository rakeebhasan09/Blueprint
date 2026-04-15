"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Building2,
    ChevronDown,
    LogOut,
    Menu,
    Moon,
    Settings,
    Sun,
    User,
    X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);
    const isAuthenticated = session;
    const user = session?.user;

    console.log(session);

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const publicLinks = [
        { label: "Home", path: "/" },
        { label: "Explore", path: "/explore" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode, mounted]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    if (!mounted) return null;

    return (
        <nav className="glass border-b border-border/50">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Website Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Building2 className="h-7 w-7 text-primary" />
                        <span className="font-display text-xl font-bold text-foreground">
                            Blueprint
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {publicLinks.map((link) => {
                            const isActive = pathname === link.path;

                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`px-4 py-2 rounded-lg text-base font-medium transition-colors
				${
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            {isDarkMode ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </button>
                        {isAuthenticated ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                                            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                                                <span className="text-xs font-bold text-primary-foreground">
                                                    {user?.name.charAt(0)}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-foreground">
                                                {user?.name}
                                            </span>
                                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-48"
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={
                                                    user?.role === "admin"
                                                        ? "/admin"
                                                        : "/dashboard"
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <User className="h-4 w-4" />{" "}
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={
                                                    user?.role === "admin"
                                                        ? "/admin/settings"
                                                        : "/dashboard/profile"
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <Settings className="h-4 w-4" />{" "}
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => signOut()}
                                            className="flex items-center gap-2 text-destructive"
                                        >
                                            <LogOut className="h-4 w-4" />{" "}
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button className="bg-transparent transition-colors duration-300 text-[#1B222B] dark:text-white hover:text-white hover:bg-[#F59F0A]">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Get Started</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-foreground"
                    >
                        {mobileOpen ? (
                            <X className="h-8 w-8" />
                        ) : (
                            <Menu className="h-8 w-8" />
                        )}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-card border-t border-border">
                    <div className="px-4 py-4 space-y-1">
                        {/* Links */}
                        {publicLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        {/* Buttons */}
                        <div className="pt-3 border-t border-border mt-3 flex items-center gap-2">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-muted-foreground hover:bg-muted"
                            >
                                {isDarkMode ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </button>
                            {!isAuthenticated && (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1"
                                    >
                                        <Button size="sm" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                            {isAuthenticated && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setMobileOpen(false);
                                    }}
                                    className="text-destructive"
                                >
                                    <LogOut className="h-4 w-4 mr-2" /> Logout
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
