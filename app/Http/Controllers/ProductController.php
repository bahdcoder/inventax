<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Spatie\QueryBuilder\QueryBuilder;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products', [
            'products' => QueryBuilder::for(Product::class)
                ->with('category')
                ->allowedFilters([
                    AllowedFilter::partial('name'),
                    AllowedFilter::exact('category_id'),
                    AllowedFilter::exact('status'),
                ])
                ->allowedIncludes(['category'])
                ->allowedSorts(['name', 'quantity', 'status'])
                ->paginate(25),
            'filters' => request()->all(['filter', 'page', 'sort']),
            'status_counts' => [
                'IN_STOCK' => Product::where('status', 'IN_STOCK')->count(),
                'OUT_OF_STOCK' => Product::where('status', 'OUT_OF_STOCK')->count(),
            ],
            'active_category' => Category::find(request('filter.category_id')),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        Product::create($request->validated());

        return redirect()->route('list_products')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
