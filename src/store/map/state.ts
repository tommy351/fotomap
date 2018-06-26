import BaseLayer from 'ol/layer/base';
import VectorSource from 'ol/source/vector';

export interface MapState {
  base: BaseLayer;
  sources: VectorSource[];
  center: [number, number];
  zoom: number;
  rotation: number;
}
