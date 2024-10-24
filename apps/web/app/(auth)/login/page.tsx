import { LogoGoogle } from '@avelin/icons'
import { Button } from '@avelin/ui/button'

export default function Page() {
  return (
    <div className='w-[400px] m-auto bg-white border border-neutral-100 rounded-xl shadow-lg flex flex-col gap-6 p-8'>
      <div className='space-y-4'>
        <h1 className='text-3xl font-semibold tracking-tight text-center'>
          Login to Avelin
        </h1>
        <p className='text-center text-neutral-500'>
          Pick an authentication provider.
        </p>
      </div>
      <div className='w-full'>
        <Button
          className='w-full'
          variant='secondary'
        >
          <LogoGoogle />
          <p>Continue with Google</p>
        </Button>
      </div>
    </div>
  )
}
