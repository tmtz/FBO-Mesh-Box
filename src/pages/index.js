import React, { useState, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"
import "./style.css"
//To use it as JS
extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()
  useRender(() => {
    orbitRef.current.update()
  })
  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="white" />
  </mesh>
)

const FBOBox = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  })
  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(pre => !pre)}
      scale={props.scale}
      castShadow
    >
      <ambientLight />
      <spotLight penumbra={1} position={[0, 5, 10]} castShadow />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default () => (
  <Canvas
    camera={{ position: [0, 0, 5] }}
    onCreated={({ gl }) => {
      gl.shadowMap.enable = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}
  >
    <fog attach="fog" args={["white", 5, 15]} />
    <Controls />
    <FBOBox />
    <Plane />
  </Canvas>
)
