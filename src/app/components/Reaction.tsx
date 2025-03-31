import React, { useEffect, useState } from 'react';
import { emoji } from '../lib/emoji';
import { DataReactionProps } from '../types/types';
import { useRouter } from 'next/navigation';

interface ReactionProps {
  postId: number;
  numberReaction: number
}

const Reaction: React.FC<ReactionProps> = ({ postId, numberReaction }) => {
  const [reactions, setReactions] = useState<DataReactionProps[]>([]);
  const [numberReactions, setNumberReactions] = useState<number>(0);
  const [isReactionOcorred, setIsReactionsOcorred] = useState<boolean>(false);
  const router = useRouter();

  const requestReactions = async () => {
    try {
      const response = await fetch(`/api/reaction?postId=${postId}`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setReactions(data.reactions);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleReactionClick = async (reaction: string) => {
    try {    
      const response = await fetch("/api/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ postId, type: reaction }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setNumberReactions(numberReactions + data.value);
        setIsReactionsOcorred(!isReactionOcorred);
      }

    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(()=> {
    requestReactions();
    setNumberReactions(numberReaction);
  }, []);
  
  useEffect(() => {
    requestReactions();
    router.refresh();
  }, [isReactionOcorred]);

  return (
    <div className="flex justify-center items-center max-h-max text-xs">
      <div className="relative inline-block group">
        <span className="flex justify-center bg-gray-300 w-[20px] rounded-[30%] text-xs">{numberReactions}</span>

        <div
          className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-200 p-2 rounded-md shadow-lg space-x-2"
        >
          <div className="flex flex-col w-[100px] truncate text-xs">
            {reactions && reactions.map((reaction, index) => (
              <div key={index} className="flex gap-2">
                <p>{emoji(reaction.type)}</p>
                <p>{reaction.user.nickname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative inline-block group text-xs">
        {/* Botão que, ao passar o mouse, exibe as reações */}
        <button className="px-4 py-2 font-semibold rounded-md cursor-pointer hover:bg-gray-300 text-xs">
          Reações
        </button>

        {/* Menu de reações */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-200 p-2 rounded-md text-xs shadow-lg space-x-2"
        >
          <div className="flex">
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Like')}
            >
              👍
            </button>
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Love')}
            >
              ❤️
            </button>
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Haha')}
            >
              😂
            </button>
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Wow')}
            >
              😮
            </button>
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Sad')}
            >
              🥺
            </button>
            <button
              className="text-3xl"
              onClick={() => handleReactionClick('Angry')}
            >
              😡
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reaction;
