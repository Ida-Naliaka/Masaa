import React from "react";

const Announcement = ({ str }) => {
  return (
    <div className="w-[100vw] md:h-[10vh] h-[80vh] flex items-center bg-[#132a20]">
      <div
        className="h-[50%] opacity-80 bg-[#035a77] flex items-center justify-center md:text-[50px] text-[35px] font-medium tracking-[10px] mx-auto my-[50px]"
        style={{fontFamily: "Satisfy, cursive"}}
      >
        {str}
      </div>
    </div>
  );
};

export default Announcement;
