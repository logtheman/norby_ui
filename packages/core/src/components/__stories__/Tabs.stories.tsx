import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from '../Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Core/Tabs',
  component: Tabs
};
export default meta;

type S = StoryObj<typeof Tabs>;

export const Default: S = {
  render: () => (
    <Tabs defaultSelectedKey="1">
      <Tab id="1" title="Tab 1">
        Content for Tab 1
      </Tab>
      <Tab id="2" title="Tab 2">
        Content for Tab 2
      </Tab>
      <Tab id="3" title="Tab 3">
        Content for Tab 3
      </Tab>
    </Tabs>
  )
};
export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Solid</h3>
        <Tabs variant="solid" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content 1
          </Tab>
          <Tab id="2" title="Tab 2">
            Content 2
          </Tab>
        </Tabs>
      </div>
      <div>
        <h3>Bordered</h3>
        <Tabs variant="bordered" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content 1
          </Tab>
          <Tab id="2" title="Tab 2">
            Content 2
          </Tab>
        </Tabs>
      </div>
      <div>
        <h3>Light</h3>
        <Tabs variant="light" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content 1
          </Tab>
          <Tab id="2" title="Tab 2">
            Content 2
          </Tab>
        </Tabs>
      </div>
      <div>
        <h3>Underlined</h3>
        <Tabs variant="underlined" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content 1
          </Tab>
          <Tab id="2" title="Tab 2">
            Content 2
          </Tab>
        </Tabs>
      </div>
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs color="primary" defaultSelectedKey="1">
        <Tab id="1" title="Primary">
          Content
        </Tab>
        <Tab id="2" title="Tab 2">
          Content
        </Tab>
      </Tabs>
      <Tabs color="secondary" defaultSelectedKey="1">
        <Tab id="1" title="Secondary">
          Content
        </Tab>
        <Tab id="2" title="Tab 2">
          Content
        </Tab>
      </Tabs>
      <Tabs color="success" defaultSelectedKey="1">
        <Tab id="1" title="Success">
          Content
        </Tab>
        <Tab id="2" title="Tab 2">
          Content
        </Tab>
      </Tabs>
    </div>
  )
};
export const Placements: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Top (default)</h3>
        <Tabs placement="top" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content
          </Tab>
          <Tab id="2" title="Tab 2">
            Content
          </Tab>
        </Tabs>
      </div>
      <div>
        <h3>Bottom</h3>
        <Tabs placement="bottom" defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">
            Content
          </Tab>
          <Tab id="2" title="Tab 2">
            Content
          </Tab>
        </Tabs>
      </div>
    </div>
  )
};
