import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/proposals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/proposal/"!</div>
}
