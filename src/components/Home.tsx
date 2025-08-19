import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import SignIn from "~/components/auth/SignIn";
import AdminPanelLink from "~/components/dev/AdminPanelLink";

export default function Home({ greeting }: { greeting: string }) {
  return (
    <main className="to-background from-primary/20 text-foreground flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      <div className="text-primary container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="bg-foreground/10 hover:bg-foreground/20 flex max-w-xs flex-col gap-4 rounded-xl p-4"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="bg-foreground/10 hover:bg-foreground/20 flex max-w-xs flex-col gap-4 rounded-xl p-4"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-foreground text-2xl">{greeting}</p>
        </div>
        <SignIn />
        <AdminPanelLink />

        <LatestPost />
      </div>
    </main>
  );
}
