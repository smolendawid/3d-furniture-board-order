export interface Material {
  name: string
  imageURL: string
}

export interface Item {
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
