import './App.css';

function App() {

  return (
    <div className="container mx-auto p-2">
      
      <header className='text-center mt-4 mb-4'>
         <h1 className='text-3xl font-bold text-gray-500'>CBZ77 - github</h1>
      </header>

      <main>
        
        <div className='container mx-auto m-w-6/12 mt-10'>
        
          <div className='flex flex-row gap-3'>
            <a href='https://cbz77.github.io/ai_assistant' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32'>AI assistant</a>
            <a href='https://cbz77.github.io/react_ts_test' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32'>Typescript Test</a>
            <a href='https://cbz77.github.io/simple_website' className='btn btn-neutral text-3xl font-bold text-blue-500 w-1/2 min-h-32'>Simple website</a>
          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
