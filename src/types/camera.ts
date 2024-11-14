// src/types/camera.ts
import { Position } from './common';

export interface CameraState {
  position: Position;
  target: Position;
  zoom: number;
}

export interface CameraActions {
  setCameraPosition: (position: Position) => void;
  setCameraTarget: (target: Position) => void;
  setZoom: (zoom: number) => void;
}

export type CameraSlice = CameraState & CameraActions;
