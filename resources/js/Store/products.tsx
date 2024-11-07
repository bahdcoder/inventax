import React, { Dispatch, SetStateAction, useContext } from 'react';
import { pickValidObjectProperties } from '@/helpers/pickValidObjectProperties';
import {
  Category,
  PaginatedResponse,
  Product,
  ProductFilters,
  StatusProductCounts,
} from '@/types';
import { router } from '@inertiajs/react';
import { useDebounce } from '@react-hook/debounce';
import { createContext, PropsWithChildren, useEffect, useRef } from 'react';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import useTypedPage from '@/Hooks/useTypedPage';

export interface ProductFilterState {
  name: string;
  page: number;
  category?: number;
  status?: ProductFilters['filter']['status'];
}

export interface ProductsPageServerProps {
  products: PaginatedResponse<Product>;
  filters: ProductFilters;
  status_counts: StatusProductCounts;
  active_category: Category | null;
}

export interface ProductsContextInterface {
  filters: ProductFilterState;
  serverProps: ProductsPageServerProps;
  setFilters: Dispatch<SetStateAction<ProductFilterState>>;
}

export const ProductsContext = createContext<ProductsContextInterface>(
  {} as ProductsContextInterface,
);

export function ProductsContextProvider({
  children,
  serverProps,
}: PropsWithChildren<{ serverProps: ProductsPageServerProps }>) {
  const { props } = useTypedPage<{ filters: ProductFilters }>();
  const [filters, setFilters] = useDebounce<ProductFilterState>(
    {
      name: props.filters?.filter?.name || '',
      page: props.filters?.page || 1,
      status: props.filters?.filter?.status,
      category: props.filters?.filter?.category_id,
    },
    300,
  );

  useEffect(function () {
    if (props.flash?.error) {
      toast.error(props.flash.error);
    }

    if (props.flash?.success) {
      toast.success(props.flash.success);
    }
  }, []);

  const previousFiltersRef = useRef(filters);

  useEffect(
    function () {
      const nameChanged = previousFiltersRef.current.name !== filters.name;
      const pageChanged = previousFiltersRef.current.page !== filters.page;
      const categoryChanged =
        previousFiltersRef.current.category !== filters.category;
      const statusChanged =
        previousFiltersRef.current.status !== filters.status;

      previousFiltersRef.current = filters;

      if (!pageChanged && !nameChanged && !statusChanged && !categoryChanged) {
        return;
      }

      router.get(
        route('list_products'),
        pickValidObjectProperties({
          'filter[name]': filters.name,
          'filter[status]': filters.status,
          'filter[category_id]': filters.category,
          page:
            nameChanged || statusChanged || categoryChanged ? 1 : filters.page,
        }),
        { replace: true, preserveState: true },
      );
    },
    [filters],
  );

  return (
    <ProductsContext.Provider value={{ filters, setFilters, serverProps }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductStore() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error('useProductFilters must be used within a ProductsContext');
  }

  return ctx;
}
