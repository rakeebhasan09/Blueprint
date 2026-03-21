import { testimonials } from "@/data/properties";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
	return (
		<section className="py-16 bg-muted/30">
			<div className="container">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
					What Our Clients Say
				</h2>
				<Swiper
					className="mySwiper"
					modules={[Autoplay]}
					slidesPerView={1}
					spaceBetween={20}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					speed={1000}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 3,
						},
					}}
				>
					{testimonials.map((t) => (
						<SwiperSlide key={t.name}>
							<div className="p-8 rounded-2xl bg-card shadow-card border border-border/50">
								<div className="flex gap-1 mb-4">
									{Array.from({ length: t.rating }).map(
										(_, j) => (
											<Star
												key={j}
												className="h-4 w-4 text-accent fill-accent"
											/>
										),
									)}
								</div>
								<p className="text-foreground leading-relaxed mb-6 italic">
									&quot;{t.text}&quot;
								</p>
								<div>
									<div className="font-display font-semibold text-foreground">
										{t.name}
									</div>
									<div className="text-sm text-muted-foreground">
										{t.role}
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Testimonials;
