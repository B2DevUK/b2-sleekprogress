import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StyleOptions } from '@/types';
import { getPositionClasses, getPositionStyle } from '@/utils/positions';
import { getDefaultStyles, getSizeClasses } from '@/utils/styles';

interface LinearProgressProps {
  icon: LucideIcon;
  label: string;
  progress: number;
  style?: StyleOptions;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({ 
  icon: Icon, 
  label, 
  progress,
  style = {} 
}) => {
  const sizeConfig = getSizeClasses(style.size);
  const styles = getDefaultStyles(style);

  return (
    <div className={getPositionClasses(style.position)} style={getPositionStyle(style.position)}>
      <div className={`${sizeConfig.container} border border-gray-700/50 p-4 rounded-lg`} style={{ backgroundColor: styles.backgroundColor }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-gray-800/50">
            <Icon size={sizeConfig.iconSize} style={{ color: styles.iconColor }} />
          </div>
          <div className="flex-1">
            <div className={`${sizeConfig.text} font-medium`} style={{ color: styles.textColor }}>{label}</div>
            <div className={`${sizeConfig.text} text-gray-400 mt-0.5`}>{progress}%</div>
          </div>
        </div>
        <div className={`${sizeConfig.progressHeight} bg-gray-800/50 overflow-hidden rounded-full`}>
          <div 
            className="h-full transition-all duration-200 ease-linear"
            style={{ 
              width: `${progress}%`,
              backgroundColor: styles.progressColor
            }}
          />
        </div>
      </div>
    </div>
  );
};