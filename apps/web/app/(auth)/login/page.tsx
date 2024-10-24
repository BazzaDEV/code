import { Button } from '@avelin/ui/button'
import { cn } from '@avelin/ui/cn'

export default function Page() {
  return (
    <div className='w-[400px] m-auto bg-white border border-neutral-100 rounded-xl shadow-lg flex flex-col p-8'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-semibold tracking-tight text-center'>
          Login to Avelin
        </h1>
        <p className='text-center text-neutral-500'>
          Pick an authentication provider.
        </p>
      </div>
      <div>
        <Button className={cn('')}>Google</Button>
      </div>
    </div>
  )
}
