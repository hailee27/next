import React from 'react';

interface IArrowProps {
  className?: string;
}

export default function ArrowDown({ className }: IArrowProps) {
  return (
    <svg
      className={className}
      fill="none"
      height="13"
      viewBox="0 0 13 13"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.668 5.34766L12.2695 5.94922C12.5156 6.22266 12.5156 6.63281 12.2695 6.87891L6.96484 12.1836C6.69141 12.457 6.28125 12.457 6.03516 12.1836L0.703125 6.87891C0.457031 6.63281 0.457031 6.19531 0.703125 5.94922L1.30469 5.34766C1.57812 5.07422 1.98828 5.10156 2.26172 5.34766L5.40625 8.65625V0.78125C5.40625 0.425781 5.67969 0.125 6.0625 0.125H6.9375C7.29297 0.125 7.59375 0.425781 7.59375 0.78125V8.65625L10.7109 5.34766C10.9844 5.10156 11.3945 5.07422 11.668 5.34766Z"
        fill="currentColor"
      />
    </svg>
  );
}
ArrowDown.defaultProps = {
  className: 'text-[#333]',
};
