import { Coolshape } from "coolshapes-react";

import UrlShortenerForm from "@/components/url-shortener-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-full p-4 w-20 h-20 flex items-center justify-center">
            <Coolshape type="moon" index={4} noise={true} size={80} className="text-white opacity-90" />
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            TrimURL
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Transform long links into short, shareable URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UrlShortenerForm />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Made with{" "}
          <span role="img" aria-label="love" className="text-red-500">
            ❤️
          </span>{" "}
          using <b>Next.js and shadcn/ui</b> by{" "}
          <b>
            <a
              href="https://arjuncodess.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @ArjunCodess
            </a>
          </b>
        </p>
      </footer>
    </main>
  );
}
