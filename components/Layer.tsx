import Image from "next/image";
export function Layer() {
  return (
    <div className="fixed right-[-25px] opacity-20 top-0 z-0">
      <div className=" p-6 rounded-lg  w-full">
        <Image
          src={"/images/layer.svg"}
          alt="Loading..."
          width={400}
          height={400}
          priority
          className=""
        />
      </div>
    </div>
  );
}
