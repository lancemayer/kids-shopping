import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Thumbnail from "~/components/Thumbnail";
import { getItemListItems } from "~/models/item.server";

export const loader: LoaderFunction = async () => {
  return await getItemListItems();
};

export default function Index() {
  let items: any[] = useLoaderData();

  return (
    <main className="bg-gray-100 h-screen">
      <div className="flex flex-wrap">
        {items.map((item) => (
          <Thumbnail
            key={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </main>
  );
}
