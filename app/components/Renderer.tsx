import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Item } from '../models/Item'

interface RendererProps {
  item: Item
}

const Renderer = ({ item }: RendererProps) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const {
      width,
      height,
      depth,
      material,
      veneerA,
      veneerB,
      veneerC,
      veneerD,
      quantity,
    } = item

    // Calculate the total length needed to fit all cuboids with gaps
    const gap = 10 * depth // Set gap size to 20% of the depth
    const totalDepth = quantity * depth + (quantity - 1) * gap // Total space needed

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#bcd6e0')

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current?.appendChild(renderer.domElement)

    const loader = new THREE.TextureLoader()
    loader.load(
      material.imageURL,
      (texture) => {
        const colorMaterial = new THREE.MeshBasicMaterial({ color: '#8AC' })
        const materials = [
          veneerA
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerB
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerC
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerD
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
        ]

        // Render cuboids based on quantity
        for (let i = 0; i < quantity; i++) {
          const geometry = new THREE.BoxGeometry(width, height, depth)
          const cuboid = new THREE.Mesh(geometry, materials)
          const positionOffset = i * (depth + gap) - totalDepth / 2 + depth / 2 // Centering the group
          cuboid.position.set(0, 0, positionOffset) // Position each cuboid with a gap
          scene.add(cuboid)
        }
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the texture:', error)
      }
    )

    const maxDimension = Math.max(width, height, totalDepth)
    camera.position.set(
      maxDimension * 1.5,
      maxDimension * 1.5,
      maxDimension * 1.5
    )
    camera.lookAt(scene.position)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // Code to center the cuboid group and adjust camera aspect ratio
    const aspectRatio =
      mountRef.current!.clientWidth / mountRef.current!.clientHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
    renderer.setSize(
      mountRef.current!.clientWidth,
      mountRef.current!.clientHeight
    )

    const animate = function () {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current!.removeChild(renderer.domElement)
    }
  }, [item]) // You might want to adjust this dependency array based on your needs

  return (
    <section
      ref={mountRef}
      className='bg-custom-background w-full p-4 h-screen'
    />
  )
}

export default Renderer
