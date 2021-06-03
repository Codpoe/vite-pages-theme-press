import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '../Link';
import { ChevronRight } from '../Icons';
import { SidebarItem } from './types';

export interface ItemsProps {
  items: SidebarItem[];
  hitItems: SidebarItem[];
  activeItems: SidebarItem[];
  inside: boolean;
  expanded: boolean;
  setActiveItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
}

export const Items: React.FC<ItemsProps> = props => {
  const { items, hitItems, activeItems, inside, expanded, setActiveItems } =
    props;
  const elRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<any>(null);
  const [height, setHeight] = useState<number | undefined>();

  const toggleExpand = useCallback(
    (item: SidebarItem) => {
      setActiveItems(prev => {
        const res = prev.slice();
        const index = prev.indexOf(item);

        if (index >= 0) {
          res.splice(index, 1);
        } else {
          res.push(item);
        }

        return res;
      });
    },
    [setActiveItems]
  );

  useEffect(() => {
    if (
      !inside ||
      !elRef.current ||
      typeof window === 'undefined' ||
      !window.MutationObserver
    ) {
      return;
    }

    setHeight(elRef.current.scrollHeight);

    const observer = new window.MutationObserver(records => {
      records
        .filter(
          item => item.type === 'attributes' && item.target.nodeName === 'DIV'
        )
        .forEach(() => {
          // 如果子树有更新，把当前节点的 height 设为 auto，让这个节点能够跟着子树高度一起变化。
          setHeight(undefined);

          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          // 150ms transition 结束后，把当前节点的高度重新设置为 scrollHeight，
          // 以致于收起节点时也能有过滤动画。
          timerRef.current = setTimeout(
            () => setHeight(elRef.current.scrollHeight),
            150
          );
        });
    });

    observer.observe(elRef.current, {
      attributes: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [inside]);

  return (
    <div
      className={`${
        inside
          ? 'ml-[7px] border-l transition-all overflow-hidden dark:border-dark-200'
          : ''
      } ${inside && !expanded ? '!h-0' : ''}`}
      style={{ height: inside && height ? `${height}px` : 'auto' }}
    >
      <ul ref={elRef}>
        {items.map((item, index) => {
          const hit = hitItems.includes(item);
          const active = activeItems.includes(item);

          if (item.items) {
            return (
              <li key={index} className={`${inside ? 'pl-3' : ''}`}>
                <div
                  className={`group flex items-center py-2 tracking-widest cursor-pointer transition-all ${
                    hit ? 'text-gray-900 font-semibold dark:text-gray-200' : ''
                  }`}
                  onClick={() => toggleExpand(item)}
                >
                  <ChevronRight
                    className={`mr-2 text-sm text-gray-400 group-hover:text-primary-500 transition-all transform ${
                      active ? 'rotate-90' : ''
                    }`}
                  />
                  {item.text}
                </div>
                <Items
                  items={item.items}
                  hitItems={hitItems}
                  activeItems={activeItems}
                  inside
                  expanded={active}
                  setActiveItems={setActiveItems}
                />
              </li>
            );
          }

          return (
            <li key={index}>
              <Link
                {...item}
                to={item.link}
                color={false}
                className={`w-full py-2 transition-all hover:text-primary-500 ${
                  inside ? 'pl-3' : ''
                } ${hit ? 'text-primary-500 font-semibold' : ''}`}
              >
                <div className="w-1 h-1 ml-1 mr-[14px] rounded-full bg-gray-400"></div>
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
