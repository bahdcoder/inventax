import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ProductFilters } from '@/types';
import { CategoryCombobox } from '@/Components/Pages/Products/CategoryCombobox';
import { useProductStore } from '@/Store/products';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
interface FilterGroupProps {
  title: string;
}

import { Button } from '@/Components/Button';

function FilterGroup({ title, children }: PropsWithChildren<FilterGroupProps>) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-gray-600 uppercase text-sm font-semibold font-sans mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}

export interface FilterSidebarProps {
  filtersOpenOnMobile: boolean;
  setFiltersOpenOnMobile: Dispatch<SetStateAction<boolean>>;
}

export function FilterSidebar({
  filtersOpenOnMobile,
  setFiltersOpenOnMobile,
}: FilterSidebarProps) {
  const {
    serverProps: {
      status_counts: statusCounts,
      active_category: activeCategory,
    },
    filters,
    setFilters,
  } = useProductStore();

  const productStatusOptions = [
    {
      value: 'IN_STOCK',
      count: statusCounts.IN_STOCK,
      label: 'In stock',
    },
    {
      value: 'OUT_OF_STOCK',
      count: statusCounts.OUT_OF_STOCK,
      label: 'Out of stock',
    },
  ];

  function onStatusValueChange(value: ProductFilters['filter']['status']) {
    setFilters(current => ({ ...current, status: value }));
  }

  function onStatusFilterReset() {
    setFilters(current => ({ ...current, status: undefined }));
  }

  function onCategoryFilterReset() {
    setFilters(current => ({ ...current, category: undefined }));
  }

  const SidebarContent = (
    <div className="w-full flex flex-col gap-6">
      <FilterGroup title="Product Status">
        <RadioGroup.Root
          value={filters.status || ''}
          className="grid grid-cols-2 gap-4"
          onValueChange={onStatusValueChange}
        >
          {productStatusOptions.map(statusOption => (
            <RadioGroup.Item
              key={statusOption.value}
              value={statusOption.value}
              className="px-4 py-3 rounded-lg border group border-gray-600 flex  transition ease-in-out items-center data-[state=checked]:border-dark-green-500 data-[state=checked]:text-dark-green-500"
            >
              <RadioGroup.Indicator></RadioGroup.Indicator>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-xs font-semibold">
                  {statusOption.label}
                </p>

                <span className="text-white text-xs font-semibold bg-gray-600/20 transition ease-in-out group-data-[state=checked]:bg-dark-green-500/10 group-data-[state=checked]:text-dark-green-500 px-1 py-0.5 rounded-sm">
                  {statusOption.count}
                </span>
              </div>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <button
          onClick={onStatusFilterReset}
          className="text-left text-gray-600 hover:text-white text-xs mt-2"
        >
          Clear status
        </button>
      </FilterGroup>

      <FilterGroup title="Product Category">
        <CategoryCombobox
          activeCategory={activeCategory}
          onSelected={category =>
            setFilters(current => ({ ...current, category: category.id }))
          }
        />
        <button
          onClick={onCategoryFilterReset}
          className="text-left text-gray-600 hover:text-white text-xs mt-2"
        >
          Clear category
        </button>
      </FilterGroup>

      <div className="mt-2 lg:hidden">
        <Button
          className="w-full"
          onClick={() => setFiltersOpenOnMobile(false)}
        >
          See products
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialog
        as="div"
        open={filtersOpenOnMobile}
        className="relative z-10 focus:outline-none"
        onClose={() => setFiltersOpenOnMobile(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end bg-black/10">
            <DialogPanel
              transition
              className="w-full max-w-md h-[calc(100vh-128px)] rounded-t-xl bg-dark-green-900 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-2xl mb-6 font-serif font-medium text-white"
              >
                Product filters
              </DialogTitle>
              {SidebarContent}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="hidden lg:flex lg:w-[30%] h-full bg-dark-green-400 rounded-lg sticky top-0 p-6">
        {SidebarContent}
      </div>
    </>
  );
}
