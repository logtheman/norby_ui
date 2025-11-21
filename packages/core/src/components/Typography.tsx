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

type PolymorphicTypographyProps<E extends React.ElementType> = {
  variant?: TypographyVariant;
  as?: E;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const TypographyComponent = React.forwardRef(
  <E extends React.ElementType = 'p'>(
    {
      variant = 'bodyRegular',
      as,
      className,
      children,
      ...rest
    }: PolymorphicTypographyProps<E>,
    ref: React.Ref<Element>
  ) => {
    const Component = (as || 'p') as any;
    const cls = cx('lui-typography', `lui-typography--${variant}`, className);

    return (
      <Component ref={ref} className={cls} {...rest}>
        {children}
      </Component>
    );
  }
);

TypographyComponent.displayName = 'Typography';

export const Typography = TypographyComponent as <E extends React.ElementType = 'p'>(
  props: PolymorphicTypographyProps<E> & { ref?: React.ForwardedRef<React.ElementRef<E>> }
) => React.ReactElement | null;

export type TypographyProps<E extends React.ElementType = 'p'> = PolymorphicTypographyProps<E>;


