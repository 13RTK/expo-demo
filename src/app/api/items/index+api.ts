import { createGroceryItem, listGroceryItems } from '@/lib/server/db-action';

export async function GET() {
  try {
    const items = await listGroceryItems();

    return Response.json({ items });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed during fetching grocery items';

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, quantity, priority } = body;

    if (!name || !category || !quantity || !priority) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const item = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });
    return Response.json({ item }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create item';
    return Response.json({ error: message }, { status: 500 });
  }
}
