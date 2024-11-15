import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'URL Shortener | Redirecting',
    description: 'Redirecting to the original URL',
  }
}

export default async function ShortUrlRedirect(params: { 
  params: Promise<{ shortCode: string }> 
}) {
  const { shortCode } = await params.params;

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_code', shortCode)
    .single()

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-600">404 - URL Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">The requested short URL does not exist or has been removed.</p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/">
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  redirect(data.original_url)
}