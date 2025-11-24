import type { Meta, StoryObj } from '@storybook/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '../Dropdown';
import { Button } from '../Button';
import * as Icons from '../icons';

const meta: Meta<typeof Dropdown> = {
  title: 'Core/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end'
      ]
    }
  }
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem itemKey="1">Item 1</DropdownItem>
          <DropdownItem itemKey="2">Item 2</DropdownItem>
          <DropdownItem itemKey="3">Item 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        padding: '4rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}
    >
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map(
        (color) => (
          <Dropdown key={color}>
            <DropdownTrigger>
              <Button color={color}>{color}</Button>
            </DropdownTrigger>
            <DropdownMenu color={color}>
              <DropdownItem itemKey="1">Item 1</DropdownItem>
              <DropdownItem itemKey="2">Item 2</DropdownItem>
              <DropdownItem itemKey="3">Item 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      )}
    </div>
  )
};

export const ComplexExample: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" endContent={<Icons.ChevronDown />}>
            User Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection title="Account">
            <DropdownItem itemKey="1" startContent={<Icons.User />} title="Profile">
              View Profile
            </DropdownItem>
            <DropdownItem itemKey="2" startContent={<Icons.Settings />} title="Settings">
              Settings
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Actions" showDivider>
            <DropdownItem itemKey="3" startContent={<Icons.Download />} shortcut="⌘D">
              Download
            </DropdownItem>
            <DropdownItem itemKey="4" startContent={<Icons.Share />} shortcut="⌘S">
              Share
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger Zone" showDivider>
            <DropdownItem itemKey="5" startContent={<Icons.Trash />}>
              Delete Account
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const DisabledItems: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Menu</Button>
        </DropdownTrigger>
        <DropdownMenu disabledKeys={['2']}>
          <DropdownItem itemKey="1">Enabled Item</DropdownItem>
          <DropdownItem itemKey="2">Disabled Item</DropdownItem>
          <DropdownItem itemKey="3">Another Enabled Item</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const MultipleSelection: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Select Multiple</Button>
        </DropdownTrigger>
        <DropdownMenu selectionMode="multiple" defaultSelectedKeys={['1', '2']}>
          <DropdownItem itemKey="1">Option 1</DropdownItem>
          <DropdownItem itemKey="2">Option 2</DropdownItem>
          <DropdownItem itemKey="3">Option 3</DropdownItem>
          <DropdownItem itemKey="4">Option 4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const SingleSelection: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Select Option</Button>
        </DropdownTrigger>
        <DropdownMenu selectionMode="single" defaultSelectedKeys={['1']}>
          <DropdownItem itemKey="1">Option 1</DropdownItem>
          <DropdownItem itemKey="2">Option 2</DropdownItem>
          <DropdownItem itemKey="3">Option 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        padding: '4rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}
    >
      {(['solid', 'bordered', 'light', 'flat', 'faded', 'shadow'] as const).map((variant) => (
        <Dropdown key={variant}>
          <DropdownTrigger>
            <Button>{variant}</Button>
          </DropdownTrigger>
          <DropdownMenu variant={variant}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
            <DropdownItem itemKey="3">Item 3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ))}
    </div>
  )
};

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Settings</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem itemKey="1" title="Account" description="Manage your account settings">
            Account
          </DropdownItem>
          <DropdownItem itemKey="2" title="Privacy" description="Control your privacy settings">
            Privacy
          </DropdownItem>
          <DropdownItem itemKey="3" title="Notifications" description="Manage notifications">
            Notifications
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Actions</Button>
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
    </div>
  )
};

export const WithLinks: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Navigation</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem itemKey="1" href="/home">
            Home
          </DropdownItem>
          <DropdownItem itemKey="2" href="/about">
            About
          </DropdownItem>
          <DropdownItem itemKey="3" href="/contact">
            Contact
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const WithSections: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>More Options</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection title="Actions">
            <DropdownItem itemKey="1" startContent={<Icons.Edit />}>
              Edit
            </DropdownItem>
            <DropdownItem itemKey="2" startContent={<Icons.Copy />}>
              Copy
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger Zone" showDivider>
            <DropdownItem itemKey="3" startContent={<Icons.Trash />}>
              Delete
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const WithShortcuts: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button>Commands</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem itemKey="1" shortcut="⌘K">
            Search
          </DropdownItem>
          <DropdownItem itemKey="2" shortcut="⌘N">
            New File
          </DropdownItem>
          <DropdownItem itemKey="3" shortcut="⌘S">
            Save
          </DropdownItem>
          <DropdownItem itemKey="4" shortcut="⌘Q">
            Quit
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
};
