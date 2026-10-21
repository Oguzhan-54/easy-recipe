// Simple health check to verify that serverless functions run (locally via `vercel dev`).
export function GET() {
  return Response.json({ ok: true })
}
