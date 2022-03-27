export interface Model {
  id?: string;
  name?: string;
  photoPath?: string;
}

export type ModelState = {
  displayedModelIds: { [categoryBrandId: string]: string[] };
  searchIds: string[];
  fetchRequiredModelId: string;
};
