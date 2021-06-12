import React, { useEffect, useRef, useState } from 'react';
import './style.less';

export const CSSPreflight: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Record<string, any>>({});

  useEffect(() => {
    if (elRef.current) {
      const primary500 = getComputedStyle(elRef.current).getPropertyValue(
        'border-color'
      );
      const gray200 = getComputedStyle(elRef.current).getPropertyValue(
        'background-color'
      );
      const gray700 = getComputedStyle(elRef.current).getPropertyValue('color');
      const dark50 = getComputedStyle(elRef.current).getPropertyValue('stroke');
      const dark200 = getComputedStyle(elRef.current).getPropertyValue('fill');

      setProperties({
        '--primary-500': primary500,
        '--gray-200': gray200,
        '--gray-700': gray700,
        '--dark-50': dark50,
        '--dark-200': dark200,
      });
    }
  }, []);

  return (
    <div
      ref={elRef}
      className="hidden border-primary-500 bg-gray-200 text-gray-700 fill-dark-200 stroke-dark-50"
    >
      <style>
        {`
      :root {
        ${Object.entries(properties)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n')}
      }
    `}
      </style>
    </div>
  );
};
