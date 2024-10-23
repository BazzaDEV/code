'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Page() {
  const [value, setValue] = useState<string | undefined>(undefined)
  useEffect(() => {
    async function fetchData() {
      const res = await api.auth.health.$get()
      const data = await res.json()

      setValue(data.message)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Test</h1>
      <p>{value}</p>
    </div>
  )
}
