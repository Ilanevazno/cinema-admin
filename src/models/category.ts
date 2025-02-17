export interface SubCategory {
  id?: number;
  name: string;
  filmIds: number[];
}

export interface Category {
  id?: number;
  name: string;
  subCategories: SubCategory[];
}

export interface UpdatedCategory {
  id: number;
  name: string;
  updatedSubCategories: SubCategory[];
  deletedSubCategories: SubCategory[];
}

export interface CategoryChanges {
  newCategories: Category[];
  updatedCategories: UpdatedCategory[];
  deletedCategories: { id: string }[];
}
