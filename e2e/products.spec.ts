import { test, expect } from '@playwright/test';

const MOCK_CATEGORIES = [
  { slug: 'electronics', name: 'Electronics', url: 'url' },
  { slug: 'beauty', name: 'Beauty', url: 'url' }
];

const MOCK_PRODUCTS = {
  products: [
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      price: 9.99,
      category: 'beauty',
      thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
      stock: 5,
    },
    {
      id: 2,
      title: 'Eyeshadow Palette with Mirror',
      price: 19.99,
      category: 'beauty',
      thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
      stock: 10,
    }
  ],
  total: 2,
  skip: 0,
  limit: 10
};

test.describe('Products Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock categories
    await page.route('*/**/products/categories', async route => {
      await route.fulfill({ json: MOCK_CATEGORIES });
    });

    // Mock initial product list
    await page.route('*/**/products?*', async route => {
      await route.fulfill({ json: MOCK_PRODUCTS });
    });

    await page.goto('/products');
  });

  test('should list products', async ({ page }) => {
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // Check if products are displayed
    await expect(page.getByText('Essence Mascara Lash Princess')).toBeVisible();
    await expect(page.getByText('Eyeshadow Palette with Mirror')).toBeVisible();

    // Check price formatting (assuming locale might vary, but "9,99" or "9.99" + currency symbol)
    // The component uses es-ES locale for formatting: 9,99 €
    await expect(page.getByText('9,99 €')).toBeVisible();
  });

  test('should create a new product', async ({ page }) => {
    const newProduct = {
      id: 101,
      title: 'New Test Product',
      price: 29.99,
      category: 'electronics',
      description: 'A test description',
      thumbnail: 'https://placehold.co/400x300?text=No+Image'
    };

    // Mock create endpoint
    await page.route('*/**/products/add', async route => {
      const requestData = route.request().postDataJSON();
      expect(requestData).toMatchObject({
        title: newProduct.title,
        price: newProduct.price,
        category: newProduct.category
      });
      await route.fulfill({ json: newProduct });
    });

    await page.getByRole('button', { name: 'Add Product' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Create a new Product' })).toBeVisible();

    // Fill form
    await page.getByLabel('Title *').fill(newProduct.title);
    await page.getByLabel('Price *').fill(newProduct.price.toString());

    // Select category
    await page.getByRole('combobox').click();
    await page.getByLabel('Electronics').click();

    await page.getByRole('button', { name: 'Create Product' }).click();

    // Verify toast and list update
    await expect(page.getByText('You had created a new Product')).toBeVisible();
    await expect(page.getByText(newProduct.title)).toBeVisible();
  });

  test('should update a product', async ({ page }) => {
    const updatedTitle = 'Updated Mascara Name';

    // Mock update endpoint
    await page.route('*/**/products/1', async route => {
      if (route.request().method() === 'PATCH') {
        const requestData = route.request().postDataJSON();
        expect(requestData.title).toBe(updatedTitle);

        await route.fulfill({
          json: {
            ...MOCK_PRODUCTS.products[0],
            title: updatedTitle
          }
        });
      } else {
        await route.continue();
      }
    });

    // Open actions menu for first product
    await page.locator('tbody tr').first().getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Edit product' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Edit Product' })).toBeVisible();

    // Update title
    await page.getByLabel('Title *').fill(updatedTitle);

    await page.getByRole('button', { name: 'Update Product' }).click();

    // Verify toast and list update
    await expect(page.getByText('Product updated successfully')).toBeVisible();
    await expect(page.getByText(updatedTitle)).toBeVisible();
  });

  test('should delete a product', async ({ page }) => {
    // Mock delete endpoint
    await page.route('*/**/products/1', async route => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          json: {
            ...MOCK_PRODUCTS.products[0],
            isDeleted: true,
            deletedOn: new Date().toISOString()
          }
        });
      } else {
        await route.continue();
      }
    });

    // Open actions menu for first product
    await page.locator('tbody tr').first().getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Delete product' }).click();

    // Confirm deletion
    await expect(page.getByText('Are you sure you want to delete product "Essence Mascara Lash Princess"?')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify toast (implied by optimistic update removal, but code uses toast for error only in deleteProduct?)
    // Checking useProducts.ts: deleteProduct triggers toast only on error.
    // But it does "optimistic update" -> store.removeProduct(id).

    // Wait for the product to disappear
    await expect(page.getByText('Essence Mascara Lash Princess')).not.toBeVisible();
  });
});
