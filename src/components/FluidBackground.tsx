import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FluidBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FDFCF8');

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color('#FDFCF8') },
      uColor2: { value: new THREE.Color('#F4F4F0') },
      uColor3: { value: new THREE.Color('#FFFFFF') },
      uColor4: { value: new THREE.Color('#EFEFEA') },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;

      varying vec2 vUv;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        float mouseDist = distance(st, uMouse);
        float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.15;

        float t = uTime * 0.2;

        vec2 q = vec2(0.);
        q.x = snoise(st + vec2(0.0, t * 0.5));
        q.y = snoise(st + vec2(1.0, t * 0.5));

        vec2 r = vec2(0.);
        r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t + mouseInfluence);
        r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t + mouseInfluence);

        float f = snoise(st + r);

        vec3 color = uColor1;
        color = mix(color, uColor2, clamp(length(q), 0.0, 1.0));
        color = mix(color, uColor3, clamp(length(r.x), 0.0, 1.0));
        color = mix(color, uColor4, clamp(f, 0.0, 1.0));
        color = color * 1.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if(width > 0 && height > 0) {
                renderer.setSize(width, height);
                uniforms.uResolution.value.set(width, height);
            }
        }
    });
    resizeObserver.observe(containerRef.current);

    const handleMouseMove = (e: MouseEvent) => {
       const x = (e.clientX / window.innerWidth) * (window.innerWidth / window.innerHeight);
       const y = 1.0 - (e.clientY / window.innerHeight);
       uniforms.uMouse.value.x = x;
       uniforms.uMouse.value.y = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};
