import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001/api';

export async function proxyRequest(req: NextRequest, path: string) {
  const url = `${API_BASE}${path}`;
  const headers = new Headers();
  const auth = req.headers.get('authorization');
  if (auth) {
    headers.set('authorization', auth);
  }
  if (req.headers.get('content-type')) {
    headers.set('content-type', req.headers.get('content-type') as string);
  }

  const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.text();
  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') ?? 'application/json',
    },
  });
}
