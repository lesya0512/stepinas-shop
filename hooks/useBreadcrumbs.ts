import { useCallback, useEffect, useState } from "react"
import { usePageTitle } from "./usePageTitle"
import { useCrumbText } from "./useCrumbText"
import { usePathname } from "next/navigation"

export const useBreadcrumbs = (page: string) => {
  const [dynamicTitle, setDynamicTitle] = useState('')
  const pathname = usePathname()
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement
  const { crumbText } = useCrumbText(page)
  const getDefaultTextGenerator = useCallback(() => crumbText, [crumbText])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  usePageTitle(page, dynamicTitle)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const clothTypePathname = pathname.split(`/${page}/`)[2]
      console.log("Current pathname:", pathname);
      if (!clothTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = crumbText
        return
      }

      const text = clothTypePathname;
      setDynamicTitle(text);
      lastCrumb.textContent = text;
    }
  }, [breadcrumbs, crumbText, pathname, page])

  return { getDefaultTextGenerator, getTextGenerator }
} 