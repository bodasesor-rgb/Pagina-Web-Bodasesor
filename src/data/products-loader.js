/** Lazy loader — keeps the ~600KB products bundle out of the initial JS payload. */
let productsModule = null
let productsPromise = null

async function loadProductsModule(retries = 1) {
  if (productsModule) return productsModule
  if (!productsPromise) {
    productsPromise = import('./products.js')
      .then((mod) => {
        productsModule = mod
        return mod
      })
      .catch((err) => {
        productsPromise = null
        throw err
      })
  }
  try {
    return await productsPromise
  } catch (err) {
    if (retries > 0) {
      productsPromise = null
      return loadProductsModule(retries - 1)
    }
    throw err
  }
}

/** Warm the products chunk ahead of navigation (hover / intent). */
export function prefetchProducts() {
  return loadProductsModule().catch(() => null)
}

export async function getProductBySlugAsync(slug) {
  const mod = await loadProductsModule()
  return mod.getProductBySlug(slug)
}

export async function getRelatedProductsAsync(slug, limit = 4) {
  const mod = await loadProductsModule()
  return mod.getRelatedProducts(slug, limit)
}
