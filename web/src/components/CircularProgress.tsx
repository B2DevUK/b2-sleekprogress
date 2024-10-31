import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StyleOptions } from '@/types';
import { getPositionClasses, getPositionStyle } from '@/utils/positions';
import { getDefaultStyles, getSizeClasses } from '@/utils/styles';

interface CircularProgressProps {
  icon: LucideIcon;
  label: string;
  progress: number;
  style?: StyleOptions;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  icon: Icon, 
  label, 
  progress,
  style = {} 
}) => {
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  const styles = getDefaultStyles(style);
  const sizeConfig = getSizeClasses(style.size);

  return (
    <div className={getPositionClasses(style.position)} style={getPositionStyle(style.position)}>
      <div className="relative flex flex-col items-center p-4 rounded-lg" style={{ backgroundColor: styles.backgroundColor }}>
        <div className={`relative ${sizeConfig.icon}`}>
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            <circle 
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="stroke-gray-700/50 fill-none"
              strokeWidth={strokeWidth}
            />
            <circle 
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="fill-none transition-all duration-150 ease-linear"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ stroke: styles.progressColor }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={24} style={{ color: styles.iconColor }} />
          </div>
        </div>
        
        <div className={`mt-2 font-medium ${sizeConfig.text}`} style={{ color: styles.textColor }}>
          {label}
        </div>
        
        <div className={`mt-1 text-gray-400 ${sizeConfig.text}`}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};