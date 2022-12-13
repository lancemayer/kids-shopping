import type { ActionFunction } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { uploadFileToObjectStorage } from "~/linodeUtils";
import { createItem } from "~/models/item.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      console.log("name", name);
      if (name !== "imageFile") {
        return undefined;
      }
      const uploadedImage = await uploadFileToObjectStorage(
        data,
        filename,
        contentType
      );

      return uploadedImage;
    },

    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  let title = formData.get("title");
  let imageFile = formData.get("imageFile");
  let price = formData.get("price");

  let createdItem = await createItem({
    title: title as string,
    image: imageFile as string,
    price: price as string,
  });

  return json({ uploadedItem: createdItem });
};

export default function AddItemPage() {
  let transition = useTransition();
  let isAdding = transition.state === "submitting";

  let formRef = useRef<HTMLFormElement>(null);
  let titleFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      titleFieldRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <div>
      <Form ref={formRef} replace method="post" encType="multipart/form-data">
        <label>
          Title:
          <input
            ref={titleFieldRef}
            className="border-4"
            type="text"
            name="title"
          />
        </label>
        <label>
          Image File:
          <input className="border-4" type="file" name="imageFile" />
        </label>
        <label>
          Price:
          <input className="border-4" type="text" name="price" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
