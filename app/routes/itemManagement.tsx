import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { deleteItem, getItemListItems } from "~/models/item.server";

export const loader: LoaderFunction = async () => {
  return await getItemListItems();
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let itemId = formData.get("id") as string;
  if (itemId) {
    console.log("itemId: " + itemId);
    await deleteItem({ id: itemId });
  }
  return {};
};

const ItemManagement = () => {
  let items: any[] = useLoaderData();

  return (
    <main>
      {items.map((item) => (
        <div key={item.id} className="pl-3">
          <img
            className="inline"
            src={item.image}
            alt={item.title}
            width="100px"
          />
          <div className="inline font-medium">{item.title}</div>
          <div className="ml-2 inline">${item.price}</div>
          <Form method="post" style={{ display: "inline" }}>
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              name="_action"
              value="delete"
              className="bg-red-500 text-white p-2 ml-2"
              aria-label="delete"
            >
              Delete
            </button>
          </Form>
        </div>
      ))}
    </main>
  );
};

export default ItemManagement;
