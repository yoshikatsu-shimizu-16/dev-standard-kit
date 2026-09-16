type StatusCardProps = {
  title: string
  description: string
}

export function StatusCard({ title, description }: StatusCardProps) {
  return (
    <article className="rounded-card border border-border bg-surface p-5 shadow-card">
      <h2 className="mb-2 text-base font-semibold text-foreground">{title}</h2>
      <p className="m-0 leading-6 text-muted">{description}</p>
    </article>
  )
}
