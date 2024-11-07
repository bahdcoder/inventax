type DateTime = string;

export type Nullable<T> = T | null;

export interface ProductFilters {
  filter: {
    name: string;
    category_id?: number;
    status: 'IN_STOCK' | 'OUT_OF_STOCK';
  };
  page: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface StatusProductCounts {
  IN_STOCK: number;
  OUT_OF_STOCK: number;
}

export interface Product {
  id: number;
  quantity: number;
  name: string;
  status: 'IN_STOCK' | 'OUT_OF_STOCK';
  category: {
    id: number;
    name: string;
  };
}

export interface PaginatedResponse<DataType> {
  data: DataType[];
  current_page: number;
  per_page: number;
  to: number;
  total: number;
  from: number;
  links: {
    url?: string;
    active: boolean;
    label: string;
  }[];
}

export type InertiaSharedProps<T = {}> = T & {
  errors: Record<string, string>;
  flash: { success?: string; error?: string };
};
