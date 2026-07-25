import * as THREE from "three";

export class DragonSpinePhysics {
  numSegments: number;
  segmentLength: number;
  positions: THREE.Vector3[];
  rotations: THREE.Euler[];

  constructor(numSegments = 10, segmentLength = 0.4) {
    this.numSegments = numSegments;
    this.segmentLength = segmentLength;
    this.positions = Array.from({ length: numSegments }, () => new THREE.Vector3(0, 0, 0));
    this.rotations = Array.from({ length: numSegments }, () => new THREE.Euler(0, 0, 0));
  }

  update(headPos: THREE.Vector3, delta: number) {
    // 1. Set head position
    this.positions[0].copy(headPos);

    // 2. Solve inverse kinematics for tail segments
    for (let i = 1; i < this.numSegments; i++) {
      const prev = this.positions[i - 1];
      const curr = this.positions[i];

      const dir = new THREE.Vector3().subVectors(curr, prev);
      const dist = dir.length();

      if (dist > 0.001) {
        dir.normalize();
        curr.copy(prev).add(dir.multiplyScalar(this.segmentLength));
      }

      // Smooth segment rotation toward previous segment
      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      const dz = prev.z - curr.z;

      const yaw = Math.atan2(dx, dz);
      const pitch = Math.atan2(-dy, Math.hypot(dx, dz));

      this.rotations[i].set(pitch, yaw, 0);
    }
  }
}
