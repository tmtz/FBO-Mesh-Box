import React from "react"

import { Canvas } from "react-three-fiber"
import "./style.css"

const FBOBox = () => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  )
}

export default () => (
  <Canvas>
    <FBOBox />
  </Canvas>
)
