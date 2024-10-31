export type ProgressType = 'circular' | 'linear' | 'minimal';

export interface StyleOptions {
  backgroundColor?: string;
  progressColor?: string;
  textColor?: string;
  iconColor?: string;
  size?: 'sm' | 'md' | 'lg'; 
  position?: {
    vertical?: 'top' | 'center' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
    offsetX?: number;
    offsetY?: number;
  };
}

export interface ProgressOptions {
  type: ProgressType;
  duration: number;
  label: string;
  canCancel: boolean;
  style?: StyleOptions;
}

export interface SizeConfig {
  container: string;
  icon: string;
  iconSize: number;
  progressHeight: string;
  text: string;
}

export interface NuiMessage {
  action: string;
  data?: ProgressOptions;
}