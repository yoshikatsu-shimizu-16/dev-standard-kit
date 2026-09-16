import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Design System/Button',
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

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary action',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled action',
  },
}
