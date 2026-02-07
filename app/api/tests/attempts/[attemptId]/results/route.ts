import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../../_proxy';

export async function GET(req: NextRequest, { params }: { params: { attemptId: string } }) {
  const url = new URL(req.url);
  const admin = url.searchParams.get('admin');
  const suffix = admin === 'true' ? '?admin=true' : '';
  return proxyRequest(req, `/tests/attempts/${params.attemptId}/results${suffix}`);
}
