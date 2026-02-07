import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../../../../../_proxy';

export async function POST(
  req: NextRequest,
  { params }: { params: { attemptId: string; questionId: string } },
) {
  return proxyRequest(
    req,
    `/admin/tests/attempts/${params.attemptId}/answers/${params.questionId}/override`,
  );
}
