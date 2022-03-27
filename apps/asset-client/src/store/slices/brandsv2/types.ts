export interface Brand {
  id?: string;
  name?: string;
}

export type BrandState = {
  expandedBrandId?: string;
  displayedBrandIds: { [categoryId: string]: string[] };
};
