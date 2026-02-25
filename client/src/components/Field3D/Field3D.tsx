import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style/Field3D.css';

const GRID_SIZE = 10;
const CELL_SIZE = 1;
const CELL_HEIGHT = 0.35;
const WAVE_AMPLITUDE = 0.12;
const WAVE_SPEED = 1.5;
const WAVE_PHASE = 0.18;

const SHIP_LENGTH_CELLS = 2;
const SHIP_WIDTH_CELLS = 1;
const SHIP_DECK_HEIGHT = 0.06;
const SHIP_FENDER_HEIGHT = 0.1;
const SHIP_MARGIN = 0.04;
const SHIP_MAST_HEIGHT = 0.4;
const SHIP_MAST_RADIUS = 0.025;
const SHIP_SAIL_WIDTH = 0.5;
const SHIP_SAIL_HEIGHT = 0.32;

const Field3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const containerEl = container;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x233557);
    sceneRef.current = scene;

    const aspect = width / height;
    const frustumSize = 14;
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect * 0.5,
      frustumSize * aspect * 0.5,
      frustumSize * 0.5,
      -frustumSize * 0.5,
      0.1,
      1000
    );
    camera.position.set(12, 14, 12);
    camera.lookAt(4.5, 0, 4.5);
    camera.updateProjectionMatrix();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const templateGeometry = new THREE.BoxGeometry(CELL_SIZE, CELL_HEIGHT, CELL_SIZE);
    const halfHeight = CELL_HEIGHT / 2;
    const posAttr = templateGeometry.attributes.position;
    const topVertexIndices: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      if (posAttr.getY(i) >= halfHeight - 0.001) topVertexIndices.push(i);
    }
    templateGeometry.dispose();

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e90ff,
      metalness: 0.1,
      roughness: 0.8,
      transparent: true,
      opacity: 0.82,
    });

    const grid = new THREE.Group();
    const cellGeometries: THREE.BufferGeometry[] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cellGeo = new THREE.BoxGeometry(CELL_SIZE, CELL_HEIGHT, CELL_SIZE);
        cellGeometries.push(cellGeo);
        const cell = new THREE.Mesh(cellGeo, waterMaterial);
        cell.position.set(col + 0.5, halfHeight, row + 0.5);
        cell.userData.row = row;
        cell.userData.col = col;
        cell.userData.topVertexIndices = topVertexIndices;
        grid.add(cell);
      }
    }

    scene.add(grid);

    const ship = new THREE.Group();
    const deckLength = SHIP_LENGTH_CELLS * CELL_SIZE - SHIP_MARGIN;
    const deckWidth = SHIP_WIDTH_CELLS * CELL_SIZE - SHIP_MARGIN;
    const hullMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3728,
      metalness: 0.2,
      roughness: 0.8,
    });
    const fenderMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5dc,
      metalness: 0.1,
      roughness: 0.9,
    });
    const sailMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff5e0,
      metalness: 0.05,
      roughness: 0.95,
      side: THREE.DoubleSide,
    });

    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(deckLength, SHIP_DECK_HEIGHT, deckWidth),
      hullMaterial
    );
    deck.position.y = SHIP_DECK_HEIGHT / 2;
    ship.add(deck);

    const fenderThick = 0.05;
    const leftFender = new THREE.Mesh(
      new THREE.BoxGeometry(deckLength, SHIP_FENDER_HEIGHT, fenderThick),
      fenderMaterial
    );
    leftFender.position.set(0, SHIP_DECK_HEIGHT + SHIP_FENDER_HEIGHT / 2, deckWidth / 2);
    ship.add(leftFender);
    const rightFender = new THREE.Mesh(
      new THREE.BoxGeometry(deckLength, SHIP_FENDER_HEIGHT, fenderThick),
      fenderMaterial
    );
    rightFender.position.set(0, SHIP_DECK_HEIGHT + SHIP_FENDER_HEIGHT / 2, -deckWidth / 2);
    ship.add(rightFender);
    const bowFender = new THREE.Mesh(
      new THREE.BoxGeometry(fenderThick, SHIP_FENDER_HEIGHT, deckWidth),
      fenderMaterial
    );
    bowFender.position.set(deckLength / 2, SHIP_DECK_HEIGHT + SHIP_FENDER_HEIGHT / 2, 0);
    ship.add(bowFender);
    const sternFender = new THREE.Mesh(
      new THREE.BoxGeometry(fenderThick, SHIP_FENDER_HEIGHT, deckWidth),
      fenderMaterial
    );
    sternFender.position.set(-deckLength / 2, SHIP_DECK_HEIGHT + SHIP_FENDER_HEIGHT / 2, 0);
    ship.add(sternFender);

    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(SHIP_MAST_RADIUS, SHIP_MAST_RADIUS * 1.1, SHIP_MAST_HEIGHT, 8),
      hullMaterial
    );
    mast.position.set(0.15, SHIP_DECK_HEIGHT + SHIP_MAST_HEIGHT / 2, 0);
    ship.add(mast);

    const sail = new THREE.Mesh(
      new THREE.PlaneGeometry(SHIP_SAIL_WIDTH, SHIP_SAIL_HEIGHT),
      sailMaterial
    );
    sail.rotation.y = Math.PI / 2;
    sail.position.set(0.15, SHIP_DECK_HEIGHT + SHIP_MAST_HEIGHT * 0.55, 0);
    ship.add(sail);

    ship.position.set(0.5 + (SHIP_LENGTH_CELLS - 1) / 2, CELL_HEIGHT, 0.5);
    scene.add(ship);

    const gridCenter = new THREE.Vector3(4.5, 0, 4.5);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(gridCenter);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = Math.PI * 0.45;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      grid.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const { row, col, topVertexIndices: indices } = mesh.userData as {
          row: number;
          col: number;
          topVertexIndices: number[];
        };
        const wave = WAVE_AMPLITUDE * Math.sin(t * WAVE_SPEED + row * WAVE_PHASE + col * WAVE_PHASE);
        const pos = (mesh.geometry as THREE.BufferGeometry).attributes.position;
        for (let i = 0; i < indices.length; i++) {
          pos.setY(indices[i], halfHeight + wave);
        }
        pos.needsUpdate = true;
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const aspect = w / h;
      cameraRef.current.left = -frustumSize * aspect * 0.5;
      cameraRef.current.right = frustumSize * aspect * 0.5;
      cameraRef.current.top = frustumSize * 0.5;
      cameraRef.current.bottom = -frustumSize * 0.5;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      controls.dispose();
      cellGeometries.forEach((g) => g.dispose());
      waterMaterial.dispose();
      hullMaterial.dispose();
      fenderMaterial.dispose();
      sailMaterial.dispose();
      ship.traverse((o) => {
        if (o instanceof THREE.Mesh && o.geometry) o.geometry.dispose();
      });
      const renderer = rendererRef.current;
      if (renderer?.domElement && containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      rendererRef.current = null;
      cameraRef.current = null;
      sceneRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="field3d-container" />;
};

export default Field3D;
