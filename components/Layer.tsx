import Image from "next/image";
export function Layer() {
  return (
    <div className="absolute flex items-center justify-center right-[-30px] opacity-40 top-0 z-0">
      <div className="bg-white p-6 rounded-lg  w-full">
        <Image
          src={"/images/layer.svg"}
          alt="Loading..."
          width={400}
          height={400}
          className="mx-auto mb-4"
        />
      </div>
    </div>
  );
}
