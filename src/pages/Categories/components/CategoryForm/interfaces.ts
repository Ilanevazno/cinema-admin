export interface ValidationErrors {
  categoryName: string;
  subCategories: {
    name: string;
    films: string;
  }[];
}
