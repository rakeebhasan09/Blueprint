"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BarChart3,
	Building,
	CalendarCheck,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	Star,
	User,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const userLinks = [
	{ label: "Overview", path: "/dashboard", icon: LayoutDashboard },
	{ label: "My Bookings", path: "/dashboard/bookings", icon: CalendarCheck },
	{ label: "My Reviews", path: "/dashboard/reviews", icon: Star },
	{ label: "My Profile", path: "/dashboard/profile", icon: User },
];

const adminLinks = [
	{ label: "Overview", path: "/admin", icon: LayoutDashboard },
	{ label: "Manage Listings", path: "/admin/listings", icon: Building },
	{ label: "Manage Users", path: "/admin/users", icon: Users },
	{ label: "Manage Orders", path: "/admin/orders", icon: CalendarCheck },
	{ label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
	{ label: "Settings", path: "/admin/settings", icon: Settings },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const user = {
		name: "Rakeeb Hasan",
		role: "user",
	};
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const links = user?.role === "admin" ? adminLinks : userLinks;
	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<aside
				className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 ease-blueprint ${collapsed ? "w-16" : "w-64"}`}
			>
				<div className="p-4 border-b border-border flex items-center justify-between">
					{!collapsed && (
						<span className="font-display font-bold text-foreground">
							Dashboard
						</span>
					)}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
					>
						{collapsed ? (
							<ChevronRight className="h-4 w-4" />
						) : (
							<ChevronLeft className="h-4 w-4" />
						)}
					</button>
				</div>
				<nav className="flex-1 p-3 space-y-1">
					{links.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ease-blueprint ${
								pathname === link.path
									? "bg-primary/10 text-primary shadow-sm"
									: "text-muted-foreground hover:text-foreground hover:bg-muted"
							}`}
						>
							<link.icon className="h-4 w-4 shrink-0" />
							{!collapsed && <span>{link.label}</span>}
						</Link>
					))}
				</nav>
				<div className="p-3 border-t border-border">
					<Link
						href="/"
						className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
					>
						<ChevronLeft className="h-4 w-4" />
						{!collapsed && <span>Back to Home</span>}
					</Link>
				</div>
			</aside>

			{/* Mobile Overlay */}
			{mobileOpen && (
				<div className="lg:hidden fixed inset-0 z-50">
					<div
						className="absolute inset-0 bg-foreground/20"
						onClick={() => setMobileOpen(false)}
					/>
					<aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
						<div className="p-4 border-b border-border flex items-center justify-between">
							<span className="font-display font-bold text-foreground">
								Dashboard
							</span>
							<button
								onClick={() => setMobileOpen(false)}
								className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
							>
								<ChevronLeft className="h-4 w-4" />
							</button>
						</div>
						<nav className="flex-1 p-3 space-y-1">
							{links.map((link) => (
								<Link
									key={link.path}
									href={link.path}
									onClick={() => setMobileOpen(false)}
									className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
										location.pathname === link.path
											? "bg-primary/10 text-primary"
											: "text-muted-foreground hover:bg-muted"
									}`}
								>
									<link.icon className="h-4 w-4" />
									<span>{link.label}</span>
								</Link>
							))}
						</nav>
						<div className="p-3 border-t border-border">
							<Link
								href="/"
								className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted"
							>
								<ChevronLeft className="h-4 w-4" /> Back to Home
							</Link>
						</div>
					</aside>
				</div>
			)}

			{/* Main Content */}
			<main className="flex-1 bg-gray-100">
				{/* Main Content */}
				<div className="flex-1 flex flex-col min-w-0">
					<header className="h-15 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
						<div className="flex items-center gap-3">
							<button
								onClick={() => setMobileOpen(true)}
								className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
							>
								<Menu className="h-5 w-5" />
							</button>
							<h1 className="font-display font-semibold text-foreground text-lg">
								{links.find((l) => l.path === pathname)
									?.label || "Dashboard"}
							</h1>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted transition-colors">
									<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
										<span className="text-sm font-bold text-primary-foreground">
											{user?.name.charAt(0)}
										</span>
									</div>
									<span className="hidden sm:block text-sm font-medium text-foreground">
										{user?.name}
									</span>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem asChild>
									<Link
										href={
											user?.role === "admin"
												? "/admin"
												: "/dashboard/profile"
										}
										className="flex items-center gap-2 data-highlighted:bg-primary"
									>
										<User className="h-4 w-4" /> Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href={
											user?.role === "admin"
												? "/admin/settings"
												: "/dashboard/profile"
										}
										className="flex items-center gap-2 data-highlighted:bg-primary"
									>
										<Settings className="h-4 w-4" />{" "}
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="flex items-center gap-2 text-destructive data-highlighted:bg-primary">
									<LogOut className="h-4 w-4" /> Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
				</div>
				<div className="p-5">{children}</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
