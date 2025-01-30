"use client";

import React, { useEffect, useState } from "react";

interface User {
  nickname: string;
}

interface CommentsProps {
  id: number;
  userId: number;
  postId: number;
  message: string;
  createdAt: Date;
  user: User;
}

interface CommentProps {
  commentsData: CommentsProps[];
}

const Comment: React.FC<CommentProps> = ({ commentsData }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [numberComments, setNumberComments] = useState<number>(0);

  useEffect(() => {
    setNumberComments(commentsData.length);
  });

  // Função para alternar a visibilidade do caixa de comentários
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  // Função para lidar com a mudança no texto do comentário
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // Função para adicionar o comentário à lista de comentários
  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      setComments([commentText, ...comments]); // Adiciona o comentário no topo
      setCommentText(""); // Limpa o campo de texto
      setNumberComments(numberComments + 1);
    }
  };

  // Função para fechar o caixa de comentários
  const handleCloseCommentBox = () => {
    setShowCommentBox(false);
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="relative inline-block z-10"> 
        {/* Botão que ao clicar exibe o box de comentários */}
        <button
          onClick={toggleCommentBox}
          className="px-4 py-2 font-semibold rounded-md cursor-pointer hover:bg-gray-300"
        >
          <div className="flex gap-2">
            <span>{numberComments}</span>
            <span>Comentários</span>
          </div>
        </button>
      </div>

      {/* Box de comentários */}
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-200 p-4 rounded-md shadow-lg ${
          showCommentBox
            ? "opacity-100 visible scale-100 z-20"
            : "opacity-0 invisible scale-95"
        } w-[450px] h-[450px] overflow-y-auto m-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comentários</h2>
          <button
            onClick={handleCloseCommentBox}
            className="text-xl font-bold text-gray-700 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Exibição dos comentários existentes */}
        <div className="space-y-2 mb-4">
          {commentsData.map((comment, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-orange-400 w-[30px] h-[30px] rounded-full"></div>
                <span>{comment.user.nickname}</span>
              </div>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>

        {/* Caixa para adicionar novo comentário */}
        <textarea
          className="w-full h-[100px] p-2 border rounded-md mb-4"
          placeholder="Escreva seu comentário..."
          value={commentText}
          onChange={handleCommentChange}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Comentar
        </button>
      </div>
    </div>
  );
};

export default Comment;
