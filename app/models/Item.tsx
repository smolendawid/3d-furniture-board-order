export interface Material {
  name: string
  imageURL: string
}

export interface Item {
  [key: string]: any;
  name: string
  width: number
  height: number
  depth: number
  material: Material
  veneerA: boolean
  veneerB: boolean
  veneerC: boolean
  veneerD: boolean
}
