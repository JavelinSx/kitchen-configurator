// src/types/index.ts

// Импортируем все типы, которые нам нужны из каждого модуля
import type { Position, Dimensions } from './common';

import type {
  MaterialBase,
  TextureMaterial,
  ColorMaterial,
  Material,
  MaterialsState,
  MaterialsActions,
  MaterialsSlice,
} from './materials';

import type {
  ModuleType,
  ModuleBase,
  CabinetModule,
  DrawerModule,
  CountertopModule,
  KitchenModule,
  ModulesState,
  ModulesActions,
  ModulesSlice,
} from './modules';

import type { ModuleAnimation, AnimationState, AnimationActions, AnimationSlice } from './animation';

import type { ConfigStep, ConfigState, ConfigActions, ConfigSlice } from './config';

import type { ConfiguratorEvent, HistoryState, HistoryActions, HistorySlice } from './events';

import type { CameraState, CameraActions, CameraSlice } from './camera';

import type { UIState, UIActions, UISlice } from './ui';

import type { ScrollState, ScrollActions, ScrollSlice } from './scroll';

// Экспортируем все типы
export type {
  // Common
  Position,
  Dimensions,

  // Materials
  MaterialBase,
  TextureMaterial,
  ColorMaterial,
  Material,
  MaterialsState,
  MaterialsActions,
  MaterialsSlice,

  // Modules
  ModuleType,
  ModuleBase,
  CabinetModule,
  DrawerModule,
  CountertopModule,
  KitchenModule,
  ModulesState,
  ModulesActions,
  ModulesSlice,

  // Animation
  ModuleAnimation,
  AnimationState,
  AnimationActions,
  AnimationSlice,

  // Config
  ConfigStep,
  ConfigState,
  ConfigActions,
  ConfigSlice,

  // Events
  ConfiguratorEvent,
  HistoryState,
  HistoryActions,
  HistorySlice,

  // Camera
  CameraState,
  CameraActions,
  CameraSlice,

  // UI
  UIState,
  UIActions,
  UISlice,

  // Scroll
  ScrollState,
  ScrollActions,
  ScrollSlice,
};

// Определяем общий тип состояния хранилища
export interface StoreState
  extends MaterialsState,
    ModulesState,
    AnimationState,
    ConfigState,
    HistoryState,
    CameraState,
    UIState,
    ScrollState {}

// Определяем общий тип действий хранилища
export interface StoreActions
  extends MaterialsActions,
    ModulesActions,
    AnimationActions,
    ConfigActions,
    HistoryActions,
    CameraActions,
    UIActions,
    ScrollActions {}

// Определяем полный тип хранилища
export type KitchenStore = StoreState & StoreActions;
