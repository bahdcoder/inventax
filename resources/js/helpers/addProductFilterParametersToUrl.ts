import { pickValidObjectProperties } from '@/helpers/pickValidObjectProperties';
import { ProductFilterState } from '@/Hooks/useProductFilters';

export function addProductFilterParamtersToUrl(
  url: string | undefined,
  parameters: ProductFilterState,
) {
  if (!url) {
    return url as string;
  }

  const urlObject = new URL(url);

  const filterParams = pickValidObjectProperties({
    'filter[name]': parameters.name,
    'filter[status]': parameters.status,
    'filter[category_id]': parameters.category,
  });

  const searchParams = new URLSearchParams(urlObject.search);

  Object.keys(filterParams).forEach(key => {
    searchParams.set(key, filterParams[key]);
  });

  // Removes the default encoding from search params serialisation.
  return `${urlObject.origin}${urlObject.pathname}?${searchParams.toString().replace(/%5B/g, '[').replace(/%5D/g, ']')}`;
}
