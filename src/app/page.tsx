import CreateRoomButton from './create-room-button'

export default function Home() {
  return (
    <main className="h-screen max-w-screen-xl flex flex-col items-center justify-center mx-auto gap-48 bg-zinc-100 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-7xl tracking-tighter font-bold">Ready to code?</h1>
        <p className="font-mono tracking-tighter text-2xl">
          Create a new room to get started.
        </p>
      </div>
      <CreateRoomButton />
    </main>
  )
}
