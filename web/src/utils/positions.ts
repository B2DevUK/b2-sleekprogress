import { StyleOptions } from '@/types';

export const getPositionClasses = (position?: StyleOptions['position']) => {
    const vertical = position?.vertical || 'bottom';
    const horizontal = position?.horizontal || 'center';
    
    const verticalClasses = {
      top: 'top-0 mt-10',
      center: 'top-1/2 -translate-y-1/2',
      bottom: 'bottom-0 mb-10'
    };
  
    const horizontalClasses = {
      left: 'left-0 ml-10',
      center: 'left-1/2 -translate-x-1/2',
      right: 'right-0 mr-10'
    };

    return `fixed pointer-events-none ${verticalClasses[vertical]} ${horizontalClasses[horizontal]}`;
  };
  
  export const getPositionStyle = (position?: StyleOptions['position']) => {
    if (!position?.offsetX && !position?.offsetY) return {};
    
    return {
      transform: `translate(${position?.offsetX || 0}px, ${position?.offsetY || 0}px)`
    };
  };