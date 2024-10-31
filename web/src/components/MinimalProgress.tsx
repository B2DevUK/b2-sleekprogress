import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StyleOptions } from '@/types';
import { getPositionClasses, getPositionStyle } from '@/utils/positions';
import { getDefaultStyles, getSizeClasses } from '@/utils/styles';

interface MinimalProgressProps {
  icon: LucideIcon;
  label: string;
  progress: number;
  style?: StyleOptions;
}

export const MinimalProgress: React.FC<MinimalProgressProps> = ({ 
  icon: Icon, 
  label, 
  progress,
  style = {} 
}) => {
  const sizeConfig = getSizeClasses(style.size);
  const styles = getDefaultStyles(style);

  return (
    <div className={getPositionClasses(style.position)} style={getPositionStyle(style.position)}>
      <div className={sizeConfig.container}>
        <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: styles.backgroundColor }}>
          <div className={`${sizeConfig.progressHeight} bg-gray-800/50 overflow-hidden rounded-full`}>
            <div 
              className="h-full transition-all duration-200 ease-linear"
              style={{ 
                width: `${progress}%`,
                backgroundColor: styles.progressColor
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className={sizeConfig.text} style={{ color: styles.textColor }}>{label}</div>
            <div className={sizeConfig.text} style={{ color: styles.textColor }}>{progress}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};