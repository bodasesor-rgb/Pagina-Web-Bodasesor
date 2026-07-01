import { Link } from 'wouter'
import { useCity } from '../context/CityContext'
import { withCityPath } from '../utils/city-url'

/**
 * Link that automatically appends the active city suffix to internal paths.
 * External URLs (http/https/tel/mailto) and hash links are passed through unchanged.
 */
export default function CityLink({ href, ...props }) {
  const { city } = useCity()

  let to = href
  if (
    href &&
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//')
  ) {
    to = withCityPath(href, city?.slug)
  }

  return <Link href={to} {...props} />
}
