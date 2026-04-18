import { memo } from 'react';
import type { IconProps } from './types';

function WindowsLogoIconComponent({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4h10v10H4zm12 0h10v10H16zM4 16h10v10H4zm12 0h10v10H16z" />
    </svg>
  );
}

export const WindowsLogoIcon = memo(WindowsLogoIconComponent);
