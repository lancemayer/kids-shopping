import { LoaderFunction, useLoaderData } from "remix";
import Thumbnail from "~/components/Thumbnail";
import { getItemListItems } from "~/models/item.server";

export const loader: LoaderFunction = async () => {
  return await getItemListItems();
}

export default function Index() {
  let items: any[] = useLoaderData();

  return (
    <main >
      {items.map(item => (
        <Thumbnail key={item.id} title={item.title} image={item.image} price={item.price} />
      ))}
    </main>
  );
}
