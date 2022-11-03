declare module '*.jpeg'
declare module '*.jpg'
declare module '*.pdf'
declare module '*.docx'
declare module '*.png'
declare module '*.ico'

declare module '*.svg' {
  import React = require('react')

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
