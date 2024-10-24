export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='p-4 flex flex-col h-screen w-screen bg-neutral-50'>
      {children}
    </div>
  )
}
