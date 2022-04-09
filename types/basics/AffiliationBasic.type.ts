import { Dayjs } from "dayjs";

export type AffiliationBasicType = {
    id?: number | null;
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    country?: string | null;
    imageUrl?: string | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
}