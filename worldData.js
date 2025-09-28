

export class WorldData {
  constructor() {
    this.worldName = 'My World';
    this.version = '1.0.0';
  }

  saveWorld(createdObjects, historyData = null) {
    const worldData = {
      name: this.worldName,
      version: this.version,
      timestamp: new Date().toISOString(),
      objects: [],
      historyData: historyData
    };

    createdObjects.forEach(obj => {
      const objectData = {
        type: obj.userData.type || 'unknown',
        position: {
          x: obj.position.x,
          y: obj.position.y,
          z: obj.position.z
        },
        rotation: {
          x: obj.rotation.x,
          y: obj.rotation.y,
          z: obj.rotation.z
        },
        scale: {
          x: obj.scale.x,
          y: obj.scale.y,
          z: obj.scale.z
        }
      };

      if (obj.userData.shapeType) {
        objectData.shapeType = obj.userData.shapeType;
      }
      
      if (obj.userData.assetType) {
        objectData.assetType = obj.userData.assetType;
      }
      
      if (obj.userData.description) {
        objectData.description = obj.userData.description;
      }

      if (obj.material && obj.material.color) {
        objectData.color = obj.material.color.getHex();
      }

      worldData.objects.push(objectData);
    });

    const dataStr = JSON.stringify(worldData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${this.worldName.replace(/\s+/g, '_')}_${Date.now()}.json`;
    link.click();
    
    console.log('World saved:', worldData);
    return worldData;
  }

  loadWorld(file, objectCreator, scene, createdObjects) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const worldData = JSON.parse(e.target.result);
          
          // Validate world data
          if (!worldData || !Array.isArray(worldData.objects)) {
            throw new Error('Invalid world data format');
          }
          
          // Clear existing objects
          createdObjects.forEach(obj => {
            scene.remove(obj);
          });
          createdObjects.length = 0;

          // Load objects with better error handling
          let loadedCount = 0;
          let failedCount = 0;
          
          worldData.objects.forEach((objData, index) => {
            try {
              let newObj;
              
              if (objData.type === 'shape' && objData.shapeType) {
                newObj = objectCreator.createShape(objData.shapeType);
              } else if (objData.type === 'asset' && objData.assetType) {
                newObj = objectCreator.createAsset(objData.assetType);
              } else if (objData.type === 'complex' && objData.description) {
                newObj = objectCreator.createFromDescription(objData.description);
              } else {
                console.warn(`Object ${index}: Invalid or missing type/data:`, objData);
                failedCount++;
                return;
              }

              if (newObj) {
                // Apply saved transforms with fallback values
                const pos = objData.position || { x: 0, y: 0, z: 0 };
                const rot = objData.rotation || { x: 0, y: 0, z: 0 };
                const scale = objData.scale || { x: 1, y: 1, z: 1 };
                
                newObj.position.set(pos.x, pos.y, pos.z);
                newObj.rotation.set(rot.x, rot.y, rot.z);
                newObj.scale.set(scale.x, scale.y, scale.z);
                
                if (objData.color && newObj.material) {
                  newObj.material.color.setHex(objData.color);
                }
                
                createdObjects.push(newObj);
                loadedCount++;
              } else {
                console.warn(`Failed to create object ${index}:`, objData);
                failedCount++;
              }
            } catch (error) {
              console.error(`Error loading object ${index}:`, error, objData);
              failedCount++;
            }
          });
          
          console.log(`World loaded: ${loadedCount} objects (${failedCount} failed)`);
          resolve(worldData);
        } catch (error) {
          console.error('Failed to load world:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  exportWorldPreview(createdObjects) {
    // Generate a simple text description of the world
    let description = `World Preview:\n`;
    description += `Objects: ${createdObjects.length}\n\n`;
    
    const objectTypes = {};
    createdObjects.forEach(obj => {
      const type = obj.userData.shapeType || obj.userData.assetType || 'complex';
      objectTypes[type] = (objectTypes[type] || 0) + 1;
    });
    
    Object.entries(objectTypes).forEach(([type, count]) => {
      description += `${type}: ${count}\n`;
    });
    
    return description;
  }
}

