import {
    Bookmark,
    MessageCircle,
    Share2Icon,
    ThumbsUpIcon,
} from "lucide-react";
import { useState } from "react";
import { UseThreadStore } from "../store/UseThreadStore";

function Controllers( id ) {
    const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [isComment, setIsComment] = useState(false);
  const { giveLike } = UseThreadStore();

  console.log(id);

  const handleLike = async() =>{
    setColor("blue-500");
    await giveLike(id);
  }

  return (
    <div className="mt-2" >
      <div className="flex items-center gap-4  ">
        <div>
          <button onClick={handleLike} >
            <ThumbsUpIcon className={`text-${color}`} />
          </button>
        </div>
        <div>
          <button onClick={() => setIsComment(!isComment)}>
            <MessageCircle />{" "}
          </button>
        </div>
        <div>
          <button>
            <Bookmark />
          </button>
        </div>
        <div>
          <button>
            <Share2Icon />{" "}
          </button>
        </div>
      </div>
      <div>
        {isComment ? (
          <div>
            <input
              type="text"
              name="message"
              placeholder="Comment..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button>Send</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Controllers;
