import PropertyCard from "@/components/cards/PropertyCard";
import { properties } from "@/data/properties";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PopularProperties = () => {
    const useaxios = useAxios();
    const { data: popularProperties } = useQuery({
        queryKey: ["popular"],
        queryFn: async () => {
            const res = await useaxios.get("/popular");
            return res.data.popular;
        },
    });

    return (
        <section className="py-16">
            <div className="container">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                    Popular This Month
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularProperties && popularProperties.length > 0 ? (
                        popularProperties.map((p, i: number) => (
                            <PropertyCard key={p._id} property={p} index={i} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-6">
                            No popular property found
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PopularProperties;
