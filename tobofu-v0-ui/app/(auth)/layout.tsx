import { Navbar } from '@/components/common/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar isDashboard={false} />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </>
  )
}
