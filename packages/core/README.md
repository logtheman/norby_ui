# @logtheman/ui

Accessible, themable React UI primitives with zero-runtime CSS variables.

## Installation

```bash
npm install @logtheman/ui
# or
pnpm add @logtheman/ui
# or
yarn add @logtheman/ui
```

## Usage

```tsx
import { Button, TextField } from '@logtheman/ui';
import '@logtheman/ui/src/styles/base.css';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <TextField label="Email" placeholder="you@example.com" />
    </div>
  );
}
```

## Components

- Button
- TextField
- Link
- Text, H1-H5
- Switch
- RadioGroup, Radio
- Select
- TimeInput
- Tabs, Tab
- DatePicker
- DateRangePicker
- RangeCalendar
- Card, CardHeader, CardBody, CardFooter
- Badge
- Alert
- Checkbox, CheckboxGroup
- Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
- Tooltip
- Spinner
- Progress, CircularProgress
- Divider
- Avatar
- Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter
- Popover, PopoverContent, PopoverTrigger
- Typography

## Requirements

- React >= 18
- React DOM >= 18

## License

MIT
