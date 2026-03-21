import { blogPosts } from "@/data/properties";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSection = () => {
	return (
		<section className="py-16">
			<div className="container">
				<div className="flex items-center justify-between mb-8">
					<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
						Latest Insights
					</h2>
					<Link
						href="/blog"
						className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
					>
						View All <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{blogPosts.map((post) => (
						<div
							key={post.id}
							className="group rounded-2xl bg-card shadow-card border border-border/50 overflow-hidden hover:shadow-elevated transition-all duration-300 ease-blueprint"
						>
							<div className="aspect-video overflow-hidden">
								<Image
									width={3000}
									height={600}
									src={post.image}
									alt={post.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
								/>
							</div>
							<div className="p-6">
								<span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
									{post.category}
								</span>
								<h3 className="font-display font-bold text-foreground mt-3 mb-2 line-clamp-2">
									{post.title}
								</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 mb-4">
									{post.excerpt}
								</p>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<span>{post.author}</span>
									<span>
										{new Date(
											post.date,
										).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
