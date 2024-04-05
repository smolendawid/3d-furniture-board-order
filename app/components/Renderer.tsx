import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Item } from '../models/Item'

interface RendererProps {
  item: Item
}

const Renderer = ({ item }: RendererProps) => {
  const mountRef = useRef(null)

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
    } = item

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
    mountRef.current.appendChild(renderer.domElement)

    const loader = new THREE.TextureLoader()
    loader.load(
      material.imageURL,
      (texture) => {
        const geometry = new THREE.BoxGeometry(width, height, depth)

        // Default material color
        const colorMaterial = new THREE.MeshBasicMaterial({ color: '#8AC' })

        // Create an array of materials
        const materials = [
          veneerA
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial, // side 1: front
          veneerB
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial, // side 2: back
          veneerC
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial, // side 3: top
          veneerD
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial, // side 4: bottom
          new THREE.MeshBasicMaterial({ map: texture }), // side 5: right
          new THREE.MeshBasicMaterial({ map: texture }), // side 6: left
        ]

        const cuboid = new THREE.Mesh(geometry, materials)
        scene.add(cuboid)
      },
      undefined, // onProgress callback not needed here
      (error) => {
        console.error('An error happened while loading the texture:', error)
      }
    )

    const maxDimension = Math.max(width, height, depth)
    camera.position.set(maxDimension * 1, maxDimension * 1, maxDimension * 1)
    camera.lookAt(scene.position)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // Codde to center the cuboid
    const aspectRatio =
      mountRef.current.clientWidth / mountRef.current.clientHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    )

    const animate = function () {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [item])

  return (
    <section
      ref={mountRef}
      className='bg-custom-background w-full p-4 h-screen'
    />
  )
}

export default Renderer
