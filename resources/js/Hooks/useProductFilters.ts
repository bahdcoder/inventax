import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { useDebounce } from '@react-hook/debounce';
import { route } from 'ziggy-js';
import { pickValidObjectProperties } from '@/helpers/pickValidObjectProperties';
import { ProductFilters } from '@/types';

export interface ProductFilterState {
  name: string;
  page: number;
  category?: number;
  status?: ProductFilters['filter']['status'];
}

export function useProductFilters() {
  const { props } = usePage<{ filters: ProductFilters }>();
  const [filters, setFilters] = useDebounce<ProductFilterState>(
    {
      name: props.filters?.filter?.name || '',
      page: props.filters?.page || 1,
      status: props.filters?.filter?.status,
      category: props.filters?.filter?.category_id,
    },
    300,
  );

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

  return {
    filters,
    setFilters,
  };
}
