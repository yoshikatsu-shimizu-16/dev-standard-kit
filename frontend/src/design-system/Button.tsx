import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const baseClassName =
  'inline-flex items-center justify-center rounded-control px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-strong focus-visible:outline-brand',
  secondary:
    'border border-border bg-surface text-foreground hover:bg-canvas focus-visible:outline-foreground',
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [baseClassName, variantClassNames[variant], className]
    .filter(Boolean)
    .join(' ')

  return <button type={type} className={classes} {...props} />
}
