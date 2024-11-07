import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Link } from '@inertiajs/react';
import { addProductFilterParamtersToUrl } from '@/helpers/addProductFilterParametersToUrl';
import { useProductStore } from '@/Store/products';

export function Paginator() {
  const {
    filters,
    serverProps: { products },
  } = useProductStore();

  const links = products?.links ?? [];

  const previousLink = links?.[0];

  const nextLink = links?.[links.length - 1];

  const restOfPages = links?.slice(1, links.length - 1);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          href={addProductFilterParamtersToUrl(previousLink.url, filters)}
          className="inline-flex items-center pr-1 pt-4 text-sm font-medium group transition ease-in-out text-gray-600 hover:text-dark-green-500"
        >
          <ArrowLeftIcon
            aria-hidden="true"
            className="mr-3 h-5 w-5 text-gray-600 group-hover:text-dark-green-500 transition ease-in-out"
          />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {restOfPages.map((page, idx) => (
          <Link
            key={`${page.label}-${idx}`}
            href={addProductFilterParamtersToUrl(page.url, filters)}
            className={`${page.active ? 'border-dark-green-500 text-dark-green-500' : ' text-gray-600 hover:text-dark-green-500'} inline-flex items-center px-4 pt-4 text-sm font-medium`}
          >
            {page.label}
          </Link>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href={addProductFilterParamtersToUrl(nextLink.url, filters)}
          className="inline-flex items-center pl-1 group pt-4 text-sm font-medium transition ease-in-out text-gray-600 hover:text-dark-green-500"
        >
          Next
          <ArrowRightIcon
            aria-hidden="true"
            className="ml-3 h-5 w-5 text-gray-600 group-hover:text-dark-green-500 transition ease-in-out"
          />
        </Link>
      </div>
    </nav>
  );
}
