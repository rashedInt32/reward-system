import Image from "next/image";
export function Layer() {
  return (
    <div className="fixed right-[-25px] opacity-40 top-0 z-0">
      <div className="bg-white p-6 rounded-lg  w-full">
        <Image
          src={"/images/layer.svg"}
          alt="Loading..."
          width={400}
          height={400}
          className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"
        />
      </div>
    </div>
  );
}
