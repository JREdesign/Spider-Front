import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { useRopeJoint, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import { PlaneGeometry } from 'three';

// Extender objetos no incluidos por defecto
extend({ MeshLine, MeshLineMaterial, PlaneGeometry });

function Band() {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3(), 
    new THREE.Vector3()
  ]));
  const [dragged, setDragged] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useEffect(() => {
    if (fixed.current && j1.current && j2.current && j3.current) {
      const points = [fixed, j1, j2, j3].map((j) => new THREE.Vector3().copy(j.current.translation()));
      curve.points = points;
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const meshLine = new MeshLine();
      meshLine.setGeometry(geometry);
      band.current.geometry = meshLine.geometry;
    }
  }, [curve]);

  useFrame((state) => {
    if (dragged) {
      const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      const dir = vec.sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current.setNextKinematicTranslation({ x: vec.x, y: vec.y, z: vec.z });
    }

    if (fixed.current && j1.current && j2.current && j3.current) {
      const points = [fixed.current, j1.current, j2.current, j3.current].map((j) => new THREE.Vector3().copy(j.translation()));
      curve.points = points;
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const meshLine = new MeshLine();
      meshLine.setGeometry(geometry);
      band.current.geometry = meshLine.geometry;
    }
  });

  return (
    <>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody ref={j1}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j2}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j3}><BallCollider args={[0.1]} /></RigidBody>
      <mesh ref={band}>
        <meshBasicMaterial color="white" />
      </mesh>
      <RigidBody ref={card} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <mesh
          onPointerUp={() => setDragged(false)}
          onPointerDown={(e) => {
            const vec = new THREE.Vector3().copy(e.point).sub(card.current.translation());
            setDragged(vec);
          }}
        >
          <planeGeometry args={[1.6, 2.25]} />
          <meshBasicMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    </>
  );
}

export { Band };










