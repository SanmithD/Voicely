import { useState } from "react";

function PostThread() {
  const [threadData, setThreadData] = useState({
    media : "",
    title: "",
    content: "",
  });



  return (
    <div className="px-6 py-4 md:flex lg:flex flex-col " >
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl " >Post new Thought</h1>
      <div>
        <div className="w-full md:w-[40%] mg:w-[40%] flex justify-center items-center flex-col gap-4 " >
          <div>
          <input type="file" name="media" id="media" />
          </div>
          <div className="w-full" >
            <input type="text" name="title" id="title" onChange={(e)=>setThreadData({ ...threadData, title: e.target.value })} value={threadData.title} placeholder="Title" className="pl-3 py-1 border-2 w-full border-base-300" />
          </div>
          <div>
            <textarea name="content" id="content" onChange={(e)=>setThreadData({ ...threadData, content: e.target.value })} value={threadData.content} placeholder="Description" rows={5} cols={100} className="pl-2 py-1 border-2 w-[100%] border-accent-content" ></textarea>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default PostThread