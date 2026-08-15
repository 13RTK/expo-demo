import { clearPurchasedItems } from '@/lib/server/db-action';

export async function DELETE() {
  try {
    await clearPurchasedItems();

    return Response.json({ statusCode: 200, message: 'OK' }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to clear items';
    return Response.json({ error: message }, { status: 500 });
  }
}
