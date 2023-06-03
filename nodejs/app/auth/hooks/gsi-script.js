import { useEffect, useState } from 'react'

let isLoadedGlobal

export const useGsiScript = () => {
  const [isLoaded, setIsLoaded] = useState(isLoadedGlobal)

  useEffect(() => {
    // check if already has a script tag for gsi.
    let scriptTag = document.querySelector('#useGsiScript')
    // if not yet, create one and insert at the end of body.
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'useGsiScript'
      scriptTag.src = 'https://accounts.google.com/gsi/client'
      scriptTag.async = true
      scriptTag.defer = true
      document.body.appendChild(scriptTag)
    }

    scriptTag.addEventListener('load', () => {
      isLoadedGlobal = true
      setIsLoaded(true)
    })
    scriptTag.addEventListener('error', () => {
      isLoadedGlobal = false
      setIsLoaded(false)
    })
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return isLoaded
}
