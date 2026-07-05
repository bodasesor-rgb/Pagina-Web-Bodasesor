/** Lazy loader — keeps the ~600KB products bundle out of the initial JS payload. */
let productsModule = null

async function loadProductsModule() {
  if (!productsModule) {
    productsModule = await import('./products.js')
  }
  return productsModule
}

export async function getProductBySlugAsync(slug) {
  const mod = await loadProductsModule()
  return mod.getProductBySlug(slug)
}

export async function getRelatedProductsAsync(slug, limit = 4) {
  const mod = await loadProductsModule()
  return mod.getRelatedProducts(slug, limit)
}
