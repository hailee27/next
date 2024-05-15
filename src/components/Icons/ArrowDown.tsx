import { FC } from 'react';

interface Props {
  className?: string;
  height?: number;
  width?: number;
}
const ArrowDown: FC<Props> = ({ width = 14, height = 10, className }) => (
  <div className={className}>
    <svg fill="none" height={height} viewBox="0 0 10 7" width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.71074 6.3652C5.3194 6.7606 4.6806 6.7606 4.28926 6.36521L0.623804 2.66177C-0.00115916 2.03033 0.446123 0.958313 1.33454 0.958313L8.66545 0.958312C9.55388 0.958312 10.0012 2.03033 9.3762 2.66176L5.71074 6.3652Z"
        fill="#80888F"
      />
    </svg>
  </div>
);

ArrowDown.defaultProps = {
  className: '',
  height: 10,
  width: 14,
};

export default ArrowDown;
