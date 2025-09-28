/**
 * Minimal GLTFLoader stub for testing
 */

import { Object3D } from '../../three-stub.js';

export class GLTFLoader {
  constructor() {
    // Stub constructor
  }
  
  async loadAsync(url) {
    // Return a minimal GLTF-like structure
    return {
      scene: new Object3D(),
      scenes: [],
      cameras: [],
      animations: []
    };
  }
  
  load(url, onLoad, onProgress, onError) {
    // Simulate async loading
    setTimeout(() => {
      if (onLoad) {
        onLoad({
          scene: new Object3D(),
          scenes: [],
          cameras: [],
          animations: []
        });
      }
    }, 100);
  }
}