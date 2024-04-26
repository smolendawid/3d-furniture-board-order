import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Cut } from '../models/Cut'
import { Material } from '../models/Board'
import TextSprite from '@seregpie/three.text-sprite'

interface RendererProps {
  cut: Cut
  material: Material
}

const addVeneerLabel = (
  scene: THREE.Scene,
  veneer: boolean,
  x: number,
  y: number,
  positionOffset: number
) => {
  const veneerText = veneer ? 'dodana' : 'brak'
  const veneerLabel = new TextSprite({
    text: `Okleina: ${veneerText}`,
    fontSize: 4,
    color: '#000',
  })
  veneerLabel.position.set(x, y, positionOffset)
  scene.add(veneerLabel)
}

const Renderer = ({ cut, material }: RendererProps) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const {
      width,
      height,
      depth,
      veneerA,
      veneerB,
      veneerC,
      veneerD,
      quantity,
    } = cut

    const gap = 10 * depth
    const totalDepth = quantity * depth + (quantity - 1) * gap

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
          veneerC
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerA
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerB
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          veneerD
            ? new THREE.MeshBasicMaterial({ map: texture })
            : colorMaterial,
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
        ]

        for (let i = 0; i < quantity; i++) {
          const geometry = new THREE.BoxGeometry(width, height, depth)
          const cuboid = new THREE.Mesh(geometry, materials)
          const positionOffset = i * (depth + gap) - totalDepth / 2 + depth / 2
          cuboid.position.set(0, 0, positionOffset)
          scene.add(cuboid)

          // Adding annotations
          const widthLabel = new TextSprite({
            text: `Szerokość: ${width}`,
            fontSize: 4,
            color: '#000',
          })
          const heightLabel = new TextSprite({
            text: `Wysokość: ${height}`,
            fontSize: 4,
            color: '#000',
          })

          if (i === quantity - 1) {
            widthLabel.position.set(width / 2 + 5, 5, positionOffset + 10)
            heightLabel.position.set(0, height / 2 + 5, positionOffset + 10)
            heightLabel.rotation.x = Math.PI / 2

            scene.add(widthLabel)
            scene.add(heightLabel)

            addVeneerLabel(
              scene,
              veneerA,
              -(width / 2) + 10,
              0,
              positionOffset + 10
            )
            addVeneerLabel(
              scene,
              veneerB,
              0,
              height / 2 + 10,
              positionOffset + 10
            )
            addVeneerLabel(
              scene,
              veneerC,
              width / 2 + 10,
              0,
              positionOffset + 10
            )
            addVeneerLabel(
              scene,
              veneerD,
              0,
              -(height / 2) + 10,
              positionOffset + 10
            )
          }
        }
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the texture:', error)
      }
    )

    const maxDimension = Math.max(width, height, totalDepth)
    camera.position.set(maxDimension * 0, maxDimension * 0, maxDimension * 3)
    camera.lookAt(scene.position)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    camera.aspect =
      mountRef.current!.clientWidth / mountRef.current!.clientHeight
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
    console.log(material)
    return () => {
      mountRef.current!.removeChild(renderer.domElement)
    }
  }, [cut, material])

  return (
    <section
      ref={mountRef}
      className='bg-custom-background w-full p-4 h-screen'
    />
  )
}

export default Renderer
