import * as React from 'react';

export type TypographyVariant =
  // Headlines
  | 'headlineLarge1'
  | 'headlineLarge2'
  | 'headlineMedium1'
  | 'headlineMedium2'
  | 'headlineSmall1'
  | 'headlineSmall2'
  // Titles
  | 'titleLarge'
  | 'titleMedium'
  // Subtitles
  | 'subtitleLarge'
  | 'subtitleMedium'
  | 'subtitleSmall'
  // Body
  | 'bodyLarge1'
  | 'bodyLarge2'
  | 'bodyMedium1'
  | 'bodyMedium2'
  | 'bodyMedium3'
  | 'bodySmall1'
  | 'bodySmall2'
  | 'bodySmall3'
  // Labels
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  // Links
  | 'linkLarge'
  | 'linkMedium'
  | 'linkSmall'
  // Legal Links
  | 'legalLinkLarge'
  | 'legalLinkMedium'
  | 'legalLinkSmall'
  // Price
  | 'priceCurrencyLarge'
  | 'priceCurrencySmall'
  | 'priceLabelLarge1'
  | 'priceLabelLarge2'
  | 'priceLabelSmall1'
  | 'priceLabelSmall2'
  // Simple Variants
  | 'headline'
  | 'title'
  | 'subtitle'
  | 'bodyRegular'
  | 'bodyEmphasized'
  | 'bodyStrikethrough'
  | 'bodyLink'
  | 'bodyLegalLink'
  | 'accent';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'bodyRegular', as, className, children, ...props }, ref) => {
    const Component = (as || 'p') as any;
    const cls = cx('lui-typography', `lui-typography--${variant}`, className);

    return (
      <Component ref={ref} className={cls} {...props}>
        {children}
      </Component>
    );
  }
);
Typography.displayName = 'Typography';


