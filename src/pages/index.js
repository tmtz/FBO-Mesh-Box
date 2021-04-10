import React, { useState, useRef } from "react"
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
    <orbitControls autoRotate args={[camera, gl.domElement]} ref={orbitRef} />
  )
}

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
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default () => (
  <Canvas>
    <Controls />
    <FBOBox />
  </Canvas>
)
