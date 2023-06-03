import React, { useMemo } from 'react'
import { useGsiScript } from '../hooks/gsi-script'

const createContextValue = isLoaded => ({
  clientId: CONFIG.auth.clientId,
  isLoaded,
})

export const AuthContext = React.createContext(
  createContextValue()
)

export function AuthProvider({ children }) {
  const isLoaded = useGsiScript()
  const contextValue = useMemo(() => createContextValue(isLoaded), [isLoaded])

  return (
    <AuthContext.Provider value={contextValue}>
      <div id="g_id_onload"
        data-client_id={CONFIG.auth.clientId}
        data-login_uri={CONFIG.auth.redirectUri}
      />
      {children}
    </AuthContext.Provider>
  )
}
