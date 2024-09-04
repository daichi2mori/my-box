import Link from "next/link";

export default function Home() {
  return (
    <main className="h-[100dvh] flex flex-col items-center justify-center">
      <Link
        href="/ero/page/1"
        className="py-3 px-6 bg-neutral-100 text-background text-lg font-medium rounded-md"
      >
        ERO
      </Link>
    </main>
  );
}
