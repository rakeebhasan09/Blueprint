import PropertyCard from "@/components/cards/PropertyCard";
import PropertyCardSkeleton from "@/components/Skeletons/PropertyCardSkeleton";
import { type Property } from "@/data/properties";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedProperties = () => {
<<<<<<< HEAD
	const [loading, setLoading] = useState(true);
	const useaxios = useAxios();
	const { data: featuredProperties = [] as Array<Property> } = useQuery({
		queryKey: ["featured"],
		queryFn: async () => {
			const res = await useaxios.get("/featured");
			return res.data.featured as Property[];
		},
	});
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<section className="py-16 bg-muted/30">
			<div className="container">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
							Featured Properties
						</h2>
						<p className="text-muted-foreground mt-1">
							Handpicked architectural masterpieces
						</p>
					</div>
					<Link
						href="/explore"
						className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
					>
						View All <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{loading
						? Array.from({ length: 4 }).map((_, i) => (
								<PropertyCardSkeleton key={i} />
							))
						: featuredProperties.map((p, i: number) => (
								<PropertyCard
									key={p._id}
									property={p}
									index={i}
								/>
							))}
				</div>
			</div>
		</section>
	);
=======
    const [loading, setLoading] = useState(true);
    const useaxios = useAxios();
    const { data: featuredProperties = [] } = useQuery({
        queryKey: ["featured"],
        queryFn: async () => {
            const res = await useaxios.get("/featured");
            return res.data.featured;
        },
    });
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section className="py-16 bg-muted/30">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                            Featured Properties
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Handpicked architectural masterpieces
                        </p>
                    </div>
                    <Link
                        href="/explore"
                        className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <PropertyCardSkeleton key={i} />
                          ))
                        : featuredProperties.map((p: any, i: number) => (
                              <PropertyCard
                                  key={p._id}
                                  property={p}
                                  index={i}
                              />
                          ))}
                </div>
            </div>
        </section>
    );
>>>>>>> af4d07c749c66f7c937ad0761a0e1722656b6b59
};

export default FeaturedProperties;
