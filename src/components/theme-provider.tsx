'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Loader2} from "lucide-react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [clientRendered, setClientRendered] = React.useState(false);

  React.useEffect(()=>{
    setClientRendered(true);

  },[])

  return clientRendered ? <NextThemesProvider {...props}>{children}</NextThemesProvider> : <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8"/></div>
}
