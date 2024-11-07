import React, { useMemo, useState } from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Input } from '@/Components/Input';
import { Button } from '@/Components/Button';
import {
  MagnifyingGlassIcon,
  MixerVerticalIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { InertiaSharedProps } from '@/types';
import { Paginator } from '@/Components/Pages/Products/Paginator';
import { FilterSidebar } from '@/Components/Pages/Products/FilterSidebar';
import {
  ProductsContextProvider,
  ProductsPageServerProps,
  useProductStore,
} from '@/Store/products';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export function Products() {
  const [filtersOpenOnMobile, setFiltersOpenOnMobile] = useState(false);
  const { setFilters, filters, serverProps: props } = useProductStore();

  const [searchName, setSearchName] = useState(filters.name || '');

  function onSearchNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters(current => ({
      ...current,
      name: event.target.value,
    }));
    setSearchName(event.target.value);
  }

  const hasAtLeastOneFilter = searchName.length > 0 || filters.page > 1;

  const totalActiveFilters = () => {
    let total = 0;

    if (filters.category) {
      total++;
    }

    if (filters.status) {
      total++;
    }

    return total;
  };

  return (
    <AppLayout title="Products | Inventax">
      <header className="py-4 flex flex-col lg:flex-row lg:items-center w-full gap-6 lg:gap-8">
        <h1 className="text-4xl w-[30%] text-white font-serif font-semibold">
          Products
        </h1>
        <div className="w-full lg:w-[70%] gap-6 flex flex-col lg:flex-row lg:items-center">
          <div className="flex-1 w-full lg:w-auto">
            <Input
              type="search"
              value={searchName}
              name="searchName"
              onChange={onSearchNameChange}
              placeholder="Search for a product"
            >
              <Input.Icon>
                <MagnifyingGlassIcon className="text-white w-5 h-5" />
              </Input.Icon>
            </Input>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              className="flex items-center lg:hidden"
              onClick={() => setFiltersOpenOnMobile(true)}
            >
              <MixerVerticalIcon className="mr-2 w-5 h-5" />
              View filters
              <span className="rounded-full p-1 w-5 h-5 text-xs flex items-center justify-center bg-dark-green-500 ml-2 text-dark-green-900">
                {totalActiveFilters()}
              </span>
            </Button>
            <Link href={route('create_product_form')}>
              <Button className="flex items-center">
                <PlusCircledIcon className="w-5 h-5 mr-2" /> Add a product
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 w-full pb-4 flex gap-6 xl:gap-8">
        <FilterSidebar
          filtersOpenOnMobile={filtersOpenOnMobile}
          setFiltersOpenOnMobile={setFiltersOpenOnMobile}
        />
        <div className="w-full lg:w-[70%] flex flex-col gap-4  h-[calc(100vh-296px)] lg:h-[calc(100vh-168px)] overflow-y-auto">
          {props.products.data.length > 0 ? (
            <div className="flex flex-col gap-4 flex-grow overflow-y-auto h-[calc(100vh-232px)]">
              {props.products.data.map(product => (
                <div
                  key={product.id}
                  className="bg-dark-green-400 rounded-lg p-4 flex flex-col lg:flex-row"
                >
                  <div className="w-full lg:w-1/2 pr-6 lg:pr-0 pb-4 border-b lg:border-b-0 lg:border-r border-dark-green-300">
                    <span className="font-bold text-white">{product.name}</span>
                    <div className="mt-4 flex flex-col">
                      <span className="text-xs uppercase font-semibold text-gray-600 inline-block mb-2">
                        CATEGORY
                      </span>
                      <div>
                        <span className="basis-auto px-2 py-1 inliness text-xs bg-dark-green-500 rounded-md text-dark-green-900 font-bold">
                          {product.category?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-6 gap-4 lg:gap-0 grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col lg:items-center justify-center">
                      <span className="text-xs uppercase font-semibold text-gray-600 inline-block mb-1">
                        QUANTITY
                      </span>

                      <p className="font-bold text-lg text-white">
                        {product.quantity}
                      </p>
                    </div>

                    <div className="flex flex-col lg:items-center justify-center">
                      <span className="text-xs uppercase font-semibold text-gray-600 inline-block mb-1">
                        STATUS
                      </span>

                      <p className="font-bold text-sm text-white">
                        {product.status?.split('_').join(' ')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[calc(100vh-232px)] flex items-center justify-center">
              <div className="max-w-lg mx-auto flex flex-col items-center">
                <img
                  src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  alt="empty files"
                  className="max-w-32"
                />
                <h2 className="text-white font-serif text-2xl text-center">
                  {hasAtLeastOneFilter
                    ? 'No products found that match your search.'
                    : 'You have no products in your inventory.'}
                </h2>
                <p className="text-lg text-gray-600 mb-4 font-semibold">
                  {hasAtLeastOneFilter
                    ? 'Please try another search.'
                    : 'Please add a product.'}
                </p>
                {hasAtLeastOneFilter ? null : (
                  <Link href={route('create_product_form')}>
                    <Button className="flex items-center">
                      <PlusCircledIcon className="w-5 h-5 mr-2" /> Add a product
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}

          <div className="w-full h-16">
            <Paginator />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ProductsWithProvider(
  props: InertiaSharedProps<ProductsPageServerProps>,
) {
  return (
    <ProductsContextProvider serverProps={props}>
      <Products />
    </ProductsContextProvider>
  );
}
