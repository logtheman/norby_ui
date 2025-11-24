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
import { Textarea } from './Textarea';
import { Chip } from './Chip';
import { Skeleton } from './Skeleton';
import { Spacer } from './Spacer';
import { Kbd } from './Kbd';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from './Dropdown';
import * as Icons from './icons';

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

const ComponentGrid: React.FC<{ title: string; id?: string; children: React.ReactNode }> = ({
  title,
  id,
  children
}) => (
  <div id={id} style={{ marginBottom: '3rem', scrollMarginTop: '100px' }}>
    <h2
      style={{
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
        color: 'var(--color-fg)'
      }}
    >
      {title}
    </h2>
    <div style={{ display: 'grid', gap: '1.5rem' }}>{children}</div>
  </div>
);

const VariantSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--color-fg-muted)'
      }}
    >
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({
  component,
  variant: _variant,
  color: _color,
  size: _size
}) => {
  const [activeSection, setActiveSection] = React.useState<string>('');

  const buttonVariants: Variant[] = [
    'solid',
    'bordered',
    'light',
    'flat',
    'faded',
    'shadow',
    'ghost'
  ];
  const inputVariants: Variant[] = ['flat', 'bordered', 'faded', 'underlined'];
  const colors: Color[] = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
  const sizes: Size[] = ['sm', 'md', 'lg'];

  // List of all component sections
  const componentSections = React.useMemo(
    () => [
      'Button',
      'TextField',
      'Select',
      'Switch',
      'Link',
      'Textarea',
      'Chip',
      'RadioGroup',
      'Tabs',
      'Typography',
      'Skeleton',
      'Spacer',
      'Kbd',
      'Dropdown',
      'Icons'
    ],
    []
  );

  // Scroll spy to highlight active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = componentSections.map((name) => {
        const id = name.toLowerCase().replace(/\s+/g, '-');
        return { name, id, element: document.getElementById(id) };
      });

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [componentSections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

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
    },
    {
      name: 'Textarea',
      component: <Textarea label="Label" placeholder="Placeholder" />,
      variants: inputVariants,
      colors,
      sizes
    },
    {
      name: 'Chip',
      component: <Chip>Chip</Chip>,
      variants: ['solid', 'bordered', 'flat', 'faded', 'dot'],
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
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)'
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '280px',
          minWidth: '280px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          padding: '1.5rem',
          flexShrink: 0
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-fg-muted)',
              marginBottom: '1rem'
            }}
          >
            Showcase
          </h2>
          <nav>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}
            >
              {componentSections.map((name) => {
                const id = name.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--r-md)',
                        border: 'none',
                        background: isActive ? 'var(--color-brand)' : 'transparent',
                        color: isActive ? 'var(--color-brand-foreground)' : 'var(--color-fg)',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'var(--color-surface-2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: isActive
                            ? 'var(--color-brand-foreground)'
                            : 'var(--color-fg-muted)',
                          opacity: isActive ? 1 : 0.5
                        }}
                      />
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: 'var(--color-fg)'
            }}
          >
            Theme Showcase
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-fg-muted)', marginBottom: '2rem' }}>
            Explore all component variations, colors, sizes, and themes
          </p>
        </div>

        {filteredShowcases.map((showcase) => {
          const sectionId = showcase.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <ComponentGrid key={showcase.name} id={sectionId} title={showcase.name}>
              {/* Variants */}
              {showcase.variants && (
                <VariantSection title="Variants">
                  {showcase.variants.map((v) => {
                    if (showcase.name === 'Button') {
                      return (
                        <Button
                          key={v}
                          variant={
                            v as
                              | 'solid'
                              | 'bordered'
                              | 'light'
                              | 'flat'
                              | 'faded'
                              | 'shadow'
                              | 'ghost'
                          }
                          color="primary"
                        >
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </Button>
                      );
                    }
                    if (showcase.name === 'TextField') {
                      return (
                        <TextField
                          key={v}
                          variant={v as 'flat' | 'bordered' | 'faded' | 'underlined'}
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
                          variant={v as 'flat' | 'bordered' | 'faded' | 'underlined'}
                          color="primary"
                          label={`${v.charAt(0).toUpperCase() + v.slice(1)}`}
                          placeholder="Select option"
                        >
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                        </Select>
                      );
                    }
                    if (showcase.name === 'Textarea') {
                      return (
                        <Textarea
                          key={v}
                          variant={v as 'flat' | 'bordered' | 'faded' | 'underlined'}
                          color="primary"
                          label={`${v.charAt(0).toUpperCase() + v.slice(1)}`}
                          placeholder="Placeholder"
                        />
                      );
                    }
                    if (showcase.name === 'Chip') {
                      return (
                        <Chip
                          key={v}
                          variant={v as 'solid' | 'bordered' | 'flat' | 'faded' | 'dot'}
                          color="primary"
                        >
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </Chip>
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
                    if (showcase.name === 'Textarea') {
                      return (
                        <Textarea
                          key={c}
                          variant="bordered"
                          color={c}
                          label={c.charAt(0).toUpperCase() + c.slice(1)}
                          placeholder="Placeholder"
                        />
                      );
                    }
                    if (showcase.name === 'Chip') {
                      return (
                        <Chip key={c} variant="solid" color={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </Chip>
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
                    if (showcase.name === 'Textarea') {
                      return (
                        <Textarea
                          key={s}
                          variant="bordered"
                          color="primary"
                          size={s}
                          label={`${s.toUpperCase()} Size`}
                          placeholder="Placeholder"
                        />
                      );
                    }
                    if (showcase.name === 'Chip') {
                      return (
                        <Chip key={s} variant="solid" color="primary" size={s}>
                          {s.toUpperCase()}
                        </Chip>
                      );
                    }
                    return null;
                  })}
                </VariantSection>
              )}

              {/* All Colors × All Variants Grid */}
              {showcase.variants && showcase.colors && showcase.name === 'Button' && (
                <div style={{ marginTop: '2rem' }}>
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      color: 'var(--color-fg-muted)'
                    }}
                  >
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
                          <Button
                            variant={
                              variant as
                                | 'solid'
                                | 'bordered'
                                | 'light'
                                | 'flat'
                                | 'faded'
                                | 'shadow'
                                | 'ghost'
                            }
                            color={color}
                            size="md"
                          >
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
          );
        })}

        {/* Additional Component Showcases */}
        <ComponentGrid id="radiogroup" title="RadioGroup">
          <VariantSection title="Colors">
            {colors.map((c) => {
              const radioColor = c === 'default' ? 'primary' : c;
              return (
                <RadioGroup
                  key={c}
                  label={`${c.charAt(0).toUpperCase() + c.slice(1)} Radio`}
                  color={radioColor}
                  defaultValue="1"
                >
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

        <ComponentGrid id="tabs" title="Tabs">
          <VariantSection title="Colors">
            {colors.map((c) => {
              const tabColor = c === 'default' ? 'primary' : c;
              return (
                <Tabs key={c} color={tabColor} defaultSelectedKey="1">
                  <Tab id="1" title="Tab 1">
                    Content for Tab 1 ({c})
                  </Tab>
                  <Tab id="2" title="Tab 2">
                    Content for Tab 2 ({c})
                  </Tab>
                  <Tab id="3" title="Tab 3">
                    Content for Tab 3 ({c})
                  </Tab>
                </Tabs>
              );
            })}
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="typography" title="Typography">
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
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '600px' }}
            >
              <Typography variant="bodyLarge1">
                Body Large 1 - The quick brown fox jumps over the lazy dog
              </Typography>
              <Typography variant="bodyLarge2">
                Body Large 2 - The quick brown fox jumps over the lazy dog
              </Typography>
              <Typography variant="bodyMedium1">
                Body Medium 1 - The quick brown fox jumps over the lazy dog
              </Typography>
              <Typography variant="bodyMedium2">
                Body Medium 2 - The quick brown fox jumps over the lazy dog
              </Typography>
              <Typography variant="bodySmall1">
                Body Small 1 - The quick brown fox jumps over the lazy dog
              </Typography>
              <Typography variant="bodySmall2">
                Body Small 2 - The quick brown fox jumps over the lazy dog
              </Typography>
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
              <Typography variant="linkLarge" as="a" href="#">
                Link Large
              </Typography>
              <Typography variant="linkMedium" as="a" href="#">
                Link Medium
              </Typography>
              <Typography variant="linkSmall" as="a" href="#">
                Link Small
              </Typography>
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

        <ComponentGrid id="chip" title="Chip">
          <VariantSection title="Variants">
            {(['solid', 'bordered', 'flat', 'faded', 'dot'] as const).map((v) => (
              <Chip key={v} variant={v} color="primary">
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Chip>
            ))}
          </VariantSection>
          <VariantSection title="Colors">
            {colors.map((c) => (
              <Chip key={c} variant="solid" color={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Chip>
            ))}
          </VariantSection>
          <VariantSection title="Sizes">
            {sizes.map((s) => (
              <Chip key={s} variant="solid" color="primary" size={s}>
                {s.toUpperCase()}
              </Chip>
            ))}
          </VariantSection>
          <VariantSection title="With Close Button">
            <Chip variant="solid" color="primary" isCloseable onClose={() => {}}>
              Closable Chip
            </Chip>
            <Chip variant="bordered" color="secondary" isCloseable onClose={() => {}}>
              Closable Chip
            </Chip>
            <Chip variant="flat" color="success" isCloseable onClose={() => {}}>
              Closable Chip
            </Chip>
          </VariantSection>
          <VariantSection title="With Content">
            <Chip variant="solid" color="primary" startContent={<Icons.Check />}>
              With Icon
            </Chip>
            <Chip variant="bordered" color="secondary" endContent={<Icons.Close />}>
              With End Icon
            </Chip>
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="skeleton" title="Skeleton">
          <VariantSection title="Basic">
            <Skeleton style={{ width: '200px', height: '20px' }} />
            <Skeleton style={{ width: '150px', height: '20px' }} />
            <Skeleton style={{ width: '100px', height: '20px' }} />
          </VariantSection>
          <VariantSection title="Radius">
            <Skeleton radius="none" style={{ width: '100px', height: '100px' }} />
            <Skeleton radius="sm" style={{ width: '100px', height: '100px' }} />
            <Skeleton radius="md" style={{ width: '100px', height: '100px' }} />
            <Skeleton radius="lg" style={{ width: '100px', height: '100px' }} />
            <Skeleton radius="full" style={{ width: '100px', height: '100px' }} />
          </VariantSection>
          <VariantSection title="Loaded State">
            <Skeleton isLoaded style={{ width: '200px', height: '20px' }}>
              <Text>Loaded content</Text>
            </Skeleton>
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="spacer" title="Spacer">
          <VariantSection title="Horizontal Spacing">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button>Button 1</Button>
              <Spacer x={2} />
              <Button>Button 2</Button>
              <Spacer x={4} />
              <Button>Button 3</Button>
            </div>
          </VariantSection>
          <VariantSection title="Vertical Spacing">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button>Button 1</Button>
              <Spacer y={2} />
              <Button>Button 2</Button>
              <Spacer y={4} />
              <Button>Button 3</Button>
            </div>
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="kbd" title="Kbd">
          <VariantSection title="Basic">
            <Kbd>Ctrl</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Enter</Kbd>
          </VariantSection>
          <VariantSection title="Key Combinations">
            <Kbd keys={['Ctrl', 'K']} />
            <Kbd keys={['Ctrl', 'Shift', 'P']} />
            <Kbd keys={['Cmd', 'S']} />
            <Kbd keys={['Alt', 'F4']} />
          </VariantSection>
          <VariantSection title="Sizes">
            <Kbd size="sm">Small</Kbd>
            <Kbd size="md">Medium</Kbd>
            <Kbd size="lg">Large</Kbd>
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="dropdown" title="Dropdown">
          <VariantSection title="Variants">
            {(['solid', 'bordered', 'light', 'flat', 'faded', 'shadow'] as const).map((v) => (
              <Dropdown key={v} defaultOpen={false}>
                <DropdownTrigger>
                  <Button variant="solid" color="primary">
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant={v}>
                  <DropdownItem itemKey="1">Item 1</DropdownItem>
                  <DropdownItem itemKey="2">Item 2</DropdownItem>
                  <DropdownItem itemKey="3">Item 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ))}
          </VariantSection>
          <VariantSection title="Colors">
            {colors.map((c) => (
              <Dropdown key={c} defaultOpen={false}>
                <DropdownTrigger>
                  <Button variant="solid" color={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu color={c}>
                  <DropdownItem itemKey="1">Item 1</DropdownItem>
                  <DropdownItem itemKey="2">Item 2</DropdownItem>
                  <DropdownItem itemKey="3">Item 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ))}
          </VariantSection>
          <VariantSection title="With Icons">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>With Icons</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem itemKey="1" startContent={<Icons.Edit />}>
                  Edit
                </DropdownItem>
                <DropdownItem itemKey="2" startContent={<Icons.Copy />}>
                  Copy
                </DropdownItem>
                <DropdownItem itemKey="3" startContent={<Icons.Trash />}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
          <VariantSection title="With Descriptions">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>With Descriptions</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem itemKey="1" title="Settings" description="Manage your preferences">
                  Settings
                </DropdownItem>
                <DropdownItem itemKey="2" title="Profile" description="View your profile">
                  Profile
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
          <VariantSection title="With Shortcuts">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>With Shortcuts</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem itemKey="1" shortcut="⌘K">
                  Search
                </DropdownItem>
                <DropdownItem itemKey="2" shortcut="⌘N">
                  New
                </DropdownItem>
                <DropdownItem itemKey="3" shortcut="⌘S">
                  Save
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
          <VariantSection title="With Sections">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>With Sections</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection title="Actions">
                  <DropdownItem itemKey="1">Edit</DropdownItem>
                  <DropdownItem itemKey="2">Copy</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger Zone" showDivider>
                  <DropdownItem itemKey="3">Delete</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
          <VariantSection title="Single Selection">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>Single Select</Button>
              </DropdownTrigger>
              <DropdownMenu selectionMode="single" defaultSelectedKeys={['1']}>
                <DropdownItem itemKey="1">Option 1</DropdownItem>
                <DropdownItem itemKey="2">Option 2</DropdownItem>
                <DropdownItem itemKey="3">Option 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
          <VariantSection title="Multiple Selection">
            <Dropdown defaultOpen={false}>
              <DropdownTrigger>
                <Button>Multiple Select</Button>
              </DropdownTrigger>
              <DropdownMenu selectionMode="multiple" defaultSelectedKeys={['1', '2']}>
                <DropdownItem itemKey="1">Option 1</DropdownItem>
                <DropdownItem itemKey="2">Option 2</DropdownItem>
                <DropdownItem itemKey="3">Option 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </VariantSection>
        </ComponentGrid>

        <ComponentGrid id="icons" title="Icons">
          <VariantSection title="All Icons">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '1.5rem',
                width: '100%'
              }}
            >
              {[
                { name: 'Home', icon: <Icons.Home /> },
                { name: 'Search', icon: <Icons.Search /> },
                { name: 'Menu', icon: <Icons.Menu /> },
                { name: 'Close', icon: <Icons.Close /> },
                { name: 'Check', icon: <Icons.Check /> },
                { name: 'Plus', icon: <Icons.Plus /> },
                { name: 'Minus', icon: <Icons.Minus /> },
                { name: 'ArrowLeft', icon: <Icons.ArrowLeft /> },
                { name: 'ArrowRight', icon: <Icons.ArrowRight /> },
                { name: 'ArrowUp', icon: <Icons.ArrowUp /> },
                { name: 'ArrowDown', icon: <Icons.ArrowDown /> },
                { name: 'ChevronLeft', icon: <Icons.ChevronLeft /> },
                { name: 'ChevronRight', icon: <Icons.ChevronRight /> },
                { name: 'ChevronUp', icon: <Icons.ChevronUp /> },
                { name: 'ChevronDown', icon: <Icons.ChevronDown /> },
                { name: 'Calendar', icon: <Icons.Calendar /> },
                { name: 'Clock', icon: <Icons.AlarmClock /> },
                { name: 'Location', icon: <Icons.Location /> },
                { name: 'User', icon: <Icons.User /> },
                { name: 'Settings', icon: <Icons.Settings /> },
                { name: 'Bell', icon: <Icons.Bell /> },
                { name: 'Heart', icon: <Icons.Heart /> },
                { name: 'Star', icon: <Icons.Star /> },
                { name: 'Mail', icon: <Icons.Mail /> },
                { name: 'Edit', icon: <Icons.Edit /> },
                { name: 'Trash', icon: <Icons.Trash /> },
                { name: 'Copy', icon: <Icons.Copy /> },
                { name: 'Share', icon: <Icons.Share /> },
                { name: 'Download', icon: <Icons.Download /> },
                { name: 'Upload', icon: <Icons.Upload /> },
                { name: 'Refresh', icon: <Icons.Refresh /> },
                { name: 'Filter', icon: <Icons.Filter /> },
                { name: 'Image', icon: <Icons.Image /> },
                { name: 'File', icon: <Icons.File /> },
                { name: 'Folder', icon: <Icons.Folder /> },
                { name: 'Info', icon: <Icons.Info /> },
                { name: 'Warning', icon: <Icons.Warning /> },
                { name: 'Lock', icon: <Icons.Lock /> },
                { name: 'Unlock', icon: <Icons.Unlock /> },
                { name: 'Eye', icon: <Icons.Eye /> },
                { name: 'EyeOff', icon: <Icons.EyeOff /> },
                { name: 'ExternalLink', icon: <Icons.ExternalLink /> },
                { name: 'MoreVertical', icon: <Icons.MoreVertical /> },
                { name: 'MoreHorizontal', icon: <Icons.MoreHorizontal /> },
                { name: 'CheckCircle', icon: <Icons.CheckCircle /> },
                { name: 'XCircle', icon: <Icons.XCircle /> }
              ].map(({ name, icon }) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    backgroundColor: 'var(--color-surface-2)',
                    borderRadius: 'var(--r-lg)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ color: 'var(--color-brand)' }}>{icon}</div>
                  <Text size="xs" color="muted" as="span">
                    {name}
                  </Text>
                </div>
              ))}
            </div>
          </VariantSection>

          <VariantSection title="Colors">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--color-border)'
              }}
            >
              {colors.map((c) => {
                const iconColor:
                  | 'default'
                  | 'primary'
                  | 'secondary'
                  | 'success'
                  | 'warning'
                  | 'danger'
                  | 'foreground' = c === 'default' ? 'foreground' : c;
                return (
                  <div
                    key={c}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Icons.Home color={iconColor} size="lg" />
                    <Text size="xs" color="muted" as="span">
                      {c}
                    </Text>
                  </div>
                );
              })}
            </div>
          </VariantSection>

          <VariantSection title="Sizes">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--color-border)'
              }}
            >
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <div
                  key={s}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Icons.Home size={s} color="primary" />
                  <Text size="xs" color="muted" as="span">
                    {s.toUpperCase()}
                  </Text>
                </div>
              ))}
            </div>
          </VariantSection>

          <div style={{ marginBottom: '2rem', width: '100%' }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--color-fg-muted)'
              }}
            >
              All Icons × All Colors
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--color-border)',
                width: '100%'
              }}
            >
              {[
                { name: 'Home', icon: Icons.Home },
                { name: 'Search', icon: Icons.Search },
                { name: 'Calendar', icon: Icons.Calendar },
                { name: 'Trash', icon: Icons.Trash },
                { name: 'Edit', icon: Icons.Edit },
                { name: 'Plus', icon: Icons.Plus },
                { name: 'Location', icon: Icons.Location },
                { name: 'User', icon: Icons.User },
                { name: 'Settings', icon: Icons.Settings },
                { name: 'Bell', icon: Icons.Bell },
                { name: 'Heart', icon: Icons.Heart },
                { name: 'Star', icon: Icons.Star },
                { name: 'Mail', icon: Icons.Mail },
                { name: 'Download', icon: Icons.Download },
                { name: 'Upload', icon: Icons.Upload },
                { name: 'Copy', icon: Icons.Copy },
                { name: 'Share', icon: Icons.Share },
                { name: 'Refresh', icon: Icons.Refresh },
                { name: 'Filter', icon: Icons.Filter },
                { name: 'Image', icon: Icons.Image },
                { name: 'File', icon: Icons.File },
                { name: 'Folder', icon: Icons.Folder },
                { name: 'Info', icon: Icons.Info },
                { name: 'Warning', icon: Icons.Warning },
                { name: 'Lock', icon: Icons.Lock },
                { name: 'Eye', icon: Icons.Eye },
                { name: 'ExternalLink', icon: Icons.ExternalLink },
                { name: 'CheckCircle', icon: Icons.CheckCircle },
                { name: 'XCircle', icon: Icons.XCircle }
              ].map(({ name, icon: IconComponent }) =>
                colors.map((c) => {
                  const iconColor:
                    | 'default'
                    | 'primary'
                    | 'secondary'
                    | 'success'
                    | 'warning'
                    | 'danger'
                    | 'foreground' = c === 'default' ? 'foreground' : c;
                  return (
                    <div
                      key={`${name}-${c}`}
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
                      <IconComponent color={iconColor} size="lg" />
                      <div style={{ textAlign: 'center' }}>
                        <Text size="xs" color="muted" as="span">
                          {name} / {c}
                        </Text>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </ComponentGrid>
      </main>
    </div>
  );
};

ThemeShowcase.displayName = 'ThemeShowcase';
