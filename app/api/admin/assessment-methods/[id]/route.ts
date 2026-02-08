import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../_proxy';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/admin/assessment-methods/${params.id}`);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/admin/assessment-methods/${params.id}`);
}
