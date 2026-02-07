import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../_proxy';

export async function POST(req: NextRequest, { params }: { params: { testId: string } }) {
  return proxyRequest(req, `/tests/${params.testId}/submit`);
}
