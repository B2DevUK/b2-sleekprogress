import { StyleOptions } from '@/types';

export const getDefaultStyles = (style: StyleOptions = {}) => ({
    backgroundColor: style.backgroundColor || 'rgb(0 0 0 / 0.8)',
    progressColor: style.progressColor || 'rgb(45 212 191)',
    textColor: style.textColor || 'rgb(209 213 219)',
    iconColor: style.iconColor || style.progressColor || 'rgb(45 212 191)'
});

export const getSizeClasses = (size?: StyleOptions['size']) => {
    const sizes = {
        sm: {
            container: 'w-48',
            icon: 'w-12 h-12',
            iconSize: 16,
            progressHeight: 'h-1',
            text: 'text-xs'
        },
        md: {
            container: 'w-64',
            icon: 'w-16 h-16',
            iconSize: 20,
            progressHeight: 'h-1.5',
            text: 'text-sm'
        },
        lg: {
            container: 'w-72',
            icon: 'w-20 h-20',
            iconSize: 24,
            progressHeight: 'h-2',
            text: 'text-base'
        }
    };

    return sizes[size || 'md'];
};