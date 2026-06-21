import { Navbar } from '@/components/common/Navbar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar isDashboard={true} />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
