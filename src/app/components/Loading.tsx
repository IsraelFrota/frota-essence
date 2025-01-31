import React from "react";

const Loading: React.FC = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-t-[#202020] border-b-[#202020] border-blue-600 animate-spin" 
          style={{ animationDuration: '1s' }}>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-t-[#202020] border-b-[#202020] border-blue-600 animate-spin" 
              style={{ animationDuration: '0.5s' }}>
                
            </div>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-500">Carregando...</p>
    </div>
  );
};

export default Loading;