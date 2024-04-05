import { Material } from '../models/Item'
const basePath = process.env.NODE_ENV === 'production' ? '/3d-furniture-board-order' : '';

export const materials: Material[] = [
  { name: 'Materiał A', imageURL: `${basePath}/images/wood.jpg` },
  { name: 'Materiał B', imageURL: `${basePath}/images/metal.jpg` },
]
