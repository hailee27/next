import { useEffect, useRef, useState } from 'react';

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleClickOutside = (event: any) => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    if (ref.current && !(ref.current as any).contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
