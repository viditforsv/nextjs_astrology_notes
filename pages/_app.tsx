import type { AppProps } from "next/app"
import { useEffect } from "react"
import '../styles/globals.css'
import 'katex/dist/katex.min.css'

export default function App({
  Component,
  pageProps,
}: AppProps) {
  useEffect(() => {
    // Make TOC collapsible
    const initCollapsibleTOC = () => {
      // Find TOC container - Nextra uses various class names
      const tocSelectors = [
        '.nextra-toc',
        '[class*="nextra-toc"]',
        'nav[aria-label="Table of contents"]',
        'aside[aria-label="Table of contents"]'
      ]
      
      let tocContainer: HTMLElement | null = null
      for (const selector of tocSelectors) {
        tocContainer = document.querySelector(selector)
        if (tocContainer) break
      }
      
      if (!tocContainer) return
      
      // Find all TOC items - check each li for nested ul
      const allTocItems = tocContainer.querySelectorAll('li')
      
      allTocItems.forEach((item) => {
        const listItem = item as HTMLElement
        const nestedList = listItem.querySelector(':scope > ul')
        
        // Only process items that have direct child ul (nested lists)
        if (!nestedList) return
        
        const link = listItem.querySelector('a')
        if (!link) return
        
        // Initialize as collapsed by default
        if (!listItem.hasAttribute('data-expanded')) {
          listItem.setAttribute('data-expanded', 'false')
          // Explicitly hide the nested list
          ;(nestedList as HTMLElement).style.display = 'none'
        }
        
        // Toggle function
        const toggleExpand = () => {
          const isExpanded = listItem.getAttribute('data-expanded') === 'true'
          const newState = !isExpanded
          listItem.setAttribute('data-expanded', String(newState))
          ;(nestedList as HTMLElement).style.display = newState ? 'block' : 'none'
        }
        
        // Check if this is a section header by href
        const href = link.getAttribute('href') || ''
        const isSectionHeader = /^#(poorva-peethika|stotram|phalasruthi|dhyanam)$/i.test(href)
        
        // For section headers, prevent navigation and toggle instead
        if (isSectionHeader) {
          link.addEventListener('click', (e) => {
            e.preventDefault()
            toggleExpand()
          })
        } else {
          // For other items, allow navigation but also allow toggling
          // Add a separate toggle area (could be the chevron area)
          link.style.cursor = 'pointer'
        }
      })
    }
    
    // Run on mount and after navigation
    initCollapsibleTOC()
    
    // Re-run when DOM changes (Nextra might update TOC dynamically)
    const observer = new MutationObserver(() => {
      initCollapsibleTOC()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  return <Component {...pageProps} />
}
