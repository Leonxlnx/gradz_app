import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);

    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < 20; i++) {
      let geometry;
      const type = i % 3;
      if (type === 0) geometry = torusGeometry;
      else if (type === 1) geometry = sphereGeometry;
      else geometry = coneGeometry;

      const material = new THREE.MeshPhongMaterial({
        color: i % 4 === 0 ? 0x143328 : i % 4 === 1 ? 0xE89F71 : i % 4 === 2 ? 0xA7C4A0 : 0xF4D06F,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 25;
      mesh.position.y = (Math.random() - 0.5) * 25;
      mesh.position.z = (Math.random() - 0.5) * 25;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      const scale = Math.random() * 0.8 + 0.4;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      meshes.push(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xE89F71, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xA7C4A0, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      meshes.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * 0.1 * (index % 2 === 0 ? 1 : -1);
        mesh.rotation.y = elapsedTime * 0.12 * (index % 3 === 0 ? 1 : -1);
        mesh.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.001;
        mesh.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.001;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeometry.dispose();
      sphereGeometry.dispose();
      coneGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
