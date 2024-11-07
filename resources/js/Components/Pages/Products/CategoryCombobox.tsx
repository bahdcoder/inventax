import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';
import { useDebounce } from '@react-hook/debounce';
import { Category } from '@/types';

interface CategoryComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected: (category: Category) => void;
  activeCategory: Category | null;
}

export function CategoryCombobox({
  onSelected,
  activeCategory,
  ...inputProps
}: CategoryComboboxProps) {
  const [query, setQuery] = useDebounce('', 300);
  // const [selected, setSelected] = useState<Category | null>(activeCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cachedCategories = useRef<Record<string, Category[]>>({});

  async function fetchCategories(search: string) {
    if (cachedCategories.current?.[search]) {
      setCategories(cachedCategories.current?.[search]);
      return;
    }

    if (search) {
      setIsLoading(true);
    }

    const response = await fetch(
      `/categories?filter[name]=${search}&fields[categories]=id,name`,
    );

    const data = await response.json();

    cachedCategories.current = {
      ...cachedCategories.current,
      [search]: data.categories.data,
    };

    setCategories(data.categories.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCategories(query);
  }, [query]);

  function onCategoryChange(value: Category | null | string) {
    if (!value) {
      return;
    }

    // setSelected(value as Category);
    onSelected(value as Category);
  }

  return (
    <Combobox
      onChange={onCategoryChange}
      onClose={() => setQuery('')}
      value={(activeCategory || '') as string}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            'w-full rounded-lg bg-dark-green-900 h-12 border border-dark-green-300 py-1.5 pr-8 pl-3  text-white',
            'focus:outline-none data-[focus]:outline-none focus:border-dark-green-500 focus:ring-dark-green-500 transition ease-in-out',
          )}
          displayValue={person => (person as any)?.name}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search and select a category..."
          {...inputProps}
        />

        {isLoading ? (
          <svg
            className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white group absolute inset-y-0 right-0 top-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-5 text-gray-600 fill-white group-data-[hover]:fill-white" />
          </ComboboxButton>
        )}
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-[var(--input-width)] z-50 rounded-xl border border-white/5 bg-dark-green-400 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        )}
      >
        {categories.map(category => (
          <ComboboxOption
            key={category.id}
            value={category}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
          >
            <CheckIcon className="invisible size-4 text-dark-green-500 group-data-[selected]:visible" />
            <div className="text-sm/6 text-white">{category.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
