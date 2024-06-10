import { FC } from 'react';

interface Props {
  className?: string;
  height?: number;
  width?: number;
}
const CheckedIcon: FC<Props> = ({ width = 18, height = 14, className }) => (
  <div className={className}>
    <svg fill="none" height={height} viewBox="0 0 18 14" width={width} xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7.16145L6.22449 12.3332L17 1.6665" stroke="#3391D6" strokeWidth="2" />
    </svg>
  </div>
);

CheckedIcon.defaultProps = {
  className: '',
  height: 14,
  width: 18,
};

export default CheckedIcon;
