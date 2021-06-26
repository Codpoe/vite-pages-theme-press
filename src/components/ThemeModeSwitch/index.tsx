import React from 'react';
import { useThemeMode } from '../../hooks/useThemeMode';
import { Sun, Moon } from '../Icons';

export const ThemeModeSwitch: React.FC = () => {
  const [mode, setMode] = useThemeMode();

  return (
    <button
      className="<md:btn-text md:btn transition-none w-9 h-9 text-xl"
      onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}
    >
      {mode === 'light' ? <Sun /> : <Moon />}
    </button>
  );
};

// import React from 'react';
// import { useThemeMode } from '../../hooks/useThemeMode';
// import styles from './style.module.less';

// const LIGHT_COUNT = 8;

// export const ThemeModeSwitch: React.FC = () => {
//   const [mode, setMode] = useThemeMode();

//   return (
//     <button
//       className="btn relative w-9 h-9 ml-4"
//       onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}
//     >
//       <div
//         className={`rounded-full transition-all ${styles[mode]} ${
//           mode === 'light' ? 'w-2 h-2' : 'w-[14px] h-[14px]'
//         }`}
//       />
//       <div
//         className={`absolute top-0 left-0 w-full h-full transform transition-transform ${
//           mode === 'light' ? 'duration-300 scale-100' : 'scale-0'
//         }`}
//       >
//         {Array.from({ length: LIGHT_COUNT }).map((_, index) => (
//           <div
//             key={index}
//             className={`absolute top-1/2 left-1/2 w-0.5 h-[3px] rounded-[1px] bg-gray-700`}
//             style={{
//               transformOrigin: 'center 9px',
//               transform: `translateX(-1px) translateY(-9px) rotate(${
//                 (360 / 8) * index
//               }deg)`,
//             }}
//           />
//         ))}
//       </div>
//     </button>
//   );
// };
