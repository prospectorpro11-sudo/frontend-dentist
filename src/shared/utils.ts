export const getCurrentYear = (): number => new Date().getFullYear();

// Parse state URL param: "AL;AK;AR" → ["AL", "AK", "AR"]
export const parseStateParam = (raw: string): string[] =>
    raw.split(";").map((s) => s.trim()).filter(Boolean);

// Parse county/jobTitle/specialty/office/association URL param (plain semicolon-joined values)
export const parseGenericParam = (raw: string): string[] =>
    raw.split(";").map((s) => s.trim()).filter(Boolean);

// Parse city URL param: "AK=anchorage-anchorage-ak;AK=juneau-juneau-ak" → ["anchorage-anchorage-ak", "juneau-juneau-ak"]
export const parseCityParam = (raw: string): string[] =>
    raw.split(";").map((item) => item.split("=").slice(1).join("=").trim()).filter(Boolean);

// Parse zip URL param: "AK=Anchorage=99502;AK=Anchorage=99510" → ["99502", "99510"]
export const parseZipParam = (raw: string): string[] =>
    raw.split(";").map((item) => item.split("=").pop()!.trim()).filter(Boolean);
