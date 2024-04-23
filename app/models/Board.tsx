import { Cut } from './Cut'

export interface Material {
  name: string
  imageURL: string
}

export interface Board {
  [key: string]: any
  material: Material
  cuts: Cut[]
}
