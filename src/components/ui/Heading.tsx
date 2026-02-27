import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level = 1, children, className }: HeadingProps) => {
  const Tag = `h${level}` as const;
  // Tell TS that this string is a valid HTML element
  const Component = Tag as any;

  return <Component className={className}>{children}</Component>;
};
