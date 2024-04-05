import { Item } from '../models/Item'

// Define a props interface to explicitly state what props are expected
interface RendererProps {
  item: Item
}

// Use the RendererProps interface to type your component's props
const Renderer = ({ item }: RendererProps) => {
  return (
    <section className='bg-custom-background w-full p-4 h-screen'>
      <div className='container '>
        <h2 className='text-lg font-bold'>{item.name}</h2>
      </div>
    </section>
  )
}

export default Renderer
