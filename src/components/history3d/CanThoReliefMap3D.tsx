import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { HISTORICAL_ERAS, HistoricalEra } from '../../data/historyData.ts';
import {
  Compass,
  Layers,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Droplets,
  Calendar,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

interface Props {
  selectedEraId: string;
  onSelectEra: (era: HistoricalEra) => void;
}

export const CanThoReliefMap3D: React.FC<Props> = ({ selectedEraId, onSelectEra }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'day' | 'golden' | 'night'>('golden');
  const [waterLevelSeason, setWaterLevelSeason] = useState<'normal' | 'flood'>('flood');
  const [showElevationGrid, setShowElevationGrid] = useState(true);
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  // References to keep animation loop & controls persistent
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const landmarkGroupsRef = useRef<Map<string, THREE.Group>>(new Map());

  // Current era object
  const currentEra = HISTORICAL_ERAS.find(e => e.id === selectedEraId) || HISTORICAL_ERAS[0];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt performance
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(lightingPreset === 'night' ? 0x070b14 : 0x0c1322);
    scene.fog = new THREE.FogExp2(lightingPreset === 'night' ? 0x070b14 : 0x0c1322, 0.022);

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 22, 28);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);

    // 6. Lighting rig (Warm key + Cool hemisphere)
    const hemiLight = new THREE.HemisphereLight(0xffecd2, 0x112233, 1.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff3d6, 2.0);
    dirLight.position.set(20, 35, 18);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    scene.add(dirLight);

    // 7. Procedural Terrain (Mekong Delta / Cần Thơ Relief)
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // Relief Plane with Sông Hậu & Sông Cần Thơ Riverbed Depression
    const terrainGeo = new THREE.PlaneGeometry(42, 34, 120, 100);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // River path for Sông Hậu: diagonal curve from top-left (NW) to bottom-right (SE)
      const riverCenter = x * 0.45 + Math.sin(x * 0.25) * 2.2;
      const distToRiver = Math.abs(z - riverCenter);

      // Branch river: Rạch Cần Thơ / Tham Tướng
      const distToCanThoRiver = Math.hypot(x + 2, z - 2);

      let elevation = 0;
      if (distToRiver < 3.2) {
        // Deep riverbed
        elevation = -0.7 + Math.sin(distToRiver / 3.2 * Math.PI) * 0.3;
      } else if (distToRiver < 5.5) {
        // Riverbank gentle slope
        elevation = -0.2 + (distToRiver - 3.2) * 0.3;
      } else {
        // Alluvial delta plain with slight mounds (Cồn Khương, Cồn Ấu)
        elevation = 0.4 + Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.35;
      }

      // Elevate Lộ Vòng Cung area slightly (alluvial levee)
      if (x > 4 && x < 12 && z > 4 && z < 12) {
        elevation += 0.5;
      }

      pos.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    // Procedural delta earth texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#1b382b'); // Alluvial vegetation green
    gradient.addColorStop(0.3, '#2a4d38');
    gradient.addColorStop(0.6, '#3a5f45');
    gradient.addColorStop(1, '#1e3026');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle alluvial soil flecks
    ctx.fillStyle = 'rgba(180, 140, 80, 0.15)';
    for (let j = 0; j < 300; j++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
    }

    const terrainTex = new THREE.CanvasTexture(canvas);
    terrainTex.colorSpace = THREE.SRGBColorSpace;
    terrainTex.wrapS = THREE.RepeatWrapping;
    terrainTex.wrapT = THREE.RepeatWrapping;
    terrainTex.repeat.set(4, 4);

    const terrainMat = new THREE.MeshStandardMaterial({
      map: terrainTex,
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = !isSoftwareGl;
    terrainGroup.add(terrainMesh);

    // River Water Plane (Sông Hậu - Nước đỏ phù sa)
    const waterGeo = new THREE.PlaneGeometry(42, 34, 32, 32);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x935e38, // Alluvial silt water color (nước phù sa Tây Đô)
      roughness: 0.15,
      metalness: 0.45,
      transparent: true,
      opacity: 0.88,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.y = -0.15;
    waterMesh.receiveShadow = !isSoftwareGl;
    terrainGroup.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Contact shadow / Base Pedestal
    const baseGeo = new THREE.BoxGeometry(43, 1.8, 35);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
      metalness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.3;
    terrainGroup.add(baseMesh);

    // 8. Composite 3-12 Part Procedural Landmark Models for 4 Eras
    const landmarkMap = new Map<string, THREE.Group>();

    // ERA 1: Đạo Trấn Giang (1739) - coordinates: { x: -8, y: 0.6, z: 6 }
    const tranGiangGroup = new THREE.Group();
    tranGiangGroup.position.set(-8, 0.4, 6);
    tranGiangGroup.name = 'tran-giang-1739';

    // 1. Stockade wooden fort base
    const fortBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.9, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 })
    );
    fortBase.position.y = 0.3;
    tranGiangGroup.add(fortBase);

    // 2. Watchtower palisade
    const watchTower = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1.6, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 })
    );
    watchTower.position.y = 1.3;
    tranGiangGroup.add(watchTower);

    // 3. Thatched roof
    const fortRoof = new THREE.Mesh(
      new THREE.ConeGeometry(1.1, 0.7, 4),
      new THREE.MeshStandardMaterial({ color: 0x6e4720, roughness: 0.95 })
    );
    fortRoof.position.y = 2.4;
    fortRoof.rotation.y = Math.PI / 4;
    tranGiangGroup.add(fortRoof);

    // 4. Ancient wooden sail boat on river (thuyền buồm gỗ họ Mạc)
    const boatHull = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.4, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.7 })
    );
    boatHull.position.set(1.5, -0.3, 0.5);
    tranGiangGroup.add(boatHull);

    const boatMast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.6 })
    );
    boatMast.position.set(1.5, 0.6, 0.5);
    tranGiangGroup.add(boatMast);

    const boatSail = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5, side: THREE.DoubleSide })
    );
    boatSail.position.set(1.9, 0.7, 0.5);
    tranGiangGroup.add(boatSail);

    // 5. Signal beacon pin
    const beaconGeo = new THREE.ConeGeometry(0.3, 0.9, 6);
    beaconGeo.rotateX(Math.PI);
    const beaconMat1 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const beaconMesh1 = new THREE.Mesh(beaconGeo, beaconMat1);
    beaconMesh1.position.y = 3.6;
    tranGiangGroup.add(beaconMesh1);

    scene.add(tranGiangGroup);
    landmarkMap.set('tran-giang-1739', tranGiangGroup);

    // ERA 2: Hạt Cần Thơ (1876) - coordinates: { x: 2, y: 0.7, z: -2 }
    const hatCanThoGroup = new THREE.Group();
    hatCanThoGroup.position.set(2, 0.5, -2);
    hatCanThoGroup.name = 'hat-can-tho-1876';

    // 1. Dinh Tham Biện colonial building base
    const colonialBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.9, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xf5eed7, roughness: 0.5 })
    );
    colonialBase.position.y = 0.45;
    hatCanThoGroup.add(colonialBase);

    // 2. Mansard / tile roof
    const colonialRoof = new THREE.Mesh(
      new THREE.ConeGeometry(1.7, 0.8, 4),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 })
    );
    colonialRoof.position.y = 1.3;
    colonialRoof.rotation.y = Math.PI / 4;
    hatCanThoGroup.add(colonialRoof);

    // 3. Pier / Quai de Commerce wooden deck stretching to river
    const pierDeck = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.15, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x4a3525, roughness: 0.8 })
    );
    pierDeck.position.set(-1.4, -0.2, 0.6);
    hatCanThoGroup.add(pierDeck);

    // 4. Street lamp & steam merchant launch
    const steamLaunch = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.35, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 })
    );
    steamLaunch.position.set(-2.2, -0.4, 0.8);
    hatCanThoGroup.add(steamLaunch);

    const funnel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.6),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 })
    );
    funnel.position.set(-2.2, 0.0, 0.8);
    hatCanThoGroup.add(funnel);

    // 5. Beacon pin
    const beaconMat2 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const beaconMesh2 = new THREE.Mesh(beaconGeo, beaconMat2);
    beaconMesh2.position.y = 3.2;
    hatCanThoGroup.add(beaconMesh2);

    scene.add(hatCanThoGroup);
    landmarkMap.set('hat-can-tho-1876', hatCanThoGroup);

    // ERA 3: Chi bộ Cờ Đỏ (1929) - coordinates: { x: -14, y: 0.5, z: -10 }
    const coDoGroup = new THREE.Group();
    coDoGroup.position.set(-14, 0.3, -10);
    coDoGroup.name = 'co-do-1929';

    // 1. Plantation thatched meeting cottage
    const cottageBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.7, 1.3),
      new THREE.MeshStandardMaterial({ color: 0x7c5e3d, roughness: 0.9 })
    );
    cottageBase.position.y = 0.35;
    coDoGroup.add(cottageBase);

    // 2. Thatch roof (mái lá dừa nước)
    const cottageRoof = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 0.6, 4),
      new THREE.MeshStandardMaterial({ color: 0x5a422a, roughness: 0.95 })
    );
    cottageRoof.position.y = 0.95;
    cottageRoof.rotation.y = Math.PI / 4;
    coDoGroup.add(cottageRoof);

    // 3. Secret red flag staff with glowing emblem
    const flagStaff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5 })
    );
    flagStaff.position.set(1.2, 1.1, 0);
    coDoGroup.add(flagStaff);

    const redFlag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c, emissiveIntensity: 0.6, side: THREE.DoubleSide })
    );
    redFlag.position.set(1.6, 1.8, 0);
    coDoGroup.add(redFlag);

    // 4. Coconut palms around cottage
    const palmTrunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.1, 1.4, 6),
      new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.9 })
    );
    palmTrunk.position.set(-1.2, 0.7, 0.8);
    palmTrunk.rotation.z = -0.15;
    coDoGroup.add(palmTrunk);

    const palmLeaves = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 6, 6),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 })
    );
    palmLeaves.position.set(-1.4, 1.4, 0.8);
    coDoGroup.add(palmLeaves);

    // 5. Beacon pin
    const beaconMat3 = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });
    const beaconMesh3 = new THREE.Mesh(beaconGeo, beaconMat3);
    beaconMesh3.position.y = 3.0;
    coDoGroup.add(beaconMesh3);

    scene.add(coDoGroup);
    landmarkMap.set('co-do-1929', coDoGroup);

    // ERA 4: Tuyến lửa Lộ Vòng Cung (1968) - coordinates: { x: 8, y: 0.8, z: 8 }
    const vongCungGroup = new THREE.Group();
    vongCungGroup.position.set(8, 0.6, 8);
    vongCungGroup.name = 'lo-vong-cung-1968';

    // 1. Curved road ribbon (arc route)
    const roadCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.5, 0.1, 2.0),
      new THREE.Vector3(0, 0.15, 0),
      new THREE.Vector3(3.5, 0.1, -2.0)
    );
    const roadGeo = new THREE.TubeGeometry(roadCurve, 20, 0.35, 6, false);
    const roadMesh = new THREE.Mesh(
      roadGeo,
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9 })
    );
    vongCungGroup.add(roadMesh);

    // 2. Secret subterranean bunker (hầm công sự)
    const bunkerMound = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x1e3a1e, roughness: 0.95 })
    );
    bunkerMound.position.set(-0.8, 0.1, -1.0);
    vongCungGroup.add(bunkerMound);

    // 3. Victory monument flame
    const monumentBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.3, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5, metalness: 0.4 })
    );
    monumentBase.position.set(1.2, 0.2, 1.0);
    vongCungGroup.add(monumentBase);

    const flameStele = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 1.4, 5),
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xea580c,
        emissiveIntensity: 0.9,
        roughness: 0.2
      })
    );
    flameStele.position.set(1.2, 1.0, 1.0);
    vongCungGroup.add(flameStele);

    // 4. Beacon pin
    const beaconMat4 = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xc2410c,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });
    const beaconMesh4 = new THREE.Mesh(beaconGeo, beaconMat4);
    beaconMesh4.position.y = 3.2;
    vongCungGroup.add(beaconMesh4);

    scene.add(vongCungGroup);
    landmarkMap.set('lo-vong-cung-1968', vongCungGroup);
    landmarkGroupsRef.current = landmarkMap;

    // 9. Raycasting for Landmark Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      let foundHover: string | null = null;

      for (const [id, grp] of landmarkMap.entries()) {
        const intersects = raycaster.intersectObjects(grp.children, true);
        if (intersects.length > 0) {
          foundHover = id;
          break;
        }
      }
      setHoveredLandmark(foundHover);
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      for (const [id, grp] of landmarkMap.entries()) {
        const intersects = raycaster.intersectObjects(grp.children, true);
        if (intersects.length > 0) {
          const era = HISTORICAL_ERAS.find(x => x.id === id);
          if (era) {
            onSelectEra(era);
          }
          break;
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handlePointerDown);

    // 10. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Subtle water ripple animation
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = (waterLevelSeason === 'flood' ? 0.05 : -0.2) + Math.sin(elapsed * 1.5) * 0.03;
      }

      // Beacon bounce & rotation animation
      landmarkMap.forEach((grp, id) => {
        const beacon = grp.children[grp.children.length - 1];
        if (beacon) {
          beacon.rotation.y = elapsed * 1.2;
          const isSelected = id === selectedEraId;
          const isHovered = id === hoveredLandmark;
          const scale = isSelected ? 1.4 : isHovered ? 1.2 : 1.0;
          beacon.scale.set(scale, scale, scale);
          beacon.position.y = (isSelected ? 3.8 : 3.2) + Math.sin(elapsed * 3.0 + grp.position.x) * 0.2;
        }
      });

      // Smooth Camera Damping towards target if scheduled
      if (targetCameraPosRef.current && targetLookAtRef.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.05);
        controlsRef.current.target.lerp(targetLookAtRef.current, 0.05);
        if (cameraRef.current.position.distanceTo(targetCameraPosRef.current) < 0.2) {
          targetCameraPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      renderer.dispose();
    };
  }, [lightingPreset, waterLevelSeason]);

  // Smooth camera glide when selected era changes
  useEffect(() => {
    if (!currentEra || !cameraRef.current || !controlsRef.current) return;
    const { x, y, z } = currentEra.coordinates;
    targetLookAtRef.current = new THREE.Vector3(x, y, z);
    targetCameraPosRef.current = new THREE.Vector3(x + 4, y + 10, z + 12);
  }, [selectedEraId]);

  const handleResetCamera = () => {
    targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
    targetCameraPosRef.current = new THREE.Vector3(0, 22, 28);
  };

  return (
    <div className="relative w-full h-[640px] md:h-[720px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      {/* Top Bar: Title & Status Badges */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/80 shadow-lg">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Sa Bàn 3D Lịch Sử</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                WebGL 60FPS
              </span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-white font-serif-title">
              Không Gian Dòng Chảy Lịch Sử Tây Đô (1739 - 1968)
            </h3>
          </div>
        </div>

        {/* Current Era Pill & Quick Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">{currentEra.yearLabel}</span>
            <span>:</span>
            <span className="text-white font-medium">{currentEra.name}</span>
          </div>

          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-lg"
            title={isCinemaMode ? 'Hiện thanh điều khiển' : 'Ẩn thanh điều khiển (Chế độ Zen)'}
          >
            {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Hover Landmark Tooltip */}
      {hoveredLandmark && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-slate-900/95 border border-amber-500/50 px-4 py-2 rounded-xl shadow-xl text-center">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Điểm mốc sa bàn</p>
          <p className="text-sm font-bold text-white">
            {HISTORICAL_ERAS.find(e => e.id === hoveredLandmark)?.name}
          </p>
          <p className="text-[11px] text-slate-400">Nhấp chuột để tiếp cận dữ liệu lịch sử</p>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-4xl transition-all duration-300 ease-in-out ${
          isCinemaMode ? 'translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl p-3 md:p-4 shadow-2xl flex flex-col gap-3">
          {/* Era Timeline Switcher */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {HISTORICAL_ERAS.map((era) => {
              const isActive = era.id === selectedEraId;
              return (
                <button
                  key={era.id}
                  onClick={() => onSelectEra(era)}
                  className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                      {era.yearLabel}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-700/60 text-slate-300">
                      {era.gradeLevel}
                    </span>
                  </div>
                  <span className="font-bold truncate text-xs">{era.name}</span>
                  <span className="text-[10px] text-slate-400 truncate">{era.location}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-controls: Lighting, River Season, Camera Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 hidden sm:inline">Thời gian ánh sáng:</span>
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => setLightingPreset('day')}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 ${
                    lightingPreset === 'day' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3 h-3" /> Ngày
                </button>
                <button
                  onClick={() => setLightingPreset('golden')}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 ${
                    lightingPreset === 'golden' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" /> Chiều Tây Đô
                </button>
                <button
                  onClick={() => setLightingPreset('night')}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 ${
                    lightingPreset === 'night' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3 h-3" /> Đêm
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 hidden sm:inline">Mực nước Sông Hậu:</span>
              <button
                onClick={() => setWaterLevelSeason(s => s === 'flood' ? 'normal' : 'flood')}
                className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                  waterLevelSeason === 'flood'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-semibold'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                {waterLevelSeason === 'flood' ? 'Mùa nước nổi (Triều cường)' : 'Mùa cạn'}
              </button>

              <button
                onClick={handleResetCamera}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
                title="Đặt lại góc nhìn toàn cảnh sa bàn"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Toàn cảnh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
