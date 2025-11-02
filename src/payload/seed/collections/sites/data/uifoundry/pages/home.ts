import type { Page } from "~/payload-types";

const home: Page = {
	id: "68a54a78d816f5409031fb8a",
	name: "UIFoundry Home",
	_status: "published",
	blocks: [
		{
			id: "68a63ed233c0b9ac86e1f04f",
			alertLabel: "Introducing UIFoundry v1.0 - Now with PayloadCMS",
			alertLink: "/changelog",
			blockType: "hero_1",
			header: "The Complete PayloadCMS Kit for Modern Web Development",
			primaryCtaHref: "/hero",
			primaryCtaLabel: "Browse Components",
			secondaryCtaHref: "/docs/getting-started",
			secondaryCtaLabel: "Get Started Free",
			subheader:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control. From self-hosted to fully managed.",
		},
		{
			id: "68a6808c7217ae0f277405a6",
			blockType: "features_2",
			features: [
				{
					id: "68a6808d7ca92758a0ca97d3",
					description: "Production-ready components for any marketing site",
					header: "50+ PayloadCMS Blocks",
					icon: "Blocks",
				},
				{
					id: "68a6808d7ca92758a0ca97d4",
					description: "Deploy to AWS with SST in minutes, not hours",
					header: "One-Click Deploy",
					icon: "Zap",
				},
				{
					id: "68a6808d7ca92758a0ca97d5",
					description: "Tailwind + shadcn/ui with your design system",
					header: "Full Customization",
					icon: "Palette",
				},
				{
					id: "68a6808d7ca92758a0ca97d6",
					description: "Responsive blocks that work perfectly on all devices",
					header: "Mobile-First Design",
					icon: "Smartphone",
				},
				{
					id: "68a6808d7ca92758a0ca97d7",
					description: "Better-auth integration with role-based access",
					header: "Enterprise Auth",
					icon: "Shield",
				},
				{
					id: "68a6808d7ca92758a0ca97d8",
					description: "Zero-config hosting for non-technical users",
					header: "Managed Hosting",
					icon: "Rocket",
				},
			],
			header: "Everything You Need to Ship Fast",
			subheader:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control.",
		},
		{
			id: "68a6b269b848f1443a4c21cc",
			blockType: "pricing_1",
			config: {
				focusIndex: 0,
				focusLabel: "Most Popular",
			},
			header: "Choose Your Plan",
			subheader:
				"Choose the perfect plan for your needs. Get the template for self-hosting or let us handle everything with managed hosting.",
			tiers: [
				{
					id: "68a6b26ae3d253a5304f5006",
					callToAction: "Purchase Template",
					description:
						"Perfect for agencies and freelancers who want to ship faster",
					features: [
						{
							id: "68a6b26ae3d253a5304f4ffe",
							text: "Complete PayloadCMS template",
						},
						{
							id: "68a6b26ae3d253a5304f4fff",
							text: "50+ premium components",
						},
						{
							id: "68a6b26ae3d253a5304f5000",
							text: "Full TypeScript source code",
						},
						{
							id: "68a6b26ae3d253a5304f5001",
							text: "AWS & Vercel deployment guides",
						},
						{
							id: "68a6b26ae3d253a5304f5002",
							text: "Comprehensive documentation",
						},
						{
							id: "68a6b26ae3d253a5304f5003",
							text: "Community support",
						},
						{
							id: "68a6b26ae3d253a5304f5004",
							text: "Free updates for 1 year",
						},
						{
							id: "68a6b26ae3d253a5304f5005",
							text: "Commercial license included",
						},
					],
					label: "Developer",
					pricing: {
						annual: false,
						fixed: true,
						monthly: false,
						value: 299,
					},
				},
				{
					id: "68a6b26ae3d253a5304f500f",
					callToAction: "Start Free Trial",
					description:
						"Launch without hiring developers - managed hosting included",
					features: [
						{
							id: "68a6b26ae3d253a5304f5007",
							text: "No-code content editing",
						},
						{
							id: "68a6b26ae3d253a5304f5008",
							text: "Managed AWS hosting",
						},
						{
							id: "68a6b26ae3d253a5304f5009",
							text: "Custom domain included",
						},
						{
							id: "68a6b26ae3d253a5304f500a",
							text: "SSL certificates & CDN",
						},
						{
							id: "68a6b26ae3d253a5304f500b",
							text: "Automatic backups",
						},
						{
							id: "68a6b26ae3d253a5304f500c",
							text: "Email support (24-48h)",
						},
						{
							id: "68a6b26ae3d253a5304f500d",
							text: "99.9% uptime SLA",
						},
						{
							id: "68a6b26ae3d253a5304f500e",
							text: "Export data anytime",
						},
					],
					label: "Founder",
					pricing: {
						annual: false,
						fixed: false,
						monthly: true,
						value: 49,
					},
				},
			],
		},
		{
			id: "68a6a1db621dc185ac66e1dc",
			blockType: "faq_1",
			faq: [
				{
					id: "68a6a1dd9a2ca1d83e601915",
					answer:
						"You get the complete PayloadCMS template with 50+ premium components, full TypeScript source code, deployment guides for AWS/Vercel, and comprehensive documentation. Perfect for agencies and freelancers who want to ship faster.",
					question: "What's included in the developer template?",
				},
				{
					id: "68a6a1dd9a2ca1d83e601916",
					answer:
						"While other libraries only provide components, UIFoundry includes a complete PayloadCMS backend, no-code content management, and optional managed hosting. It's a full-stack solution, not just UI components.",
					question:
						"How is UIFoundry different from component libraries like Tailark?",
				},
				{
					id: "68a6a1dd9a2ca1d83e601917",
					answer:
						"Yes! The hosted plan includes full access to PayloadCMS admin panel for content editing, custom domains, and theme customization. For code-level changes, you can always upgrade to the developer template.",
					question: "Can I customize the hosted solution?",
				},
				{
					id: "68a6a1dd9a2ca1d83e601918",
					answer:
						"You can export your content and upgrade to the developer template at any time. We provide migration guides and support to help you transition to self-hosting when you're ready to scale.",
					question: "What if I outgrow the hosted plan?",
				},
				{
					id: "68a6a1dd9a2ca1d83e601919",
					answer:
						"Developer template includes documentation and community support. Hosted plans include email support with 24-48 hour response times. We also offer paid consultation for custom implementations.",
					question: "Do you provide technical support?",
				},
				{
					id: "68a6a1dd9a2ca1d83e60191a",
					answer:
						"We offer a 30-day money-back guarantee on the developer template. Hosted plans can be cancelled anytime with no long-term commitments required.",
					question: "What's your refund policy?",
				},
			],
			header: "Frequently Asked Questions",
			subheader:
				"Everything you need to know about UIFoundry's developer templates and hosted solutions",
			supportLink: "/contact",
		},
		{
			id: "68a6a8046c03ae06dce9c52a",
			actions: [
				{
					id: "68a6a80585f66e7ce892311a",
					href: "/purchase",
					label: "Get Developer Template",
				},
				{
					id: "68a6a80585f66e7ce892311b",
					href: "/signup",
					label: "Start Hosted Trial",
				},
			],
			blockType: "cta_1",
			header: "Ready to Ship Your Next Project?",
			subheader:
				"Join the developers and founders building faster with UIFoundry. Choose your path and start building today.",
		},
	],
	createdAt: new Date().toString(),
	owner: "",
	updatedAt: new Date().toString(),
};

export default home;
