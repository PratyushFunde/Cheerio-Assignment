import { createContext, useContext } from "react"

export const SupportContext = createContext(null)

export function useSupport() {
  const context = useContext(SupportContext)
  if (!context) throw new Error("useSupport must be used inside SupportProvider")
  return context
}
