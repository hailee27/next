export const formatNumber = (
  num: number | string,
  isNumber?: boolean,
  minimumInteger?: number
): string | JSX.Element => {
  // if (!number) {
  //   return `${displaySign ? '+0' : '0'}`;
  // }
  // if (!Number.isNaN(numberValue)) {
  //   return `${displaySign ? `${Math.sign(numberValue) > 0 ? '+' : ''}` : ''}${new Intl.NumberFormat('ja-JP', {
  //     maximumFractionDigits: 0,
  //   }).format(numberValue)}`;
  // }

  // return number as string;

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e4, symbol: '万' },
    { value: 1e8, symbol: '億' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((e) => Number(num) >= e.value);
  if (typeof num === 'string') {
    return num;
  }
  if (isNumber) {
    return new Intl.NumberFormat('ja-JP', {
      maximumFractionDigits: 1,
      minimumIntegerDigits: minimumInteger || 4,
    }).format(num);
  }
  return (
    <>
      {item ? (num / item.value).toFixed(1).replace(rx, '$1') : '0'}

      <span className="text-[24px] font-bold">
        <span>{item?.symbol}</span>円
      </span>
    </>
  );
};
