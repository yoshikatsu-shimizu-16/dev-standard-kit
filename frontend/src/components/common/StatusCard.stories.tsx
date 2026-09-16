import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusCard } from './StatusCard'

const meta = {
  title: 'Common/StatusCard',
  component: StatusCard,
  args: {
    title: 'shadcn/ui + Tailwind',
    description: '共有UIはshadcn primitiveを組み合わせて実装します。',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatusCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
