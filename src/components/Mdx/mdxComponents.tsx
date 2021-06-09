import React, { useMemo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/palenight';
import { Link } from '../Link';
import { Link as IconLink } from '../Icons';
import { useTheme } from '../../context';

function resolveHeadingId(title: React.ReactNode) {
  return `${title}`.trim().replace(/\s+/g, '-');
}

export const HeadingAnchor: React.FC<{ id: string }> = ({ id }) => {
  const { useHashRouter } = useTheme();

  // 使用 hash router 时禁用 heading anchor
  if (useHashRouter) {
    return null;
  }

  return (
    <Link
      to={`#${id}`}
      icon={false}
      color={false}
      className="<md:hidden absolute top-[52%] right-full transform -translate-y-1/2 p-3 text-base text-primary-500 hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100"
    >
      <IconLink />
    </Link>
  );
};

export const H1: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h1
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-24 mb-7 pb-4 border-b tracking-wide text-3xl text-gray-900 font-semibold dark:(border-dark-200 text-gray-200)"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h1>
  );
};

export const H2: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h2
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-16 mb-4 tracking-wide text-2xl text-gray-900 font-semibold dark:text-gray-200"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h2>
  );
};

export const H3: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h3
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-16 mb-3 text-xl text-gray-900 font-semibold dark:text-gray-200"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h3>
  );
};

export const H4: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h4
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-16 mb-3 text-lg text-gray-900 font-semibold dark:text-gray-200"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h4>
  );
};

export const H5: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h5
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-16 mb-3 text-base text-gray-900 font-semibold dark:text-gray-200"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h5>
  );
};

export const H6: React.FC = ({ children, ...restProps }) => {
  const id = resolveHeadingId(children);
  return (
    <h6
      {...restProps}
      id={id}
      data-title={children?.toString()}
      className="pt-24 -mt-16 mb-3 text-sm text-gray-900 font-semibold dark:text-gray-200"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h6>
  );
};

export const P: React.FC = props => {
  return (
    <p
      {...props}
      className=" my-5 text-base text-gray-700 leading-7 dark:text-gray-300"
    />
  );
};

export const Ul: React.FC<{ className?: string }> = props => {
  return (
    <ul
      {...props}
      className={`${
        props.className?.includes('contains-task-list')
          ? 'list-none'
          : 'list-disc'
      } mb-6 text-gray-700 leading-7 dark:text-gray-300`}
    />
  );
};

export const Ol: React.FC = props => {
  return (
    <ol
      {...props}
      className="list-decimal mb-6 text-gray-700 leading-7 dark:text-gray-300"
    />
  );
};

export const Li: React.FC<{ className?: string }> = props => {
  return (
    <li
      {...props}
      className={`${props.className?.includes('task-list-item') ? '' : 'ml-6'}`}
    />
  );
};

export const Blockquote: React.FC = props => {
  return (
    <blockquote
      {...props}
      className="my-5 px-4 border-l-3 border-primary-500"
    />
  );
};

export const A: React.FC<{ href?: string }> = props => {
  const { href, ...restProps } = props;
  return <Link {...restProps} to={href} />;
};

export const Img: React.FC = props => {
  return <img {...props} className="inline-block align-text-bottom" />;
};

export const Hr: React.FC = props => {
  return <hr {...props} className="my-9 border-gray-200 dark:border-dark-50" />;
};

export const Table: React.FC = props => {
  return (
    <div className="w-full my-8 overflow-y-auto text-[0.9rem] leading-snug text-gray-700 dark:text-gray-300">
      <table {...props} className="w-full min-w-max border-collapse" />
    </div>
  );
};

export const Tr: React.FC = props => {
  return (
    <tr
      {...props}
      className="hover:bg-gray-50 transition-colors dark:hover:bg-dark-400"
    />
  );
};

// FIXME: 圆角不生效
export const Th: React.FC<{ align?: 'left' | 'right' }> = ({
  align,
  ...restProps
}) => {
  return (
    <th
      {...restProps}
      className={`h-10 px-3 py-2 border-t-1px border-b-1px bg-gray-50 font-semibold first:(border-l-1px rounded-tl-md rounded-bl-md) last:(border-r-1px rounded-tr-md rounded-br-md) ${
        align === 'right' ? 'text-right' : 'text-left'
      } dark:(border-dark-200 bg-dark-400)`}
    />
  );
};

export const Td: React.FC<{ align?: 'left' | 'right' }> = ({
  align,
  ...restProps
}) => {
  return (
    <td
      {...restProps}
      className={`h-10 px-3 py-4 border-b border-gray-200 dark:border-dark-200 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    />
  );
};

export const InlineCode: React.FC = ({ children, ...restProps }) => {
  return (
    <code {...restProps} className="whitespace-pre-wrap text-pink-500">
      <span className="select-none">`</span>
      {children}
      <span className="select-none">`</span>
    </code>
  );
};

export const Code: React.FC<{
  className?: string;
  live?: boolean;
  title?: string;
  hl?: string;
}> = ({ className, children, title, hl }) => {
  const language = className
    ? (className.replace(/language-/, '') as Language)
    : 'javascript';

  const highlightLines = useMemo(() => {
    if (!hl) {
      return [];
    }

    return hl.split(',').reduce((acc, cur) => {
      if (/^\d+$/.test(cur)) {
        acc.push(parseInt(cur, 10));
      } else if (/^\d+-\d+$/.test(cur)) {
        const [from, to] = cur.split('-').map(item => parseInt(item, 10));
        const lines = Array.from(
          { length: to - from + 1 },
          (_, index) => from + index
        );
        acc.push(...lines);
      }
      return acc;
    }, [] as number[]);
  }, [hl]);

  return (
    <Highlight
      {...defaultProps}
      code={(children as string).trim()}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} relative my-5 rounded-md text-[0.9rem] leading-normal`}
          style={style}
        >
          <span className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 select-none">
            {language}
          </span>
          {title && (
            <div className="code-title px-5 py-3 border-b border-gray-500 text-[0.9rem] font-medium">
              {title}
            </div>
          )}
          <div className="relative overflow-auto">
            <code className="block w-full min-w-max py-3">
              {tokens.map((line, i) => {
                const highlighted = highlightLines.includes(i + 1);
                // omit style property, use custom css instead.
                const { className, ...lineProps } = getLineProps({
                  line,
                  key: i,
                });

                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={`${className} relative ${
                      highlighted ? 'bg-[#404250]' : ''
                    }`}
                  >
                    <span
                      className="sticky left-0 inline-block w-11 pr-3 mr-3 text-right whitespace-nowrap text-gray-500 select-none"
                      style={{
                        backgroundColor: highlighted
                          ? '#404250'
                          : prismTheme.plain.backgroundColor,
                      }}
                    >
                      {i + 1}
                    </span>
                    {line.map((token, i) => {
                      // omit style property, use custom css instead.
                      const tokenProps = getTokenProps({
                        token,
                        key: i,
                      });
                      return <span key={i} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </code>
          </div>
        </pre>
      )}
    </Highlight>
  );
};

export const Pre: React.FC = props => {
  return <React.Fragment {...props} />;
};
