import { useLocation } from 'wouter'
import PageInternalLinks from './PageInternalLinks'
import { getGlobalInternalLinksProps } from '../utils/global-internal-links'

/** Cross-hub backlinks on every SPA page that lacks SeoRelatedLinks. */
export default function GlobalPageInternalLinks() {
  const [location] = useLocation()
  const props = getGlobalInternalLinksProps(location)
  if (!props) return null
  return (
    <PageInternalLinks
      excludeHref={props.excludeHref}
      max={12}
    />
  )
}
