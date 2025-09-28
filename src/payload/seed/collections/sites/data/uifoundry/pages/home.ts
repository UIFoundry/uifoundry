import type { Page } from "~/payload-types";

const home: Page = {
	id: "68a54a78d816f5409031fb8a",
	title: "Home",
	showHeader: true,
	showFooter: false,
	site: "",
	owner: "",
	createdAt: new Date().toString(),
	updatedAt: new Date().toString(),
	blocks: [
		{
			blockType: "hero_1",
			alertLabel: "Introducing UIFoundry v1.0 - Now with PayloadCMS",
			alertLink: "/changelog",
			header: "The Complete PayloadCMS Kit for Modern Web Development",
			subheader:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control. From self-hosted to fully managed.",
			primaryCtaLabel: "Browse Components",
			primaryCtaHref: "/hero",
			secondaryCtaLabel: "Get Started Free",
			secondaryCtaHref: "/docs/getting-started",
			id: "68a63ed233c0b9ac86e1f04f",
		},
		{
			blockType: "features_2",
			header: "Everything You Need to Ship Fast",
			subheader:
				"Professional blocks, templates, and hosting solutions. Build stunning marketing sites with no-code ease, or customize everything with full developer control.",
			features: [
				{
					icon: "Blocks",
					header: "50+ PayloadCMS Blocks",
					description: "Production-ready components for any marketing site",
					id: "68a6808d7ca92758a0ca97d3",
				},
				{
					icon: "Zap",
					header: "One-Click Deploy",
					description: "Deploy to AWS with SST in minutes, not hours",
					id: "68a6808d7ca92758a0ca97d4",
				},
				{
					icon: "Palette",
					header: "Full Customization",
					description: "Tailwind + shadcn/ui with your design system",
					id: "68a6808d7ca92758a0ca97d5",
				},
				{
					icon: "Smartphone",
					header: "Mobile-First Design",
					description: "Responsive blocks that work perfectly on all devices",
					id: "68a6808d7ca92758a0ca97d6",
				},
				{
					icon: "Shield",
					header: "Enterprise Auth",
					description: "Better-auth integration with role-based access",
					id: "68a6808d7ca92758a0ca97d7",
				},
				{
					icon: "Rocket",
					header: "Managed Hosting",
					description: "Zero-config hosting for non-technical users",
					id: "68a6808d7ca92758a0ca97d8",
				},
			],
			id: "68a6808c7217ae0f277405a6",
		},
		{
			blockType: "pricing_1",
			header: "Choose Your Plan",
			subheader:
				"Choose the perfect plan for your needs. Get the template for self-hosting or let us handle everything with managed hosting.",
			focusIndex: 0,
			focusLabel: "Most Popular",
			tiers: [
				{
					label: "Developer",
					description:
						"Perfect for agencies and freelancers who want to ship faster",
					callToAction: "Purchase Template",
					pricing: {
						value: 299,
						annual: false,
						monthly: false,
						fixed: true,
					},
					features: [
						{
							text: "Complete PayloadCMS template",
							id: "68a6b26ae3d253a5304f4ffe",
						},
						{
							text: "50+ premium components",
							id: "68a6b26ae3d253a5304f4fff",
						},
						{
							text: "Full TypeScript source code",
							id: "68a6b26ae3d253a5304f5000",
						},
						{
							text: "AWS & Vercel deployment guides",
							id: "68a6b26ae3d253a5304f5001",
						},
						{
							text: "Comprehensive documentation",
							id: "68a6b26ae3d253a5304f5002",
						},
						{
							text: "Community support",
							id: "68a6b26ae3d253a5304f5003",
						},
						{
							text: "Free updates for 1 year",
							id: "68a6b26ae3d253a5304f5004",
						},
						{
							text: "Commercial license included",
							id: "68a6b26ae3d253a5304f5005",
						},
					],
					id: "68a6b26ae3d253a5304f5006",
				},
				{
					label: "Founder",
					description:
						"Launch without hiring developers - managed hosting included",
					callToAction: "Start Free Trial",
					pricing: {
						value: 49,
						annual: false,
						monthly: true,
						fixed: false,
					},
					features: [
						{
							text: "No-code content editing",
							id: "68a6b26ae3d253a5304f5007",
						},
						{
							text: "Managed AWS hosting",
							id: "68a6b26ae3d253a5304f5008",
						},
						{
							text: "Custom domain included",
							id: "68a6b26ae3d253a5304f5009",
						},
						{
							text: "SSL certificates & CDN",
							id: "68a6b26ae3d253a5304f500a",
						},
						{
							text: "Automatic backups",
							id: "68a6b26ae3d253a5304f500b",
						},
						{
							text: "Email support (24-48h)",
							id: "68a6b26ae3d253a5304f500c",
						},
						{
							text: "99.9% uptime SLA",
							id: "68a6b26ae3d253a5304f500d",
						},
						{
							text: "Export data anytime",
							id: "68a6b26ae3d253a5304f500e",
						},
					],
					id: "68a6b26ae3d253a5304f500f",
				},
			],
			id: "68a6b269b848f1443a4c21cc",
		},
		{
			blockType: "faq_1",
			header: "Frequently Asked Questions",
			subheader:
				"Everything you need to know about UIFoundry's developer templates and hosted solutions",
			supportLink: "/contact",
			faq: [
				{
					question: "What's included in the developer template?",
					answer:
						"You get the complete PayloadCMS template with 50+ premium components, full TypeScript source code, deployment guides for AWS/Vercel, and comprehensive documentation. Perfect for agencies and freelancers who want to ship faster.",
					id: "68a6a1dd9a2ca1d83e601915",
				},
				{
					question:
						"How is UIFoundry different from component libraries like Tailark?",
					answer:
						"While other libraries only provide components, UIFoundry includes a complete PayloadCMS backend, no-code content management, and optional managed hosting. It's a full-stack solution, not just UI components.",
					id: "68a6a1dd9a2ca1d83e601916",
				},
				{
					question: "Can I customize the hosted solution?",
					answer:
						"Yes! The hosted plan includes full access to PayloadCMS admin panel for content editing, custom domains, and theme customization. For code-level changes, you can always upgrade to the developer template.",
					id: "68a6a1dd9a2ca1d83e601917",
				},
				{
					question: "What if I outgrow the hosted plan?",
					answer:
						"You can export your content and upgrade to the developer template at any time. We provide migration guides and support to help you transition to self-hosting when you're ready to scale.",
					id: "68a6a1dd9a2ca1d83e601918",
				},
				{
					question: "Do you provide technical support?",
					answer:
						"Developer template includes documentation and community support. Hosted plans include email support with 24-48 hour response times. We also offer paid consultation for custom implementations.",
					id: "68a6a1dd9a2ca1d83e601919",
				},
				{
					question: "What's your refund policy?",
					answer:
						"We offer a 30-day money-back guarantee on the developer template. Hosted plans can be cancelled anytime with no long-term commitments required.",
					id: "68a6a1dd9a2ca1d83e60191a",
				},
			],
			id: "68a6a1db621dc185ac66e1dc",
		},
		{
			blockType: "cta_1",
			header: "Ready to Ship Your Next Project?",
			subheader:
				"Join the developers and founders building faster with UIFoundry. Choose your path and start building today.",
			actions: [
				{
					label: "Get Developer Template",
					href: "/purchase",
					id: "68a6a80585f66e7ce892311a",
				},
				{
					label: "Start Hosted Trial",
					href: "/signup",
					id: "68a6a80585f66e7ce892311b",
				},
			],
			id: "68a6a8046c03ae06dce9c52a",
		},
	],
	_status: "published",
	slug: "home",
};

export default home;
