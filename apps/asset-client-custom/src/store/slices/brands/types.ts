export interface Brand {
  id?: string;
  name?: string;
  modelCount?: number;
  isNew?: boolean;
  inMemory?: boolean;
}

export type BrandState = {
  expandedBrandId?: string;
  brandIdToRefresh: string;
  displayedBrandIds: { [categoryId: string]: string[] };
  searchIds: string[];
};
