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

export interface IStat {
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
	stats: IStat[];
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

export interface IProductListItem {
	id: string;
	name: string;
	npis: number;
	emails: number;
	phones: number;
	faxes: number;
	licenses: number;
	color: "rose" | "teal" | "blue" | "amber" | "indigo" | "emerald";
	tags: Array<"hot" | "popular" | "new" | "verified">;
	cat: string;
};

export interface IWhatsIncludedDetailsTag {
	id: number;
	label: string;
	removable: boolean;
	variant: string;
}

export interface IWhatsIncludedDetailsSection {
	label: string;
	tags: IWhatsIncludedDetailsTag[];
}

export interface IWhatsIncludedDetailsDentist {
	id: number;
	initials: string;
	name: string;
	specialty: string;
	verified: boolean;
	avatarVariant: string;
}

export interface IWhatsIncludedDetailsCard {
	id: number;
	title: string;
	titleSuffix: string;
	description: string;
	isLast: boolean;
}

export interface IWhatsIncludedDetailsSeed {
	header: {
		title: string;
		description: string;
	};
	buildListTitle: string;
	filterSections: IWhatsIncludedDetailsSection[];
	dentistData: IWhatsIncludedDetailsDentist[];
	loadingContent: {
		text: string;
		count: string;
		suffix: string;
	};
	personalizeTitle: string;
	personalizeSections: IWhatsIncludedDetailsSection[];
	verifiedTitle: string;
	dataCards: IWhatsIncludedDetailsCard[];
	footerStats: string[];
}

export interface IProductPriceTier {
	leads: string;
	costPerLead: string;
	totalPrice: string;
	isPopular?: boolean;
}

export interface IProductPriceField {
	label: string;
	fullWidth?: boolean;
}

export interface IProductPriceBadge {
	label: string;
	icon: string;
}

export interface IProductPriceListSeed {
	content: {
		title: string;
		description: string;
		tableTitle: string;
		tableSubtitle: string;
		tableHeaders: string[];
		tabs: string[];
		includedTitle: string;
		starterOfferTitle: string;
		starterSubtitle: string;
		starterLeads: string;
		starterLeadsLabel: string;
		starterPrice: string;
		starterDescription: string;
		starterButtonLabel: string;
		guaranteeLabel: string;
		footerBulkPricing: string;
	};
	pricingTiers: IProductPriceTier[];
	includedDataFields: IProductPriceField[];
	trustBadges: IProductPriceBadge[];
}

export interface ICustomDentistListStep {
	id: number;
	title: string;
	desc: string;
	color: string;
}

export interface ICustomDentistListFeature {
	title: string;
	desc: string;
	color: string;
	icon: string;
}

export interface ICustomDentistListFilterItem {
	title: string;
	desc: string;
	color: string;
	bg: string;
	icon: string;
}

export interface ICustomDentistListSeed {
	header: {
		title: string;
		highlight: string;
		subtitle: string;
	};
	howItWorks: {
		title: string;
		steps: ICustomDentistListStep[];
	};
	features: ICustomDentistListFeature[];
	smartFilters: {
		title: string;
		items: ICustomDentistListFilterItem[];
	};
}

export interface IWhyChooseUsItem {
	title: string;
	desc: string;
	icon: string;
	delayClass?: string;
	positionClass?: string;
	subtitle?: string;
}

export interface IWhyChooseUsField {
	label: string;
	value: string;
	icon: string;
	masked?: boolean;
	danger?: boolean;
}

export interface IWhyChooseUsAction {
	label: string;
	icon: string;
	secondary?: boolean;
}

export interface IWhyChooseUsSeed {
	content: {
		badge: string;
		title: string;
		highlight: string;
		subtitle: string;
		profile: {
			initials: string;
			name: string;
			specialty: string;
			status: string;
		};
	};
	painPoints: IWhyChooseUsItem[];
	floatingBadges: IWhyChooseUsItem[];
	mockupFields: IWhyChooseUsField[];
	mockupActions: IWhyChooseUsAction[];
}

export interface IDentalSpecialtyCard {
	id: string;
	title: string;
	description: string;
	icon: string;
	iconColor: "blue" | "teal" | "indigo" | "amber";
	contactCount: string;
	verificationRate: string;
}

export interface IDentalSpecialtySeed {
	content: {
		sectionTitle: string;
		sectionTitleAccent: string;
		sectionSubtitle: string;
		ctaTitle: string;
		ctaDescription: string;
		ctaButtonText: string;
	};
	specialtyCards: IDentalSpecialtyCard[];
}

export interface ICrmIntegrationSeed {
	left: {
		chips: string[];
		headerTitle: string;
		headerSubtitle: string;
		dataPanelTitle: string;
		contacts: Array<{ initials: string; name: string; color: "blue" | "teal" | "indigo" }>;
		csvText: string;
		integrationPanelTitle: string;
		platforms: Array<{ name: string; icon: string; color: "sf" | "hub" | "mc" }>;
		featuresFooter: string[];
	};
	right: {
		title: string;
		titleAccent: string;
		description1: string;
		description2: string;
		buttonText: string;
	};
}

export interface IVerifiedSourceItem {
	label: string;
	color: "blue" | "teal" | "indigo" | "amber" | "emerald";
	iconClass?: string;
}

export interface IVerifiedSourceSeed {
	content: {
		badge: string;
		title: string;
		titleAccent: string;
		subtitle: string;
		sourcesListTitle: string;
		ctaText: string;
		diagramLabel: string;
	};
	sourceNodes: IVerifiedSourceItem[];
	verifiedDataSources: IVerifiedSourceItem[];
}

export interface IDataBeneficiaryNode {
	iconClass: string;
	label: string;
	color: "blue" | "teal" | "indigo" | "amber" | "emerald" | "rose";
	positionClass: "node1" | "node2" | "node3" | "node4" | "node5" | "node6";
}

export interface IDataBeneficiariesSeed {
	content: {
		title: string;
		titleAccent: string;
		titleSuffix: string;
		subtitle: string;
		dataHubText: string;
	};
	nodes: IDataBeneficiaryNode[];
	bgVariant?: "white" | "fill";
}

export interface IComparisonRow {
	feature: string;
	featureIcon: string;
	featureColor: "blue" | "teal" | "indigo" | "emerald" | "amber" | "rose";
	oursStatus: "yes" | "no" | "soon";
	oursLabel: string;
	oursDetail?: string;
	otherLabel: string;
	otherDetail?: string;
}

export interface IComparisonTableSeed {
	content: {
		badge: string;
		title: string;
		titleAccent: string;
		subtitle: string;
		featuresHeader: string;
		recommendedLabel: string;
		oursTitle: string;
		oursSubtitle: string;
		othersTitle: string;
		othersSubtitle: string;
		ctaTitle: string;
		ctaDescription: string;
		ctaButtonText: string;
	};
	rows: IComparisonRow[];
}

export interface IAboutTrustCard {
	iconClass: string;
	title: string;
	description: string;
	color: "blue" | "teal" | "indigo";
}

export interface IAboutStatCard {
	iconClass: string;
	value: string;
	label: string;
	color: "blue" | "teal" | "indigo" | "emerald";
	positionClass: "card1" | "card2" | "card3" | "card4";
}

export interface IAboutCategory {
	name: string;
	color: "blue" | "teal" | "indigo" | "amber" | "emerald" | "rose";
}

export interface IAboutDentistEmailListSeed {
	content: {
		title: string;
		titleAccent: string;
		subtitle: string;
		mockupTitle: string;
		mockupSubtitle: string;
		verifyTitle: string;
		verifySubtitle: string;
		verifyBadge: string;
		ctaButtonText: string;
	};
	trustCards: IAboutTrustCard[];
	statCards: IAboutStatCard[];
	categories: IAboutCategory[];
}
export interface IBuilFilteList {
	field: string;
	value: string | null;
}
export interface ICartItem {
	id: string;
	productName: string;
	contacts: number;
	price: number;
	databaseMainType?: "DATABASE_MAIN_TYPES" | null;
	filterItems?: IBuilFilteList[] | null;
}

export interface IProspectorFilter {
	id: string;
	modifiedLabel?: string;
	label: string;
	value: string;
	city?: string;
	state?: string;
	category?: string;
	subCategory?: string;
}
export interface InitialProspectorFilters {
	states?: IProspectorFilter[];
	counties?: IProspectorFilter[];
	cities?: IProspectorFilter[];
	zipCodes?: IProspectorFilter[];
	jobTitles?: IProspectorFilter[];
	specialties?: IProspectorFilter[];
	offices?: IProspectorFilter[];
	gender?: IProspectorFilter[];
	// associations?: IProspectorFilter[];
	licenseStates?: IProspectorFilter[];
};
export interface IProspectorStats {
	totalContacts: number;
	Unique_Emails: number;
	Unique_Phones: number;
	Unique_Faxes: number;
	Unique_License_Numbers: number;
	Unique_NPI: number;
}

export interface IProspectorData {
	NPI: null | string;
	"Full Name": string;
	"First Name": string;
	"Middle Name": null | string;
	"Last Name": string;
	Email: string;
	Suffix: null | string;
	Title: null | string;
	Gender: string;
	"Specialty Code": string;
	Specialty: string;
	Specialty2: null | string;
	Address1: string;
	Address2: null | string;
	City: string;
	State: string;
	"Zip Code": string;
	Phone: string;
	Fax: string;
	"License Number": null | string;
	"License State": string;
	Certifications: null | string;
	Category: string;
	Address: string;
	FullName: string;
	County?: string | null;
	Office?: string | null;
	"Cell Number"?: string | null;
	"Cell Numbers"?: string | null;
}

export interface IUserPrivateInfo {
	country_code: string;
	country_name: string;
	city: string;
	postal: string;
	latitude: number;
	longitude: number;
	IPv4: string;
	state: string;
}