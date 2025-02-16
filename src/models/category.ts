export interface SubCategory {
  id?: number | null;
  name: string;
  filmIds: number[];
}

export interface Category {
  id?: number | null;
  name: string;
  subCategories: SubCategory[];
}

export interface UpdatedCategory {
  id: string;
  name: string;
  updatedSubCategories: SubCategory[];
  deletedSubCategories: SubCategory[];
}

export interface CategoryChanges {
  newCategories: Category[];
  updatedCategories: UpdatedCategory[];
  deletedCategories: { id: string }[];
}
