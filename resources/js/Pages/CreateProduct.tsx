import { Button } from '@/Components/Button';
import { FieldGroup } from '@/Components/FieldGroup';
import { CategoryCombobox } from '@/Components/Pages/Products/CategoryCombobox';
import { Spinner } from '@/Components/Spinner';
import { AppLayout } from '@/Layouts/AppLayout';
import { Category } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import React, { FormEvent, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export function CreateProduct() {
  const { props } = usePage();

  const { data, post, processing, setData } = useForm({
    name: '',
    status: 'IN_STOCK',
    quantity: '',
    category_id: '',
  });

  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    if (category) {
      setData('category_id', category?.id?.toString());
    }
  }, [category]);

  const statusOptions = [
    { value: 'IN_STOCK', label: 'In stock' },
    { value: 'OUT_OF_STOCK', label: 'Out of stock' },
  ];

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    post(route('create_product'));
  }

  return (
    <AppLayout title="Create Product | Inventax">
      <header className="w-full py-6 lg:py-12">
        <h1 className="text-2xl lg:text-4xl font-serif font-semibold text-white">
          Create Product
        </h1>
      </header>

      <form onSubmit={onSubmit} method="POST">
        <div className="p-6 lg:p-8 bg-dark-green-400 rounded-lg max-w-2xl flex flex-col gap-4">
          <FieldGroup
            id="name"
            name="name"
            label="Name"
            value={data.name}
            error={props?.errors?.name}
            onChange={event => setData('name', event.target.value)}
          />

          <FieldGroup
            id="quantity"
            type="number"
            name="quantity"
            label="Quantity"
            value={data.quantity}
            error={props?.errors?.quantity}
            onChange={event => setData('quantity', event.target.value)}
          />

          <FieldGroup
            id="category"
            label="Category"
            error={props?.errors?.category_id}
          >
            <CategoryCombobox
              id="category"
              onSelected={setCategory}
              activeCategory={category || null}
            />
          </FieldGroup>

          <FieldGroup id="status" label="Status" error={props?.errors?.status}>
            <RadioGroup.Root
              name="status"
              value={data.status}
              onValueChange={value => setData('status', value)}
              className="w-full grid grid-cols-2 gap-4 transition ease-in-out"
            >
              {statusOptions.map(status => (
                <RadioGroup.Item
                  key={status.value}
                  value={status.value}
                  className="border border-gray-600 rounded-lg py-4 px-6 hover:bg-dark-green-800 transition ease-in-out data-[state=checked]:border-dark-green-500 data-[state=checked]:bg-dark-green-900"
                >
                  <RadioGroup.Indicator />
                  <label className="text-white font-semibold text-base lg:text-lg">
                    {status.label}
                  </label>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          </FieldGroup>
        </div>
        <div className="w-full max-w-2xl flex items-center justify-between py-4">
          <Link href={route('list_products')}>
            <Button
              type="button"
              variant="secondary"
              className="flex items-center px-12 py-4 rounded-full text-lg font-semibold"
            >
              <ArrowLeftIcon className="mr-2" /> Back
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex items-center px-12 py-4 rounded-full text-lg font-semibold"
          >
            {processing ? <Spinner className="mr-2" /> : null}
            Submit
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}

export default CreateProduct;
