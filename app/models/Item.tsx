export interface Material {
  name: string
  imageURL: string
}

export interface Item {
  name: string
  width: number
  height: number
  material: Material
}
