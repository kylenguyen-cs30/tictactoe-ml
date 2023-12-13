import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=''>
        <h1 className='text-4xl front-bold front-underline'>This is the title of the application </h1>

        <h2 className='text-3xl'>This is the subtitle</h2>

        <h3 className='text-2xl '>This is h3 title</h3>

        {/* this is grid layout */}

        <div className='grid grid-cols-3 gap-4 flex flex-col'>
          <div>
            <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>
            <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
          <div>              <button className="bg-purple-500 hover:bg-blue-500 text-white font-bold py-5 px-5 rounded">01</button>
          </div>
        </div>

        <div className='flex min-h-fit flex-col py-10'>
          <button className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Start a new game</button>
        </div>





        <p>i am using Tailwind css</p>
      </div>
    </main>
  )
}


