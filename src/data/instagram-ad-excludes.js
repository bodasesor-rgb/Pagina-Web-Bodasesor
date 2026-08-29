/** Instagram flyer / publicidad IDs — never show in galería or product carousels. */
export const INSTAGRAM_AD_EXCLUDES = new Set([
  2, 13, 14, 22, 33, 35, 36, 40, 41, 54, 55, 56, 59, 62, 66, 68, 75, 76, 80, 84, 86, 89, 92, 93, 94, 99, 102, 110, 112, 114, 115, 117, 119, 121, 125, 126, 127, 128, 129, 130, 136, 137, 141, 145, 152, 156, 157, 160, 165, 171, 172, 173, 177, 179, 180, 188, 190, 195, 196, 198
])

export function isInstagramAdPath(src) {
  const m = String(src || '').match(/\/ig(\d+)\.(?:jpg|jpeg|png|webp)$/i)
  if (!m) return false
  return INSTAGRAM_AD_EXCLUDES.has(Number(m[1]))
}
