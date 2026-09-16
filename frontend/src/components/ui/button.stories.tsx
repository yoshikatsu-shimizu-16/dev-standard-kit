import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Primary action',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary action',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline action',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled action',
  },
}
