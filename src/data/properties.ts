export interface Property {
	_id: string;
	title: string;
	description: string;
	price: number;
	location: string;
	city: string;
	bedrooms: number;
	bathrooms: number;
	sqft: number;
	type: string;
	status: "For Sale" | "For Rent" | "Sold";
	rating: number;
	reviews: number;
	image: string;
	images: string[];
	features: string[];
	yearBuilt: number;
	agent: string;
	date: string;
}

export const properties: Property[] = [
	{
		_id: "1",
		title: "Modern Glass Villa",
		description:
			"A stunning contemporary glass villa with panoramic ocean views, featuring open-plan living spaces, a private infinity pool, and sustainable architecture that harmonizes with the coastal landscape. Floor-to-ceiling windows flood every room with natural light, creating a seamless indoor-outdoor living experience.",
		price: 2450000,
		location: "123 Coastal Drive",
		city: "Malibu, CA",
		bedrooms: 5,
		bathrooms: 4,
		sqft: 4200,
		type: "Villa",
		status: "For Sale",
		rating: 4.9,
		reviews: 24,
		image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
			"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
		],
		features: [
			"Infinity Pool",
			"Smart Home",
			"Wine Cellar",
			"Home Theater",
			"3-Car Garage",
		],
		yearBuilt: 2022,
		agent: "Sarah Mitchell",
		date: "2024-01-15",
	},
	{
		_id: "2",
		title: "Brutalist Penthouse Loft",
		description:
			"An architectural masterpiece in the heart of downtown Manhattan, this brutalist-inspired penthouse features exposed concrete walls, 20-foot ceilings, and a private rooftop terrace with skyline views. Industrial elegance meets luxury living.",
		price: 3800000,
		location: "88 Wall Street",
		city: "New York, NY",
		bedrooms: 3,
		bathrooms: 3,
		sqft: 3100,
		type: "Penthouse",
		status: "For Sale",
		rating: 4.8,
		reviews: 18,
		image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
			"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
		],
		features: [
			"Rooftop Terrace",
			"Concierge",
			"Gym",
			"Doorman",
			"City Views",
		],
		yearBuilt: 2021,
		agent: "James Chen",
		date: "2024-02-20",
	},
	{
		_id: "3",
		title: "Mid-Century Ranch Estate",
		description:
			"A beautifully restored mid-century modern ranch home set on two acres of manicured gardens. Original terrazzo floors, floor-to-ceiling glass walls, and a resort-style pool make this a true architectural gem.",
		price: 1850000,
		location: "456 Palm Canyon",
		city: "Palm Springs, CA",
		bedrooms: 4,
		bathrooms: 3,
		sqft: 3400,
		type: "House",
		status: "For Sale",
		rating: 4.7,
		reviews: 31,
		image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
			"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
		],
		features: [
			"Pool",
			"Guest House",
			"Mountain Views",
			"Solar Panels",
			"Xeriscaping",
		],
		yearBuilt: 1962,
		agent: "Maria Gonzalez",
		date: "2024-03-10",
	},
	{
		_id: "4",
		title: "Victorian Brownstone",
		description:
			"A meticulously renovated four-story Victorian brownstone in historic Beacon Hill. Original crown moldings, marble fireplaces, and a private garden courtyard blend with modern amenities for timeless living.",
		price: 4200000,
		location: "12 Beacon Street",
		city: "Boston, MA",
		bedrooms: 6,
		bathrooms: 5,
		sqft: 5600,
		type: "House",
		status: "For Sale",
		rating: 4.9,
		reviews: 12,
		image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
			"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
		],
		features: [
			"Garden",
			"Fireplace",
			"Wine Room",
			"Library",
			"Period Details",
		],
		yearBuilt: 1890,
		agent: "Robert Hayes",
		date: "2024-01-28",
	},
	{
		_id: "5",
		title: "Waterfront Modern Condo",
		description:
			"Sleek waterfront condo with floor-to-ceiling windows overlooking the marina. Open concept kitchen with Italian cabinetry and Calacatta marble countertops. Resort-style amenities including pool, spa, and private dock access.",
		price: 1250000,
		location: "200 Marina Blvd",
		city: "Miami, FL",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 1800,
		type: "Condo",
		status: "For Rent",
		rating: 4.6,
		reviews: 42,
		image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
			"https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
		],
		features: [
			"Marina Access",
			"Pool",
			"Spa",
			"Fitness Center",
			"Valet Parking",
		],
		yearBuilt: 2023,
		agent: "Lisa Park",
		date: "2024-04-05",
	},
	{
		_id: "6",
		title: "Mountain Retreat Cabin",
		description:
			"A luxury mountain cabin crafted from reclaimed timber and stone. Vaulted ceilings with exposed beams, a grand stone fireplace, and wraparound deck with mountain views. Perfect blend of rustic charm and modern comfort.",
		price: 975000,
		location: "789 Summit Trail",
		city: "Aspen, CO",
		bedrooms: 4,
		bathrooms: 3,
		sqft: 2800,
		type: "House",
		status: "For Sale",
		rating: 4.8,
		reviews: 15,
		image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
			"https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
		],
		features: [
			"Fireplace",
			"Hot Tub",
			"Ski Access",
			"Heated Garage",
			"Mountain Views",
		],
		yearBuilt: 2019,
		agent: "Tom Bradley",
		date: "2024-02-14",
	},
	{
		_id: "7",
		title: "Art Deco Apartment",
		description:
			"Exquisite Art Deco apartment in a landmark building featuring original geometric tile work, curved walls, and a sunken living room. Recently updated with a chef's kitchen and spa bathroom while preserving its 1930s glamour.",
		price: 1650000,
		location: "500 Wilshire Blvd",
		city: "Los Angeles, CA",
		bedrooms: 3,
		bathrooms: 2,
		sqft: 2200,
		type: "Apartment",
		status: "For Sale",
		rating: 4.5,
		reviews: 28,
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
			"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
		],
		features: [
			"Doorman",
			"Rooftop Pool",
			"Valet",
			"Art Deco Details",
			"City Views",
		],
		yearBuilt: 1932,
		agent: "Diana Ross",
		date: "2024-03-22",
	},
	{
		_id: "8",
		title: "Sustainable Smart Home",
		description:
			"Net-zero energy smart home built with sustainable materials and cutting-edge technology. Solar roof, geothermal heating, rainwater harvesting, and a Tesla Powerwall. Every system controlled via integrated home automation.",
		price: 1980000,
		location: "321 Green Valley Rd",
		city: "Austin, TX",
		bedrooms: 4,
		bathrooms: 3,
		sqft: 3000,
		type: "House",
		status: "For Sale",
		rating: 4.9,
		reviews: 9,
		image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
		],
		features: [
			"Solar Roof",
			"EV Charging",
			"Smart Home",
			"Garden",
			"Net-Zero",
		],
		yearBuilt: 2024,
		agent: "Kevin Nguyen",
		date: "2024-04-18",
	},
];

