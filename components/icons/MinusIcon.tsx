import type { IconProps } from './types';

export function MinusIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 11H7a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2" />
    </svg>
  );
}
