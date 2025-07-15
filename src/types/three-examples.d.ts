declare module 'three/examples/jsm/loaders/FontLoader.js' {
  import { Loader } from 'three'
  export class FontLoader extends Loader {
    parse(json: object): Font
  }
  export class Font {
    data: object
  }
}

declare module 'three/examples/jsm/geometries/TextGeometry.js' {
  import { ExtrudeGeometry } from 'three'
  export interface TextGeometryParameters {
    font: Font
    size?: number
    height?: number
    curveSegments?: number
    bevelEnabled?: boolean
    bevelThickness?: number
    bevelSize?: number
    bevelOffset?: number
    bevelSegments?: number
  }
  export class TextGeometry extends ExtrudeGeometry {
    constructor(text: string, parameters: TextGeometryParameters)
    center(): this
  }
}
