import React from 'react';

interface LogoIconProps {
    width?: number;
    height?: number;
    variant?: 'white' | 'normal';
    className?: string;
    style?: React.CSSProperties;
    alt?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({
    width = 24,
    height = 24,
    variant = 'normal',
    className = '',
    style = {},
    alt = 'Logo'
}) => {
    const iconSrc = variant === 'white' ? '/logo-icon-white.png' : '/logo-icon.png';

    return (
        <img
            src={iconSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
        />
    );
};

export default LogoIcon;
