import type { Item } from "@prisma/client";
import { prisma } from "~/db.server";


export type { Item } from "@prisma/client";

export function getItem({
  id,
}: Pick<Item, "id">) {
  return prisma.item.findFirst({
    where: { id },
  });
}

export function getItemListItems() {
  return prisma.item.findMany({
    select: { id: true, title: true, image: true, price: true },
  });
}

export function createItem({
  title,
  image,
  price,
}: Pick<Item, "title" | "image" | "price">) {
  return prisma.item.create({
    data: {
      title,
      image,
      price,
    }
  });
}

export function deleteItem({
  id,
}: Pick<Item, "id">) {
  return prisma.item.deleteMany({
    where: { id },
  });
}
