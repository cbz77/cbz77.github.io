import './App.css';

function App() {

  return (
    <div className="container mx-auto">
      
      <header className='text-center mt-4 mb-4'>
         <h1 className='text-3xl font-bold text-gray-500'>CBZ77 - github</h1>
      </header>

      <main>
        
        <div className='container mx-auto w-screen p-10 mt-10'>
        
          <div className='flex flex-wrap gap-3 mb-3'>
            <a href='https://cbz77.github.io/ai_assistant' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32 flex-1'>AI assistant</a>
            <a href='https://cbz77.github.io/react_ts_test' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32 flex-1'>Typescript Test</a>
          </div>

          <div className='flex flex-wrap gap-3'>
            <a href='https://cbz77.github.io/ai_assistant' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32 flex-1'>AI assistant</a>
            {/* <a href='https://cbz77.github.io/react_ts_test' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32 flex-1'></a> */}
          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
