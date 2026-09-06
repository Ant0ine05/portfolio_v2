<template>
  <canvas ref="canvas" class="hero-3d-canvas"></canvas>
</template>

<script>
import * as THREE from 'three';

/* Icônes 3D "développeur" — fenêtre de navigateur, base de données,
   engrenage, puce hexagonale, balises </>, nuage de déploiement */

function makeBrowserWindow(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1, flatShading: true });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.4, 0.12), mat);
  group.add(frame);

  const barMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.05, flatShading: true });
  const bar = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.32, 0.13), barMat);
  bar.position.set(0, 0.54, 0.005);
  group.add(bar);

  const dotColors = [0xdc2626, 0xf6a1a1, 0xffffff];
  const dotGeo = new THREE.SphereGeometry(0.07, 12, 12);
  dotColors.forEach((c, idx) => {
    const dot = new THREE.Mesh(dotGeo, new THREE.MeshStandardMaterial({ color: c }));
    dot.position.set(-0.85 + idx * 0.22, 0.54, 0.08);
    group.add(dot);
  });
  return group;
}

function makeDatabase(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2, flatShading: true });
  const discGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.32, 24);
  for (let i = 0; i < 3; i++) {
    const disc = new THREE.Mesh(discGeo, mat);
    disc.position.y = i * 0.42 - 0.42;
    group.add(disc);
  }
  return group;
}

function makeGear(color) {
  const shape = new THREE.Shape();
  const teeth = 8;
  const outerR = 1.05;
  const innerR = 0.82;
  const holeR = 0.38;
  const segs = teeth * 2;
  for (let i = 0; i <= segs; i++) {
    const angle = (i / segs) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, holeR, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
  geo.center();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25, flatShading: true });
  return new THREE.Mesh(geo, mat);
}

function makeHexChip(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.3, flatShading: true });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.3, 6), mat);
  group.add(body);
  const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.1, flatShading: true });
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.32, 6), capMat);
  group.add(cap);
  return group;
}

function makeCodeBrackets(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1, flatShading: true });
  const armGeo = new THREE.BoxGeometry(0.9, 0.18, 0.18);
  const slashGeo = new THREE.BoxGeometry(1.15, 0.18, 0.18);
  const armAngle = Math.atan2(0.5, 0.75);

  const lessBracket = new THREE.Group();
  const lTop = new THREE.Mesh(armGeo, mat);
  lTop.position.set(-0.025, 0.25, 0);
  lTop.rotation.z = armAngle;
  lessBracket.add(lTop);
  const lBottom = new THREE.Mesh(armGeo, mat);
  lBottom.position.set(-0.025, -0.25, 0);
  lBottom.rotation.z = -armAngle;
  lessBracket.add(lBottom);
  lessBracket.position.x = -1.05;
  group.add(lessBracket);

  const greaterBracket = new THREE.Group();
  const gTop = new THREE.Mesh(armGeo, mat);
  gTop.position.set(0.025, 0.25, 0);
  gTop.rotation.z = Math.PI - armAngle;
  greaterBracket.add(gTop);
  const gBottom = new THREE.Mesh(armGeo, mat);
  gBottom.position.set(0.025, -0.25, 0);
  gBottom.rotation.z = armAngle - Math.PI;
  greaterBracket.add(gBottom);
  greaterBracket.position.x = 1.05;
  group.add(greaterBracket);

  const slash = new THREE.Mesh(slashGeo, mat);
  slash.rotation.z = Math.atan2(1.1, 0.3);
  group.add(slash);

  return group;
}

function makeCloud(color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05, flatShading: true });
  const puffs = [
    { r: 0.55, x: 0, y: 0, z: 0 },
    { r: 0.4, x: -0.55, y: -0.08, z: 0 },
    { r: 0.42, x: 0.55, y: -0.05, z: 0 },
    { r: 0.32, x: -0.2, y: 0.35, z: 0.1 },
    { r: 0.34, x: 0.25, y: 0.32, z: -0.1 }
  ];
  puffs.forEach((p) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(p.r, 16, 16), mat);
    puff.position.set(p.x, p.y, p.z);
    group.add(puff);
  });
  return group;
}

export default {
  name: 'Hero3D',
  mounted() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.mouse = { x: 0, y: 0 };
    this.onMouseMove = (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    this.onResize = this.handleResize.bind(this);

    try {
      this.initScene();
      window.addEventListener('resize', this.onResize);
      window.addEventListener('mousemove', this.onMouseMove);
      if (!this.prefersReducedMotion) {
        this.animate();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    } catch (e) {
      console.warn('Hero3D: WebGL indisponible, fond 3D désactivé.', e);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    }
    if (this.renderer) this.renderer.dispose();
  },
  methods: {
    initScene() {
      const canvas = this.$refs.canvas;
      const container = canvas.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0xf2efe9, 8, 19);
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 13);

      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
      dirLight.position.set(5, 8, 6);
      this.scene.add(dirLight);
      const pinkLight = new THREE.PointLight(0xf6a1a1, 1.4, 30);
      pinkLight.position.set(-6, -3, 6);
      this.scene.add(pinkLight);

      this.group = new THREE.Group();
      this.scene.add(this.group);

      const palette = [0xdc2626, 0xef4444, 0xf6a1a1, 0xfcd9a1, 0xb91c1c, 0xef4444];
      const builders = [makeBrowserWindow, makeDatabase, makeGear, makeHexChip, makeCodeBrackets, makeCloud];

      this.meshes = builders.map((build, i) => {
        const obj = build(palette[i % palette.length]);
        obj.scale.setScalar(0.85);
        const angle = (i / builders.length) * Math.PI * 2;
        const radius = 5;
        obj.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.55,
          (Math.random() - 0.5) * 3
        );
        obj.userData.floatSpeed = 0.35 + Math.random() * 0.4;
        obj.userData.floatOffset = Math.random() * Math.PI * 2;
        obj.userData.rotSpeedX = 0.12 + Math.random() * 0.18;
        obj.userData.rotSpeedY = 0.16 + Math.random() * 0.22;
        this.group.add(obj);
        return obj;
      });

      this.clock = new THREE.Clock();
    },
    animate() {
      this.rafId = requestAnimationFrame(this.animate);
      const t = this.clock.getElapsedTime();
      const dt = this.clock.getDelta();

      this.meshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX * dt;
        mesh.rotation.y += mesh.userData.rotSpeedY * dt;
        mesh.position.y += Math.sin(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.003;
      });

      this.group.rotation.y += (this.mouse.x * 0.35 - this.group.rotation.y) * 0.04;
      this.group.rotation.x += (-this.mouse.y * 0.25 - this.group.rotation.x) * 0.04;

      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      if (!this.renderer) return;
      const canvas = this.$refs.canvas;
      const container = canvas.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }
};
</script>

<style scoped>
.hero-3d-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 640px) {
  .hero-3d-canvas {
    opacity: 0.6;
  }
}
</style>
