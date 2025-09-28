/**
 * Minimal Three.js stub for testing loading functionality
 * This allows the application to load without external CDN dependencies
 */

// Core Three.js stub classes
export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  
  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }
  
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
}

export class Color {
  constructor(color = 0xffffff) {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    if (typeof color === 'number') {
      this.setHex(color);
    }
  }
  
  setHex(hex) {
    this.r = ((hex >> 16) & 255) / 255;
    this.g = ((hex >> 8) & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  }
  
  getHex() {
    return (Math.round(this.r * 255) << 16) + (Math.round(this.g * 255) << 8) + Math.round(this.b * 255);
  }
}

export class Object3D {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.userData = {};
    this.visible = true;
    this.children = [];
    this.parent = null;
    this.material = null;
  }
  
  add(object) {
    this.children.push(object);
    object.parent = this;
  }
  
  remove(object) {
    const index = this.children.indexOf(object);
    if (index !== -1) {
      this.children.splice(index, 1);
      object.parent = null;
    }
  }
  
  clone() {
    const cloned = new this.constructor();
    cloned.position.copy(this.position);
    cloned.rotation.copy(this.rotation);
    cloned.scale.copy(this.scale);
    cloned.userData = { ...this.userData };
    cloned.visible = this.visible;
    return cloned;
  }
  
  traverse(callback) {
    callback(this);
    this.children.forEach(child => child.traverse(callback));
  }
  
  getWorldDirection(target) {
    target.set(0, 0, -1);
    return target;
  }
}

export class Mesh extends Object3D {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
    this.isMesh = true;
    this.castShadow = false;
    this.receiveShadow = false;
  }
}

export class Scene extends Object3D {
  constructor() {
    super();
    this.background = new Color(0x000000);
    this.fog = null;
  }
}

export class PerspectiveCamera extends Object3D {
  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    super();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }
}

export class WebGLRenderer {
  constructor(parameters = {}) {
    this.domElement = document.createElement('canvas');
    this.domElement.width = 800;
    this.domElement.height = 600;
    this.shadowMap = { enabled: false, type: 0 };
    this.outputColorSpace = 'srgb';
    this.toneMapping = 0;
    this.toneMappingExposure = 1;
  }
  
  setSize(width, height) {
    this.domElement.width = width;
    this.domElement.height = height;
  }
  
  render(scene, camera) {
    // Stub - no actual rendering
  }
}

// Geometry stubs
export class SphereGeometry {
  constructor(radius = 1, widthSegments = 32, heightSegments = 32) {
    this.radius = radius;
  }
}

export class BoxGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }
}

export class ConeGeometry {
  constructor(radius = 1, height = 1, radialSegments = 8) {
    this.radius = radius;
    this.height = height;
  }
}

export class CylinderGeometry {
  constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8) {
    this.radiusTop = radiusTop;
    this.radiusBottom = radiusBottom;
    this.height = height;
  }
}

export class TorusGeometry {
  constructor(radius = 1, tube = 0.4, radialSegments = 8, tubularSegments = 6) {
    this.radius = radius;
    this.tube = tube;
  }
}

export class OctahedronGeometry {
  constructor(radius = 1, detail = 0) {
    this.radius = radius;
  }
}

export class TetrahedronGeometry {
  constructor(radius = 1, detail = 0) {
    this.radius = radius;
  }
}

export class DodecahedronGeometry {
  constructor(radius = 1, detail = 0) {
    this.radius = radius;
  }
}

export class IcosahedronGeometry {
  constructor(radius = 1, detail = 0) {
    this.radius = radius;
  }
}

export class PlaneGeometry {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    this.width = width;
    this.height = height;
    // Add basic attributes that the code might expect
    this.attributes = {
      position: { array: new Float32Array([0, 0, 0]), count: 1 },
      normal: { array: new Float32Array([0, 1, 0]), count: 1 },
      uv: { array: new Float32Array([0, 0]), count: 1 }
    };
  }
}

export class CapsuleGeometry {
  constructor(radius = 1, length = 1) {
    this.radius = radius;
    this.length = length;
  }
}

// Material stubs
export class MeshLambertMaterial {
  constructor(parameters = {}) {
    this.color = new Color(parameters.color || 0xffffff);
    this.transparent = parameters.transparent || false;
    this.opacity = parameters.opacity || 1;
  }
}

export class MeshBasicMaterial {
  constructor(parameters = {}) {
    this.color = new Color(parameters.color || 0xffffff);
    this.transparent = parameters.transparent || false;
    this.opacity = parameters.opacity || 1;
    this.visible = parameters.visible !== false;
  }
}

// Lighting stubs
export class DirectionalLight extends Object3D {
  constructor(color = 0xffffff, intensity = 1) {
    super();
    this.color = new Color(color);
    this.intensity = intensity;
    this.castShadow = false;
    this.shadow = { camera: {}, mapSize: { width: 1024, height: 1024 } };
  }
}

export class AmbientLight extends Object3D {
  constructor(color = 0xffffff, intensity = 1) {
    super();
    this.color = new Color(color);
    this.intensity = intensity;
  }
}

export class HemisphereLight extends Object3D {
  constructor(skyColor = 0xffffff, groundColor = 0xffffff, intensity = 1) {
    super();
    this.skyColor = new Color(skyColor);
    this.groundColor = new Color(groundColor);
    this.intensity = intensity;
  }
}

// Utility classes
export class Clock {
  constructor() {
    this.startTime = Date.now();
  }
  
  getDelta() {
    return 0.016; // Simulate 60fps
  }
}

export class Raycaster {
  constructor() {
    this.ray = { origin: new Vector3(), direction: new Vector3() };
  }
  
  setFromCamera(mouse, camera) {
    // Stub implementation
  }
  
  intersectObjects(objects) {
    return []; // No intersections in stub
  }
}

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Fog {
  constructor(color, near, far) {
    this.color = new Color(color);
    this.near = near;
    this.far = far;
  }
}

// Constants
export const PCFSoftShadowMap = 1;
export const SRGBColorSpace = 'srgb';
export const ACESFilmicToneMapping = 2;

// Export everything as default THREE object for compatibility
const THREE = {
  Vector3,
  Vector2,
  Color,
  Object3D,
  Mesh,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  TorusGeometry,
  OctahedronGeometry,
  TetrahedronGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  PlaneGeometry,
  CapsuleGeometry,
  MeshLambertMaterial,
  MeshBasicMaterial,
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  Clock,
  Raycaster,
  Fog,
  PCFSoftShadowMap,
  SRGBColorSpace,
  ACESFilmicToneMapping
};

export default THREE;