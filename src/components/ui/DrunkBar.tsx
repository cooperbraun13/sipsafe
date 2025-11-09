export default function DrunkBar() {
  return (
    <div className="m-14 flex justify-center items-center h-[15vh]">
      <div className="flex flex-row w-[75vw] h-[6vh] items-start">
        <div className="flex-1 bg-[#22bb45] flex justify-center items-center text-3xl rounded-tl-md rounded-bl-md">
          😊
          <div className="text-2xl absolute -mt-12 ">▼</div>
        </div>
        <div className="flex-1 bg-gradient-to-r from-[#22bb45] via-[#FFFF00] to-[#C41E3A] flex justify-center items-center text-3xl">
          🥴
        </div>
        <div className="flex-1 bg-[#C41E3A] flex justify-center items-center text-3xl rounded-tr-md rounded-br-md">
          🤢
        </div>
      </div>
    </div>
  );
}