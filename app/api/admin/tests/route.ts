import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_proxy';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.search ? url.search : '';
  return proxyRequest(req, `/admin/tests${query}`);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, '/admin/tests');
}
