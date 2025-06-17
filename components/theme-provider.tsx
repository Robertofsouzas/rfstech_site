"use client"

import * as React from "react"

interface ThemeContextType {
  theme: string | null
  setTheme: (theme: string) => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: null,
  setTheme: (theme: string) => {},
})

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider = ({
  attribute,
  children,
  defaultTheme,
  enableSystem = false,
  disableTransitionOnChange = false,
}: {
  attribute: string
  children: React.ReactNode
  defaultTheme: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) => {
  const [theme, setTheme] = React.useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme")
      if (storedTheme) {
        return storedTheme
      }
      if (enableSystem) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
    }
    return defaultTheme
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        document.documentElement.setAttribute(attribute, systemTheme)
        return
      }

      if (theme) {
        document.documentElement.setAttribute(attribute, theme)
        window.localStorage.setItem("theme", theme)
      }
    }
  }, [theme, attribute])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: string) => {
        setTheme(theme)
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
