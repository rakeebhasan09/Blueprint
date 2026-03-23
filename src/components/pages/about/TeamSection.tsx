import React from "react";

const teams = [
	{ name: "Elena Rodriguez", role: "CEO & Co-Founder", bg: "bg-primary" },
	{ name: "David Park", role: "CTO & Co-Founder", bg: "bg-secondary" },
	{ name: "Sarah Mitchell", role: "Head of Acquisitions", bg: "bg-accent" },
];

const TeamSection = () => {
	return (
		<section className="py-20">
			<div className="container">
				<h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
					Leadership Team
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{teams.map((member) => (
						<div key={member.name} className="text-center">
							<div
								className={`h-32 w-32 rounded-full ${member.bg} mx-auto mb-4 flex items-center justify-center`}
							>
								<span className="text-4xl font-display font-bold text-primary-foreground">
									{member.name.charAt(0)}
								</span>
							</div>
							<h3 className="font-display font-bold text-foreground">
								{member.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								{member.role}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
