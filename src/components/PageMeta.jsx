import { useEffect } from 'react'

const SITE_URL = 'https://www.evolvemobility.nl'
const DEFAULT_IMAGE = `${SITE_URL}/videos/problem-section-poster.jpg`

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

// path: het pad vanaf de root zoals in App.jsx, bijv. "/voor-dealers" (home = "/").
function PageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

    document.title = title
    setMetaByName('description', description)
    setCanonical(canonicalUrl)

    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', canonicalUrl)
    setMetaByProperty('og:image', DEFAULT_IMAGE)

    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)
    setMetaByName('twitter:image', DEFAULT_IMAGE)
  }, [title, description, path])

  return null
}

export default PageMeta
