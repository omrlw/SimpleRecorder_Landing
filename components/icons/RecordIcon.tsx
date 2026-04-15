import type { IconProps } from './types';

export function RecordIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.667"
      viewBox="0 0 20 20"
    >
      <path d="m13.333 10.833 4.353 2.902a.42.42 0 0 0 .647-.347v-6.83a.417.417 0 0 0-.627-.36L13.333 8.75" />
      <rect width="11.667" height="10" x="1.667" y="5" rx="1.667" />
    </svg>
  );
}
