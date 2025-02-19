import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#0e2342]">
      <Image
        src="/loader.png" // The image should be inside /public
        alt="Loading..."
        width={100}
        height={100}
        className="animate-spin"
      />
      <h4 className=" font-bold text-white">Welcome to Beautiful Planet.AI</h4>
    </div>
  );
};

export default Loader;

