import React , {useRef , useEffect, useState} from 'react'

import axios from 'axios';

const App = () => {

  const inputRef = useRef(null);

  const [whatNumber , setWhatNumber] = useState('');

  const [copyAlert , setCopyAlert] = useState(false);
  
  const fetchingNumberHistory = async () => {

    if (!Number(inputRef.current.value)) {
      setWhatNumber('Unknown Number');
      return;
    }

    let url = `http://numbersapi.com/${Number(inputRef.current.value)}`;
    const response = await axios.get(url).then((res)=>{return res}).catch((err) => {return err});
    setWhatNumber(response.data);
      
  }

  const copyHistory = () => {
    if (whatNumber !== '' && whatNumber !== 'Unknown Number') {

      navigator.clipboard.writeText(whatNumber)

      setCopyAlert(true);

      setTimeout(()=>{
        setCopyAlert(false);
      },3000)

    }
  }

  return (
    <div id='outerBox' className="w-[100%] h-[100vh] p-2 font-sans flex items-center flex-col justify-start md:justify-center bg-yellow-400">
      <div id="mainBox" className='w-[98%] my-2 sm:w-[70%] md:w-[60%] flex flex-col mx-auto gap-y-3 bg-slate-200 p-3 shadow-lg rounded-[4px]'>
        <h1 className='text-center my-2 text-2xl text-[#232323] font-[400]'>What Number ?</h1>
        <input type="text" placeholder='Enter Number' ref={inputRef} className='border-2 px-2 py-1 border-blue-900 outline-none rounded-[4px] text-[#232323]'/>
        <button type='button' className='w-[100%] bg-blue-800 hover:bg-blue-900 border-2 border-blue-900 text-white py-1 px-2 rounded-[4px]' onClick={()=>{fetchingNumberHistory()}}>What Number ?</button>
        <div id="outputBox" className='w-[100%] h-[40vh] flex flex-col items-center justify-center gap-y-3 select-none'>
          <p id='answer' className='p-2 w-[100%] h-[100%] text-[#232323] flex items-center justify-center text-center bg-white border-b-8 rounded-[4px] border-blue-800'>{whatNumber}</p>
          <div id="copyBtn" className='flex justify-between w-[100%]'>
            <button className="px-2 py-1 bg-blue-800 text-white hover:bg-blue-900 rounded-[4px]" type='button' onClick={()=>{copyHistory()}}>Copy</button>
            {
              copyAlert && <span className='px-2 py-1 bg-yellow-400 text-blue-900 font-[400] rounded-[4px] transition-all'>Copied !!</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
