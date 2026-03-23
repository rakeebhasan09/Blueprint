"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";

const RootLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	// যেসব route এ header/footer hide হবে
	const hideLayout = ["/login", "/register"].includes(pathname);

	return (
		<div className="flex flex-col">
			{!hideLayout && (
				<header className="sticky top-0 z-50 w-full">
					<Header />
				</header>
			)}

			<main className="grow">{children}</main>

			{!hideLayout && (
				<footer>
					<Footer />
				</footer>
			)}
		</div>
	);
};

export default RootLayoutWrapper;
