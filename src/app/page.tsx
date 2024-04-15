import CreateRoomButton from './create-room-button'

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center gap-48 bg-zinc-100 p-4 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-center text-5xl font-bold tracking-tighter sm:text-7xl">
          Ready to code?
        </h1>
        <p className="text-center font-mono text-xl tracking-tighter sm:text-2xl">
          Create a new room to get started.
        </p>
      </div>
      <CreateRoomButton />
    </main>
  )
}
