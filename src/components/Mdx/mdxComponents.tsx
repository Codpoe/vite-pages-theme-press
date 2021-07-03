import React, { useEffect, useMemo, useRef, useState } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { Link } from '../Link';
import { Link as IconLink } from '../Icons';
import { useTheme } from '../../context';

function useParseHeading() {
  const elRef = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (elRef.current) {
      setTitle((elRef.current.textContent || '').trim());
    }
  }, []);

  return {
    ref: elRef,
    title,
  };
}

const HeadingAnchor: React.FC<{ id?: string }> = ({ id }) => {
  const { useHashRouter } = useTheme();

  // disable heading anchor while using hash router
  if (useHashRouter || !id) {
    return null;
  }

  return (
    <Link
      to={`#${id}`}
      icon={false}
      color={false}
      className="<md:hidden absolute top-[52%] right-full transform -translate-y-1/2 p-3 text-base text-c-brand hover:text-c-brand-light transition-colors opacity-0 group-hover:opacity-100"
    >
      <IconLink />
    </Link>
  );
};

export const H1: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h1
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-24 mb-7 pb-3 border-b border-c-divider tracking-wide text-3xl font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h1>
  );
};

export const H2: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h2
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-16 mb-4 tracking-wide text-2xl font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h2>
  );
};

export const H3: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h3
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-16 mb-4 text-xl font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h3>
  );
};

export const H4: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h4
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-16 mb-4 text-lg font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h4>
  );
};

export const H5: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h5
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-16 mb-4 text-base font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h5>
  );
};

export const H6: React.FC<{ id?: string }> = ({
  id,
  children,
  ...restProps
}) => {
  const { ref, title } = useParseHeading();

  return (
    <h6
      {...restProps}
      ref={ref}
      id={id}
      data-title={title}
      className="pt-24 -mt-16 mb-4 text-sm font-semibold"
    >
      <div className="group relative">
        <HeadingAnchor id={id} />
        {children}
      </div>
    </h6>
  );
};

export const P: React.FC = props => {
  return <p {...props} className="my-4 text-base leading-7" />;
};

export const Ul: React.FC<{ className?: string }> = props => {
  return (
    <ul
      {...props}
      className={`${
        props.className?.includes('contains-task-list')
          ? 'list-none'
          : 'list-disc'
      } my-4 leading-7`}
    />
  );
};

export const Ol: React.FC = props => {
  return <ol {...props} className="list-decimal my-4 leading-7" />;
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
    <blockquote {...props} className="my-4 px-4 border-l-3 border-c-brand" />
  );
};

export const Summary: React.FC = props => {
  const { children } = props;
  return <summary className="cursor-pointer">{children}</summary>;
};

export const A: React.FC<{ href?: string }> = props => {
  const { href, ...restProps } = props;
  return <Link {...restProps} to={href} />;
};

export const Img: React.FC = props => {
  return <img {...props} className="inline-block align-text-bottom" />;
};

export const Hr: React.FC = props => {
  return <hr {...props} className="my-9 border-c-divider" />;
};

export const Table: React.FC = props => {
  return (
    <div className="w-full my-4 overflow-y-auto leading-snug">
      <table {...props} className="w-full min-w-max border-collapse" />
    </div>
  );
};

export const Tr: React.FC = props => {
  return <tr {...props} className="hover:bg-c-bg-light transition-colors" />;
};

export const Thead: React.FC = props => {
  return <thead {...props} className="border border-c-divider"></thead>;
};

export const Th: React.FC<{ align?: 'left' | 'right' }> = ({
  align,
  ...restProps
}) => {
  return (
    <th
      {...restProps}
      className={`h-10 px-3 py-2 bg-c-bg-light font-semibold ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
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
      className={`h-10 px-3 py-4 border-b border-c-divider ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    />
  );
};

export const InlineCode: React.FC = ({ children, ...restProps }) => {
  return (
    <code
      {...restProps}
      className="whitespace-pre-wrap px-2 py-0.5 rounded-3px bg-c-bg-light text-c-text-light text-[0.9em]"
    >
      {children}
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
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} relative my-4 rounded-md bg-code-bg text-[0.9rem] leading-relaxed`}
        >
          <span className="absolute top-0 right-0 px-2 py-1 text-xs text-code-line-number select-none">
            {language}
          </span>
          {title && (
            <div className="px-5 py-3 border-b border-code-highlight-bg font-medium text-code-line-number">
              {title}
            </div>
          )}
          <div className="relative overflow-auto">
            <code className="block w-full min-w-max py-3">
              {tokens.map((line, i) => {
                const highlighted = highlightLines.includes(i + 1);
                // just pick className property, and use custom css instead.
                const { className } = getLineProps({
                  line,
                  key: i,
                });

                return (
                  <div
                    key={i}
                    className={`${className} relative ${
                      highlighted ? 'bg-code-highlight-bg' : ''
                    }`}
                  >
                    <span
                      className={`sticky left-0 inline-block w-11 pr-3 mr-3 text-right whitespace-nowrap text-code-line-number select-none ${
                        highlighted ? 'bg-code-highlight-bg' : 'bg-code-bg'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {line.map((token, i) => {
                      // just pick className property, and use custom css instead.
                      const { className, children } = getTokenProps({
                        token,
                        key: i,
                      });
                      return (
                        <span key={i} className={className}>
                          {children}
                        </span>
                      );
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
