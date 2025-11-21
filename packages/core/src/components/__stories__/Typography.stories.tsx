import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Typography } from '../Typography';

const meta: Meta<typeof Typography> = {
  title: 'Core/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'headlineLarge1',
        'headlineLarge2',
        'headlineMedium1',
        'headlineMedium2',
        'headlineSmall1',
        'headlineSmall2',
        'titleLarge',
        'titleMedium',
        'subtitleLarge',
        'subtitleMedium',
        'subtitleSmall',
        'bodyLarge1',
        'bodyLarge2',
        'bodyMedium1',
        'bodyMedium2',
        'bodyMedium3',
        'bodySmall1',
        'bodySmall2',
        'bodySmall3',
        'labelLarge',
        'labelMedium',
        'labelSmall',
        'linkLarge',
        'linkMedium',
        'linkSmall',
        'legalLinkLarge',
        'legalLinkMedium',
        'legalLinkSmall',
        'priceCurrencyLarge',
        'priceCurrencySmall',
        'priceLabelLarge1',
        'priceLabelLarge2',
        'priceLabelSmall1',
        'priceLabelSmall2',
        'headline',
        'title',
        'subtitle',
        'bodyRegular',
        'bodyEmphasized',
        'bodyStrikethrough',
        'bodyLink',
        'bodyLegalLink',
        'accent'
      ]
    }
  }
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'bodyRegular',
    children: 'The quick brown fox jumps over the lazy dog'
  }
};

const TypographySection: React.FC<{ title: string; variants: string[] }> = ({ title, variants }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-fg-muted)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <div style={{ minWidth: '200px', fontSize: '0.75rem', color: 'var(--color-fg-muted)', fontFamily: 'monospace' }}>
            {variant}
          </div>
          <Typography variant={variant as any}>
            The quick brown fox jumps over the lazy dog
          </Typography>
        </div>
      ))}
    </div>
  </div>
);

export const AllVariants: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '1200px' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Typography Showcase</h2>
      
      <TypographySection
        title="Headlines"
        variants={['headlineLarge1', 'headlineLarge2', 'headlineMedium1', 'headlineMedium2', 'headlineSmall1', 'headlineSmall2']}
      />
      
      <TypographySection
        title="Titles"
        variants={['titleLarge', 'titleMedium']}
      />
      
      <TypographySection
        title="Subtitles"
        variants={['subtitleLarge', 'subtitleMedium', 'subtitleSmall']}
      />
      
      <TypographySection
        title="Body"
        variants={['bodyLarge1', 'bodyLarge2', 'bodyMedium1', 'bodyMedium2', 'bodyMedium3', 'bodySmall1', 'bodySmall2', 'bodySmall3']}
      />
      
      <TypographySection
        title="Labels"
        variants={['labelLarge', 'labelMedium', 'labelSmall']}
      />
      
      <TypographySection
        title="Links"
        variants={['linkLarge', 'linkMedium', 'linkSmall']}
      />
      
      <TypographySection
        title="Legal Links"
        variants={['legalLinkLarge', 'legalLinkMedium', 'legalLinkSmall']}
      />
      
      <TypographySection
        title="Price"
        variants={['priceCurrencyLarge', 'priceCurrencySmall', 'priceLabelLarge1', 'priceLabelLarge2', 'priceLabelSmall1', 'priceLabelSmall2']}
      />
      
      <TypographySection
        title="Simple Variants"
        variants={['headline', 'title', 'subtitle', 'bodyRegular', 'bodyEmphasized', 'bodyStrikethrough', 'bodyLink', 'bodyLegalLink', 'accent']}
      />
    </div>
  )
};

export const Headlines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="headlineLarge1">Headline Large 1</Typography>
      <Typography variant="headlineLarge2">Headline Large 2</Typography>
      <Typography variant="headlineMedium1">Headline Medium 1</Typography>
      <Typography variant="headlineMedium2">Headline Medium 2</Typography>
      <Typography variant="headlineSmall1">Headline Small 1</Typography>
      <Typography variant="headlineSmall2">Headline Small 2</Typography>
    </div>
  )
};

export const BodyText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Typography variant="bodyLarge1">
        Body Large 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="bodyLarge2">
        Body Large 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="bodyMedium1">
        Body Medium 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="bodyMedium2">
        Body Medium 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="bodyMedium3">
        Body Medium 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  )
};

export const Links: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="linkLarge" as="a" href="#">
        Link Large
      </Typography>
      <Typography variant="linkMedium" as="a" href="#">
        Link Medium
      </Typography>
      <Typography variant="linkSmall" as="a" href="#">
        Link Small
      </Typography>
      <Typography variant="bodyLink" as="a" href="#">
        Body Link
      </Typography>
    </div>
  )
};

export const Price: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <Typography variant="priceCurrencyLarge">$99</Typography>
        <Typography variant="priceLabelLarge1">USD</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <Typography variant="priceCurrencySmall">$49</Typography>
        <Typography variant="priceLabelSmall1">USD</Typography>
      </div>
    </div>
  )
};

