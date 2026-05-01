import { IDownloadInfo } from "./interface";

export type TNavItem = {
    label: string;
    description?: string;
    url: string;
    icon: string;
    isProtected?: boolean;
};

export type DataFieldKey =
    | "npi"
    | "fullName"
    | "firstName"
    | "middleName"
    | "lastName"
    | "email"
    | "suffix"
    | "title"
    | "gender"
    | "specialtyCode"
    | "specialty"
    | "specialty2"
    | "address1"
    | "address2"
    | "city"
    | "state"
    | "zipCode"
    | "phone"
    | "fax"
    | "licenseNumber"
    | "licenseState"
    | "certifications"
    | "category"
    | "address"
    | "county"
    | "office"
    | "cellNumber"
    | "cellNumbers";

export type SheetRowData = Record<DataFieldKey, string>;

export type SheetColumn = {
    key: DataFieldKey;
    label: string;
    letter: string;
    width: number;
};

export type SheetRow = {
    rowNumber: number;
    values: SheetRowData;
};

export type CellPosition = {
    row: number;
    column: number;
};


export type FilterOption = Record<string, string | number | boolean | null | undefined> & {
    label: string;
    value: string;
};

export type RawFilterApiResponse = {
    data?: FilterOption[];
    page?: number | string;
    totalPages?: number | string;
    hasNextPage?: boolean | string | number;
};

export type FilterApiResponse = {
    data: FilterOption[];
    page: number;
    totalPages: number;
    hasNextPage: boolean;
};

export type IOption = { label: string; value: string; filterValue: string; name: string; link: IDownloadInfo | null };