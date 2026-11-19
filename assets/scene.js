// Scroll-linked 3D: the Cude mark morphs into a code window, a provider constellation,
// an agent graph and finally a calm ring at the download section.
import * as THREE from 'three';

const root = document.documentElement;
const host = document.getElementById('stage');
if (!root.classList.contains('no3d') && host) start();

function start() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch { root.classList.add('no3d'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const N = 1100;
  const geo = new THREE.BoxGeometry(0.058, 0.058, 0.058);
  const mat = new THREE.MeshStandardMaterial({ color: 0xe2a679, roughness: 0.42, metalness: 0.25, transparent: true, opacity: 1 });
  const mesh = new THREE.InstancedMesh(geo, mat, N);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffc9a0, 0.8); rim.position.set(-5, -2, -4); scene.add(rim);

  // ---------- target shapes ----------
  const rnd = mulberry32(7);
  const LOGO = [
    [[495,373],[488,366],[480,362],[465,361],[459,363],[294,463],[289,470],[290,524],[294,527],[301,527],[485,417],[495,407],[500,395],[500,385]],
    [[219,195],[209,200],[201,212],[201,226],[205,234],[212,241],[275,285],[273,289],[208,330],[203,336],[200,343],[200,356],[203,363],[211,371],[226,375],[238,371],[342,307],[348,301],[352,293],[353,282],[350,273],[343,265],[236,196]],
    [[288,29],[270,29],[255,35],[75,146],[64,156],[55,176],[55,389],[61,405],[74,419],[253,527],[262,526],[266,520],[266,472],[264,467],[259,462],[119,379],[114,372],[113,200],[117,192],[266,100],[278,95],[287,97],[460,204],[475,205],[486,201],[493,195],[500,180],[498,163],[491,152],[485,147],[303,35]]
  ];
  const inPoly = (x, y, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const logo = []; while (logo.length < N) { const x = 40 + rnd() * 480, y = 20 + rnd() * 520; if (LOGO.some(p => inPoly(x, y, p))) logo.push(new THREE.Vector3((x - 278) / 135, -(y - 278) / 135, (rnd() - 0.5) * 0.32)); }

  const code = []; const W = 4.4, H = 2.9;
  const frame = Math.floor(N * 0.34);
  for (let i = 0; i < frame; i++) { const t = i / frame, per = 2 * (W + H), d = t * per; let x, y; if (d < W) { x = -W / 2 + d; y = H / 2; } else if (d < W + H) { x = W / 2; y = H / 2 - (d - W); } else if (d < 2 * W + H) { x = W / 2 - (d - W - H); y = -H / 2; } else { x = -W / 2; y = -H / 2 + (d - 2 * W - H); } code.push(new THREE.Vector3(x, y, 0)); }
  for (let i = 0; i < 3; i++) for (let k = 0; k < 6; k++) code.push(new THREE.Vector3(-W / 2 + 0.25 + i * 0.22 + (k % 2) * 0.04, H / 2 - 0.22 - Math.floor(k / 2) * 0.03, 0.05));
  const lines = [[0, 2.4], [0.3, 1.9], [0.3, 2.6], [0.6, 1.4], [0.3, 2.1], [0, 1.2], [0, 2.8], [0.3, 1.7], [0.6, 2.2], [0.3, 1.1]];
  while (code.length < N) { const li = (code.length) % lines.length, [indent, len] = lines[li]; const row = li; code.push(new THREE.Vector3(-W / 2 + 0.35 + indent + rnd() * len, H / 2 - 0.55 - row * 0.21, (rnd() - 0.5) * 0.06)); }

  const sphere = []; for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; const R = 2.05 + (i % 9 === 0 ? 0.35 : 0); sphere.push(new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R)); }

  const hubs = [new THREE.Vector3(0, 1.55, 0), new THREE.Vector3(-1.7, 0, 0.3), new THREE.Vector3(1.7, 0, -0.3), new THREE.Vector3(0, -1.55, 0)];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2]];
  const graph = []; const perHub = Math.floor(N * 0.13);
  hubs.forEach(h => { for (let i = 0; i < perHub; i++) { const v = randUnit(rnd).multiplyScalar(0.18 + rnd() * 0.3); graph.push(h.clone().add(v)); } });
  while (graph.length < N) { const [a, b] = edges[graph.length % edges.length]; const t = rnd(); graph.push(hubs[a].clone().lerp(hubs[b], t).add(randUnit(rnd).multiplyScalar(0.035))); }

  const ring = []; for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2, tube = (i * 7.31) % (Math.PI * 2); const R = 1.65, r = 0.16; ring.push(new THREE.Vector3((R + r * Math.cos(tube)) * Math.cos(a), (R + r * Math.cos(tube)) * Math.sin(a), r * Math.sin(tube))); }

  const shapes = [logo, code, sphere, graph, ring];
  const delay = Float32Array.from({ length: N }, () => rnd());
  const spin = Float32Array.from({ length: N }, () => rnd() * Math.PI * 2);

  // edge lines for the agent graph
  const lineGeo = new THREE.BufferGeometry().setFromPoints(edges.flatMap(([a, b]) => [hubs[a], hubs[b]]));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xe2a679, transparent: true, opacity: 0 });
  const edgeLines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(edgeLines);

  // ---------- per-stage placement (x as a fraction of half-width) ----------
  const layout = [
    { x: 0.5, y: 0.0, s: 1.0, ry: -0.35 },
    { x: 0.6, y: 0.42, s: 0.5, ry: -0.25 },
    { x: -0.5, y: 0.0, s: 0.95, ry: 0.6 },
    { x: 0.5, y: 0.0, s: 1.0, ry: -0.2 },
    { x: 0.5, y: 0.1, s: 0.8, ry: 0.0 }
  ];

  const markers = [...document.querySelectorAll('[data-stage]')].sort((a, b) => +a.dataset.stage - +b.dataset.stage);
  let target = 0, current = 0, pointerX = 0, pointerY = 0, px = 0, py = 0, running = true;
  function measure() {
    const mid = window.innerHeight * 0.5;
    const centers = markers.map(el => { const r = el.getBoundingClientRect(); return r.top + Math.min(r.height, window.innerHeight) * 0.5; });
    if (mid <= centers[0]) return 0;
    for (let i = 0; i < centers.length - 1; i++) if (mid <= centers[i + 1]) return i + (mid - centers[i]) / Math.max(1, centers[i + 1] - centers[i]);
    return centers.length - 1;
  }
  const onScroll = () => { target = measure(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', e => { pointerX = (e.clientX / window.innerWidth - 0.5); pointerY = (e.clientY / window.innerHeight - 0.5); }, { passive: true });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    onScroll();
  }
  window.addEventListener('resize', resize); resize();

  function applyTheme() {
    const accent = getComputedStyle(root).getPropertyValue('--accent').trim() || '#e2a679';
    mat.color.set(accent); lineMat.color.set(accent);
  }
  new MutationObserver(applyTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', applyTheme);
  applyTheme();

  document.addEventListener('visibilitychange', () => { running = document.visibilityState === 'visible'; if (running) { last = performance.now(); requestAnimationFrame(frameLoop); } });

  const dummy = new THREE.Object3D(); const tmp = new THREE.Vector3();
  const smooth = t => t * t * (3 - 2 * t);
  let last = performance.now(), time = 0;
  function frameLoop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; time += dt;
    current += (target - current) * Math.min(1, dt * 4.5);
    px += (pointerX - px) * Math.min(1, dt * 3); py += (pointerY - py) * Math.min(1, dt * 3);
    const i0 = Math.max(0, Math.min(shapes.length - 1, Math.floor(current)));
    const i1 = Math.min(shapes.length - 1, i0 + 1), f = current - i0;
    const A = shapes[i0], B = shapes[i1];
    for (let i = 0; i < N; i++) {
      const local = smooth(Math.max(0, Math.min(1, (f - delay[i] * 0.35) / 0.65)));
      tmp.copy(A[i]).lerp(B[i], local);
      const lift = Math.sin(local * Math.PI) * 0.35; tmp.z += lift * (delay[i] - 0.5);
      dummy.position.copy(tmp);
      dummy.rotation.set(spin[i] + time * 0.3, spin[i] * 0.7 + time * 0.2, 0);
      const sc = 1 + Math.sin(local * Math.PI) * 0.6; dummy.scale.setScalar(sc);
      dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
    const narrow = camera.aspect < 0.95;
    const L0 = layout[i0], L1 = layout[i1], g = smooth(f);
    const x = narrow ? 0 : (L0.x + (L1.x - L0.x) * g) * halfW;
    group.position.set(x, (L0.y + (L1.y - L0.y) * g) * 3, narrow ? -2.5 : 0);
    group.scale.setScalar((L0.s + (L1.s - L0.s) * g) * (narrow ? 0.8 : 1));
    group.rotation.y = (L0.ry + (L1.ry - L0.ry) * g) + time * 0.08 + px * 0.5;
    group.rotation.x = py * 0.35 + Math.sin(time * 0.4) * 0.04;
    mat.opacity = narrow ? 0.45 : 1;
    const graphWeight = Math.max(0, 1 - Math.abs(current - 3));
    lineMat.opacity = graphWeight * (narrow ? 0.25 : 0.55);
    renderer.render(scene, camera);
    requestAnimationFrame(frameLoop);
  }
  requestAnimationFrame(frameLoop);
  root.classList.add('has3d');
}

function randUnit(rnd) { const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, s = Math.sqrt(1 - u * u); return new THREE.Vector3(s * Math.cos(th), s * Math.sin(th), u); }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