export const categories = [
	{ name: "Modernist", icon: "🏛️", count: 42 },
	{ name: "Brutalist", icon: "🏗️", count: 18 },
	{ name: "Victorian", icon: "🏘️", count: 35 },
	{ name: "Penthouse", icon: "🏙️", count: 24 },
	{ name: "Waterfront", icon: "🌊", count: 31 },
	{ name: "Mountain", icon: "⛰️", count: 19 },
	{ name: "Art Deco", icon: "✨", count: 15 },
	{ name: "Sustainable", icon: "🌱", count: 27 },
];

export const stats = [
	{ label: "Average Yield", value: "6.4%", change: "+0.8%" },
	{ label: "Active Listings", value: "1,420", change: "+124" },
	{ label: "Cities Covered", value: "12", change: "+3" },
	{ label: "Client Satisfaction", value: "98%", change: "+2%" },
];

export const testimonials = [
	{
		name: "Alexander Chen",
		role: "CEO, Meridian Capital",
		text: "The Blueprint helped us acquire three landmark properties in Manhattan. Their market intelligence is unmatched.",
		rating: 5,
	},
	{
		name: "Sophia Laurent",
		role: "Principal, Laurent Architecture",
		text: "As an architect, I appreciate their eye for structural quality. Every listing meets exacting standards.",
		rating: 5,
	},
	{
		name: "Marcus Williams",
		role: "Private Investor",
		text: "4.8% appreciation on my portfolio in Q3 alone. The data-driven approach delivers real results.",
		rating: 5,
	},
	{
		name: "Sophia Martinez",
		role: "Founder, Urban Nest Realty",
		text: "Working with The Blueprint was a game changer. Their strategic insights helped us close high-value deals faster than ever.",
		rating: 5,
	},
	{
		name: "Liam O’Connor",
		role: "Managing Director, Apex Developments",
		text: "Their team understands the market deeply. Every recommendation was data-driven and incredibly effective.",
		rating: 4,
	},
	{
		name: "Aisha Rahman",
		role: "Head of Investments, Greenfield Group",
		text: "From consultation to execution, everything was seamless. We saw a significant return on our property investments.",
		rating: 5,
	},
	{
		name: "Daniel Kim",
		role: "COO, Skyline Ventures",
		text: "Professional, reliable, and highly knowledgeable. The Blueprint exceeded our expectations at every stage.",
		rating: 5,
	},
	{
		name: "Emily Carter",
		role: "Real Estate Consultant, Prime Estates",
		text: "Their expertise in premium property markets is outstanding. I would highly recommend them to serious investors.",
		rating: 4,
	},
];

