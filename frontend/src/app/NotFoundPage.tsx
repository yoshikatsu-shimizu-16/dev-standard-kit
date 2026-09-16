import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="grid gap-4" aria-labelledby="not-found-title">
      <p className="m-0 text-sm font-bold tracking-[0.08em] text-muted-foreground uppercase">
        404
      </p>
      <h1
        id="not-found-title"
        className="m-0 text-4xl font-bold tracking-tight"
      >
        Page not found
      </h1>
      <p className="m-0 max-w-[60ch] leading-7 text-muted-foreground">
        The requested route does not exist in this starter.
      </p>
      <Link className="w-fit font-medium underline underline-offset-4" to="/">
        Back to starter
      </Link>
    </section>
  )
}
