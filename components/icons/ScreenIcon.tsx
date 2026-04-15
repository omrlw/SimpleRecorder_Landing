import type { IconProps } from './types';

export function ScreenIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 11 10">
      <path
        fillRule="evenodd"
        d="M2.273 0h6.363a2.273 2.273 0 0 1 2.272 2.273v3.636A2.273 2.273 0 0 1 8.636 8.18H5.909v.91h1.818a.455.455 0 1 1 0 .909H3.182a.455.455 0 1 1 0-.91H5V8.18H2.273A2.273 2.273 0 0 1 0 5.909V2.273A2.273 2.273 0 0 1 2.273 0m0 .909A1.364 1.364 0 0 0 .909 2.273v3.636c0 .753.611 1.364 1.364 1.364h6.363c.753 0 1.363-.611 1.363-1.364V2.273c0-.753-.61-1.364-1.363-1.364z"
        clipRule="evenodd"
      />
    </svg>
  );
}