export const blogPosts = [
	{
		id: "1",
		title: "The Rise of Brutalist Architecture in Urban Living",
		excerpt:
			"How raw concrete and exposed structures are redefining luxury residential design in major cities.",
		image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
		author: "James Chen",
		date: "2024-03-15",
		category: "Architecture",
	},
	{
		id: "2",
		title: "Investment Guide: Waterfront Properties in 2024",
		excerpt:
			"Market analysis reveals waterfront properties outperform urban condos by 12% in annual returns.",
		image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
		author: "Sarah Mitchell",
		date: "2024-03-08",
		category: "Investment",
	},
	{
		id: "3",
		title: "Smart Homes: The Technology Behind Net-Zero Living",
		excerpt:
			"From solar roofs to geothermal systems, how technology is making sustainable luxury accessible.",
		image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1165",
		author: "Kevin Nguyen",
		date: "2024-02-28",
		category: "Technology",
	},
];

export interface Review {
	id: string;
	propertyId: string;
	userName: string;
	rating: number;
	comment: string;
	date: string;
}

export const reviews: Review[] = [
	{
		id: "r1",
		propertyId: "1",
		userName: "Michael Torres",
		rating: 5,
		comment:
			"Absolutely breathtaking property. The ocean views are even better in person.",
		date: "2024-02-10",
	},
	{
		id: "r2",
		propertyId: "1",
		userName: "Emma Watson",
		rating: 5,
		comment:
			"The architectural design is world-class. Every detail has been considered.",
		date: "2024-01-25",
	},
	{
		id: "r3",
		propertyId: "2",
		userName: "David Kim",
		rating: 4,
		comment:
			"Stunning penthouse with incredible city views. The exposed concrete adds real character.",
		date: "2024-03-05",
	},
	{
		id: "r4",
		propertyId: "3",
		userName: "Rachel Green",
		rating: 5,
		comment:
			"Mid-century perfection. The terrazzo floors are original and immaculate.",
		date: "2024-03-18",
	},
];

export interface User {
	id: string;
	name: string;
	email: string;
	role: "user" | "manager" | "admin";
	avatar: string;
	joined: string;
	bookings: number;
}

export const mockUsers: User[] = [
	{
		id: "u1",
		name: "John Doe",
		email: "john@example.com",
		role: "user",
		avatar: "",
		joined: "2024-01-10",
		bookings: 3,
	},
	{
		id: "u2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "manager",
		avatar: "",
		joined: "2024-02-15",
		bookings: 1,
	},
	{
		id: "u3",
		name: "Admin User",
		email: "admin@blueprint.com",
		role: "admin",
		avatar: "",
		joined: "2023-12-01",
		bookings: 0,
	},
	{
		id: "u4",
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "user",
		avatar: "",
		joined: "2024-03-01",
		bookings: 5,
	},
	{
		id: "u5",
		name: "Bob Wilson",
		email: "bob@example.com",
		role: "user",
		avatar: "",
		joined: "2024-01-20",
		bookings: 2,
	},
];

export interface TAddProperty {
	title: string;
	description: string;
	type: string;
	status: string;
	location: string;
	city: string;
	price: number;
	yearBuilt: number;
	agent: string;
	bedrooms: number;
	bathrooms: number;
	features: string[];
	sqft: number;
	image: string;
	images: string[];
}
