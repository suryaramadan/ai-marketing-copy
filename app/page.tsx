"use client"
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { PulseLoader } from 'react-spinners'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(input.length < 30) setError(false)
  }, [input])

  const submit = async () => {
    // limit karakter
    if(input.length > 30) return setError(true)
    
    // loading
    setLoading(true)

    try {
      const res = await fetch('/api/marketing-copy', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(input)
      })    

      const suggestion: {result: string} = await res.json()
      const { result } = suggestion

      setSuggestion(result)
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
  return (
      <div className='max-w-7xl mx-auto py-12'>
        <h1 className='text-2xl font-bold text-center mb-3'>Marketing Copy Generator</h1>
          <div className='flex flex-col gap-4 justify-center w-1/3 min-w-full md:min-w-0 mx-auto p-5'>
            <div className='relative w-full'>
              {error && (
                <div className='text-red-500 text-xs'>Tulis minimal 30 karakter</div>
              )} 
              <textarea 
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='w-full border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none'
                placeholder='Masukkan jasa atau produkmu disini'
              />
              <div className={`absolute ${input.length > 30 ? 'text-red-500' : 'text-gray-400'} bottom-3 right-2 text-xs`}>
                <span>{input.length}</span>/30
              </div>
            </div>
            <button type="button" onClick={submit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              {loading ? (<PulseLoader size={10} color="white" />) : ('Generate')}
            </button>

            {suggestion && (
            <div className='mt-4'>
              <div className='relative w-full rounded-md bg-gray-100 p-4'>
                <p className='text-sm text-gray-700'>{suggestion}</p>
              </div>
            </div>
            )}
          </div>
          <h6 className='text-xs text-center text-gray-400 py-5'><Link href={'https://tiowebsite.com'}>@ Tiowebsite.com - Project AI Marketing Copy Generator</Link></h6>
      </div>
  )
}
