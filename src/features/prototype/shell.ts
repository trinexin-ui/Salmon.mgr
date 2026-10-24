import { createContext, useContext } from 'react'

// What a screen needs to know about the frame it is shown in. On desktop the screen sits in the
// 402×874 phone mockup (status bar band 74px, scale 1). On a phone it fills the real screen: no
// mockup, a thin top band, and the 402px-wide design is scaled to the width of the display.
export type Shell = {
  phone: boolean
  // height of the band at the top of a screen (the mock status bar sits in it on desktop)
  top: number
  // screen px per design px
  scale: number
}

export const DESKTOP_TOP = 74
export const PHONE_TOP = 16

export const ShellContext = createContext<Shell>({ phone: false, top: DESKTOP_TOP, scale: 1 })

export const useShell = () => useContext(ShellContext)
