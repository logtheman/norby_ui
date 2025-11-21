import * as React from 'react';
import { Button } from './Button';
import { TextField } from './TextField';
import { Select } from './Select';
import { Switch } from './Switch';
import { RadioGroup, Radio } from './RadioGroup';
import { Tabs, Tab } from './Tabs';
import { Link } from './Link';
import { Text } from './Text';
import { Typography } from './Typography';

type Variant = string;
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ComponentShowcase {
  name: string;
  component: React.ReactNode;
  variants?: Variant[];
  colors?: Color[];
  sizes?: Size[];
}

interface ThemeShowcaseProps {
  component?: string;
  variant?: string;
  color?: Color;
  size?: Size;
}

const ComponentGrid: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--color-fg)' }}>
      {title}
    </h2>
    <div style={{ display: 'grid', gap: '1.5rem' }}>{children}</div>
  </div>
);

const VariantSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-fg-muted)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>{children}</div>
  </div>
);

export const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({ component, variant, color, size }) => {
  const buttonVariants: Variant[] = ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'];
  const inputVariants: Variant[] = ['flat', 'bordered', 'faded', 'underlined'];
  const colors: Color[] = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
  const sizes: Size[] = ['sm', 'md', 'lg'];

  const showcases: ComponentShowcase[] = [
    {
      name: 'Button',
      component: <Button>Button</Button>,
      variants: buttonVariants,
      colors,
      sizes
    },
    {
      name: 'TextField',
      component: <TextField label="Label" placeholder="Placeholder" />,
      variants: inputVariants,
      colors,
      sizes
    },
    {
      name: 'Select',
      component: (
        <Select label="Label" placeholder="Select an option">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      ),
      variants: inputVariants,
      colors,
      sizes
    },
    {
      name: 'Switch',
      component: <Switch>Switch</Switch>,
      colors,
      sizes
    },
    {
      name: 'Link',
      component: <Link>Link</Link>,
      colors,
      sizes
    }
  ];

  const filteredShowcases = component
    ? showcases.filter((s) => s.name.toLowerCase() === component.toLowerCase())
    : showcases;

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
        minHeight: '100vh'
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-fg)' }}>
          Theme Showcase
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-fg-muted)', marginBottom: '2rem' }}>
          Explore all component variations, colors, sizes, and themes
        </p>
      </div>

      {filteredShowcases.map((showcase) => (
        <ComponentGrid key={showcase.name} title={showcase.name}>
          {/* Variants */}
          {showcase.variants && (
            <VariantSection title="Variants">
              {showcase.variants.map((v) => {
                if (showcase.name === 'Button') {
                  return (
                    <Button key={v} variant={v as any} color="primary">
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </Button>
                  );
                }
                if (showcase.name === 'TextField') {
                  return (
                    <TextField
                      key={v}
                      variant={v as any}
                      color="primary"
                      label={`${v.charAt(0).toUpperCase() + v.slice(1)}`}
                      placeholder="Placeholder"
                    />
                  );
                }
                if (showcase.name === 'Select') {
                  return (
                    <Select
                      key={v}
                      variant={v as any}
                      color="primary"
                      label={`${v.charAt(0).toUpperCase() + v.slice(1)}`}
                      placeholder="Select option"
                    >
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </Select>
                  );
                }
                return null;
              })}
            </VariantSection>
          )}

          {/* Colors */}
          {showcase.colors && (
            <VariantSection title="Colors">
              {showcase.colors.map((c) => {
                if (showcase.name === 'Button') {
                  return (
                    <Button key={c} variant="solid" color={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </Button>
                  );
                }
                if (showcase.name === 'TextField') {
                  return (
                    <TextField
                      key={c}
                      variant="bordered"
                      color={c}
                      label={c.charAt(0).toUpperCase() + c.slice(1)}
                      placeholder="Placeholder"
                    />
                  );
                }
                if (showcase.name === 'Select') {
                  return (
                    <Select
                      key={c}
                      variant="bordered"
                      color={c}
                      label={c.charAt(0).toUpperCase() + c.slice(1)}
                      placeholder="Select option"
                    >
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </Select>
                  );
                }
                if (showcase.name === 'Switch') {
                  // Switch doesn't have 'default' color, use 'primary' instead
                  const switchColor = c === 'default' ? 'primary' : c;
                  return (
                    <Switch key={c} color={switchColor} defaultChecked>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </Switch>
                  );
                }
                if (showcase.name === 'Link') {
                  // Link uses 'foreground' instead of 'default'
                  const linkColor = c === 'default' ? 'foreground' : c;
                  return (
                    <Link key={c} color={linkColor} href="#">
                      {c.charAt(0).toUpperCase() + c.slice(1)} Link
                    </Link>
                  );
                }
                return null;
              })}
            </VariantSection>
          )}

          {/* Sizes */}
          {showcase.sizes && (
            <VariantSection title="Sizes">
              {showcase.sizes.map((s) => {
                if (showcase.name === 'Button') {
                  return (
                    <Button key={s} variant="solid" color="primary" size={s}>
                      {s.toUpperCase()}
                    </Button>
                  );
                }
                if (showcase.name === 'TextField') {
                  return (
                    <TextField
                      key={s}
                      variant="bordered"
                      color="primary"
                      size={s}
                      label={`${s.toUpperCase()} Size`}
                      placeholder="Placeholder"
                    />
                  );
                }
                if (showcase.name === 'Select') {
                  return (
                    <Select
                      key={s}
                      variant="bordered"
                      color="primary"
                      size={s}
                      label={`${s.toUpperCase()} Size`}
                      placeholder="Select option"
                    >
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </Select>
                  );
                }
                if (showcase.name === 'Switch') {
                  return (
                    <Switch key={s} color="primary" size={s} defaultChecked>
                      {s.toUpperCase()}
                    </Switch>
                  );
                }
                if (showcase.name === 'Link') {
                  return (
                    <Link key={s} color="primary" size={s} href="#">
                      {s.toUpperCase()} Link
                    </Link>
                  );
                }
                return null;
              })}
            </VariantSection>
          )}

          {/* All Colors × All Variants Grid */}
          {showcase.variants && showcase.colors && showcase.name === 'Button' && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-fg-muted)' }}>
                All Variants × All Colors
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-surface-2)',
                  borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {showcase.variants.map((variant) =>
                  showcase.colors!.map((color) => (
                    <div
                      key={`${variant}-${color}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--r-md)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      <Button variant={variant as any} color={color} size="md">
                        {variant}
                      </Button>
                      <div style={{ textAlign: 'center' }}>
                        <Text size="xs" color="muted" as="span">
                          {variant} / {color}
                        </Text>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </ComponentGrid>
      ))}

      {/* Additional Component Showcases */}
      <ComponentGrid title="RadioGroup">
        <VariantSection title="Colors">
          {colors.map((c) => {
            const radioColor = c === 'default' ? 'primary' : c;
            return (
              <RadioGroup key={c} label={`${c.charAt(0).toUpperCase() + c.slice(1)} Radio`} color={radioColor} defaultValue="1">
                <Radio value="1">Option 1</Radio>
                <Radio value="2">Option 2</Radio>
              </RadioGroup>
            );
          })}
        </VariantSection>
        <VariantSection title="Sizes">
          {sizes.map((s) => (
            <RadioGroup key={s} label={`${s.toUpperCase()} Size`} size={s} defaultValue="1">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
          ))}
        </VariantSection>
      </ComponentGrid>

      <ComponentGrid title="Tabs">
        <VariantSection title="Colors">
          {colors.map((c) => {
            const tabColor = c === 'default' ? 'primary' : c;
            return (
              <Tabs key={c} color={tabColor} defaultSelectedKey="1">
                <Tab key="1" title="Tab 1">
                  Content for Tab 1 ({c})
                </Tab>
                <Tab key="2" title="Tab 2">
                  Content for Tab 2 ({c})
                </Tab>
                <Tab key="3" title="Tab 3">
                  Content for Tab 3 ({c})
                </Tab>
              </Tabs>
            );
          })}
        </VariantSection>
      </ComponentGrid>

      <ComponentGrid title="Typography">
        <VariantSection title="Headlines">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="headlineLarge1">Headline Large 1</Typography>
            <Typography variant="headlineLarge2">Headline Large 2</Typography>
            <Typography variant="headlineMedium1">Headline Medium 1</Typography>
            <Typography variant="headlineMedium2">Headline Medium 2</Typography>
            <Typography variant="headlineSmall1">Headline Small 1</Typography>
            <Typography variant="headlineSmall2">Headline Small 2</Typography>
          </div>
        </VariantSection>
        <VariantSection title="Titles & Subtitles">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="titleLarge">Title Large</Typography>
            <Typography variant="titleMedium">Title Medium</Typography>
            <Typography variant="subtitleLarge">Subtitle Large</Typography>
            <Typography variant="subtitleMedium">Subtitle Medium</Typography>
            <Typography variant="subtitleSmall">Subtitle Small</Typography>
          </div>
        </VariantSection>
        <VariantSection title="Body Text">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '600px' }}>
            <Typography variant="bodyLarge1">Body Large 1 - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="bodyLarge2">Body Large 2 - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="bodyMedium1">Body Medium 1 - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="bodyMedium2">Body Medium 2 - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="bodySmall1">Body Small 1 - The quick brown fox jumps over the lazy dog</Typography>
            <Typography variant="bodySmall2">Body Small 2 - The quick brown fox jumps over the lazy dog</Typography>
          </div>
        </VariantSection>
        <VariantSection title="Labels">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="labelLarge">Label Large</Typography>
            <Typography variant="labelMedium">Label Medium</Typography>
            <Typography variant="labelSmall">Label Small</Typography>
          </div>
        </VariantSection>
        <VariantSection title="Links">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="linkLarge" as="a" href="#">Link Large</Typography>
            <Typography variant="linkMedium" as="a" href="#">Link Medium</Typography>
            <Typography variant="linkSmall" as="a" href="#">Link Small</Typography>
          </div>
        </VariantSection>
        <VariantSection title="Price">
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
        </VariantSection>
      </ComponentGrid>
    </div>
  );
};

ThemeShowcase.displayName = 'ThemeShowcase';

