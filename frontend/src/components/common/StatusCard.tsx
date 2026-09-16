import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type StatusCardProps = {
  title: string
  description: string
}

/**
 * shadcn Card primitiveを組み合わせてstatus summaryを表示するshared component。
 * feature固有ロジックを持たないcomposition exampleとして利用する。
 */
export function StatusCard({ title, description }: StatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
