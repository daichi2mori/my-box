import Image from "next/image";
import Link from "next/link";

const Page = ({ params }: { params: { path: string } }) => {
  const decodedPath = decodeURIComponent(params.path);
  const author = decodedPath.split("__")[0];
  const title = decodedPath.split("__")[1];

  return (
    <main className="w-full h-[100svh] flex flex-col items-center justify-center p-5">
      <Image
        src={`http://localhost:3005/cover/${params.path}`}
        width={500}
        height={500}
        priority={true}
        alt="i"
      />
      <div className="flex flex-col items-center justify-between gap-5 lg:gap-8 px-5 pb-10">
        <p className="flex justify-center text-neutral-100 font-semibold mt-2">{title}</p>
        <Link
          href={`/ero/author/${author}`}
          className="py-2 px-4 bg-neutral-100 text-background font-medium rounded-md"
        >
          {author}
        </Link>
        <Link
          href={`/ero/book/${params.path}`}
          className="py-2 px-4 bg-neutral-100 text-background font-medium rounded-md"
        >
          続き
        </Link>
      </div>
    </main>
  );
};

export default Page;
