import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
/* import { HarmCategory } from "@google/generative-ai";
import { HarmBlockThreshold } from "@google/generative-ai"; */
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function App() {

  const [question, setQuestion] = useState("")
  const [askedQuestion, setAskedQuestion] = useState("")
  const [answer, setAnswer] = useState("")
 
  const [newQuestionVisibility, setNewQuestionVisibility] = useState("hidden");
  const [questionVisibility, setQuestionVisibility] = useState("hidden");
  const [answerVisibility, setAnswerVisibility] = useState("hidden");
  const [hintVisibility, setHintVisibility] = useState("block");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    setHintVisibility("hidden");
    setAskedQuestion(question);
    setQuestion("");
    
    setQuestionVisibility("block");
    const answer = await getAnswerGemini(question);
    console.log(answer)
  }
  
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function getAnswerGemini(question: string) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(question);

    let answerText = result.response.text();
    setNewQuestionVisibility("block");
    setAnswerVisibility("block");
    setAnswer(answerText);
  }

  function newQuestion(){
    
    setAnswer("");
    setQuestion("");
    setAskedQuestion("");

    setAnswerVisibility("hidden");
    setQuestionVisibility("hidden");
    setNewQuestionVisibility("hidden");
    setHintVisibility("block");
  }

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
    <div className="flex max-w-full flex-1 flex-col">
      <div className="relative h-full w-full transition-width flex flex-col overflow-auto items-stretch flex-1">
        <div className="flex-1 overflow-auto bg-gray-800">
            <div className="flex flex-col justify-center items-center m-4">
              <img src="src\public\robot.png" className="w-20" style={{filter: "drop-shadow(0px 0px 20px #2b84a7)"}}></img>
              <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 text-gray-600 flex gap-4 p-4 items-center justify-center">
                <span className="text-blue-600">AI</span>Assistant<small className="text-xs">v1.0</small>
              </h1>
            </div>
          <div className="">
            <div className="h-full flex flex-col items-center text-sm bg-gray-800">

                <div className={`text-gray-600 italic ${hintVisibility}`}>Zeptej se mě na něco...</div>
              
                <div className={`w-11/12 p-2 m-2 bg-blue-200 border-2 border-blue-900 rounded-md ${questionVisibility}`}>
                  <h2 className="text-blue-700 font-bold">Uživatel:</h2>
                  <div className="question_div text-blue-700">{askedQuestion}</div>
                </div>

                <div className={`w-11/12 p-2 m-2 bg-yellow-100 border-2 border-yellow-900 rounded-md ${answerVisibility}`}>
                  <h2 className="text-yellow-700 font-bold">AI Assitant:</h2>
                  <div className="answer_div text-yellow-700">{answer}</div>
                </div>

                <div className="flex justify-center items-start" style={{width: "100%", height:"200px", clear:"both"}}>
                  <button className={`bg-blue-500 border-2 border-blue-900 rounded-md text-blue-900 p-2 ${newQuestionVisibility}`} onClick={newQuestion}>Zeptat se na novou otázku</button>
                </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 border-white/20 md:border-transparent md:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent md:bg-vert-dark-gradient pt-2">
          <form 
            onSubmit={handleSubmit}
            className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              <div className="flex flex-row w-full gap-2 py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 border-gray-900/50 text-white bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  value={question}
                  tabIndex={0}
                  data-id="root"
                  placeholder="Napiš otázku ..."
                  className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent pl-2 md:pl-0"
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="w-3/12 bg-yellow-500 border-2 border-yellow-900 rounded-md mr-2"
                >
                  <PaperAirplaneIcon 
                    className="size-1"
                  />
                </button>
              </div>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 text-white/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              Powered by Google AI. <small>Odpovědi mohou být špatné nebo zavádějící!</small>
            </span>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};