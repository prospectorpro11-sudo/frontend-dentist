export interface ILink {
	href: string;
	text: string;
	icon?: string;
}

export interface IFreeSampleRow {
	specialty: string;
	email: string;
	phone: string;
	dotClass: string;
}

export interface IFreeSampleFeature {
	icon: string;
	iconClass: string;
	title: string;
	description: string;
}

export interface IProductItem {
	category: string;
	description: string;
	icon: string;
	colorClass: string;
	count: string;
}

export interface IPill {
	icon: string;
	label: string;
}

export interface IBeyondEmailStep {
	number: string;
	title: string;
	description: string;
}

export interface IBeyondEmailFeatureCard {
	id: string;
	variantClass: string;
	icon: string;
	titleLine1: string;
	titleLine2: string;
}

export interface ITableRow {
	name: string;
	initials: string;
	avatarClass: string;
	email: string;
	phone: string;
	fade?: boolean;
}

export interface IDataDescribePanel {
	heading: string;
	subtitle: string;
	label: string;
	checklist: string[];
	panelVisual: {
		title: string;
		accentColor: string;
	};
}

export interface IDataDescribeFeature {
	icon: string;
	iconClass: string;
	title: string;
	description: string;
}

export interface ILocationLegend {
	label: string;
	active: boolean;
}

export interface ILocationFooter {
	icon: string;
	text: string;
	subtext?: string;
}

export interface ILocationFeature {
	id: number;
	icon: string;
	badge: string | null;
	title: string;
	desc: string;
	linkText: string;
	linkUrl: string;
	variant?: string;
}

export interface IBannerMetric {
	icon: string;
	value: string;
	label: string;
	iconClass: string;
	highlight?: boolean;
	last?: boolean;
}

export interface IBannerPill {
	icon: string;
	value: string;
	label: string;
	className: string;
	iconClass: string;
}

export interface IFaqStat {
	icon: string;
	value: string;
	label: string;
}

export interface IFaqItem {
	question: string;
	answer: string;
}

export interface IHomeBanner {
	liveBadgeText: string;
	dateText: string;
	headingLine1: string;
	headingAccent: string;
	description: string;
	buttons: {
		pricing: ILink & { icon: string };
		sample: ILink & { icon: string };
	};
	trustItems: Array<{ icon: string; label: string; iconClass: string }>;
	metrics: IBannerMetric[];
	chamberPills: IBannerPill[];
}

export interface IFreeSample {
	heading: string;
	headingAccent: string;
	subtitle: string;
	dentistData: IFreeSampleRow[];
	features: IFreeSampleFeature[];
	cta: ILink & { icon: string };
	card: {
		accuracyPercent: string;
		cardTitle: string;
		recordCount: string;
		recordLabel: string;
		complianceText: string;
	};
}

export interface IProductList {
	heading: string;
	headingAccent: string;
	subtitle: string;
	products: IProductItem[];
	trustPills: IPill[];
}

export interface IBeyondEmail {
	sectionInfo: {
		headingLine: string;
		headingAccent: string;
		headingAccentClassName: string;
		sub: string;
	};
	steps: IBeyondEmailStep[];
	featureCards: IBeyondEmailFeatureCard[];
}

export interface IWhatsIncluded {
	checklistItems: Array<{ label: string }>;
	tableData: ITableRow[];
	footerItems: IPill[];
	stats: {
		verifiedRecords: string;
		deliveryRate: { percentage: string; label: string };
		contacts: { count: string; label: string };
		gdprCompliant: string;
	};
	content: {
		heading: string;
		headingHighlight: string;
		headingSuffix: string;
		subtitle: string;
		ctaText: string;
		websiteUrl: string;
	};
}

export interface IDataDescribe {
	topSection: {
		heading: string;
		headingLine2: string;
		subtitle: string;
		ctaText: string;
		ctaHref: string;
	};
	panelData: IDataDescribePanel[];
	featureColumns: IDataDescribeFeature[];
}

export interface ILocationSegmentation {
	content: {
		badge: string;
		title: { prefix: string; highlight: string };
		description: string;
		mapCard: {
			title: string;
			legend: ILocationLegend[];
			footer: ILocationFooter[];
		};
		features: ILocationFeature[];
	};
	mapPoints: Array<{
		coords: [number, number];
		dotType: string;
		label: string;
		card: {
			type: string;
			icon: string;
			title: string;
			count: string;
			breatheType: string;
		};
	}>;
}

export interface IFaq {
	stats: IFaqStat[];
	columns: IFaqItem[][];
}

export interface IHomeSeeds {
	homeBanner: IHomeBanner;
	freeSample: IFreeSample;
	productList: IProductList;
	beyondEmail: IBeyondEmail;
	whatsIncluded: IWhatsIncluded;
	dataDescribe: IDataDescribe;
	locationSegmentation: ILocationSegmentation;
	faq: IFaq;
}
