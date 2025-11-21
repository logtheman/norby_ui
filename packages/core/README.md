# @logan/ui

Accessible, themable React UI primitives with zero-runtime CSS variables.

## Installation

```bash
npm install @logan/ui
# or
pnpm add @logan/ui
# or
yarn add @logan/ui
```

## Usage

```tsx
import { Button, TextField } from '@logan/ui';
import '@logan/ui/src/styles/base.css';

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


