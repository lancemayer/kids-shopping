import { useEffect, useRef } from "react";
import { ActionFunction, Form, json, unstable_createFileUploadHandler, unstable_parseMultipartFormData, useTransition } from "remix";
import { createItem } from "~/models/item.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_createFileUploadHandler({
    directory: "public/images",
    file: ({ filename }) => filename,
  });

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  let title = formData.get("title");
  let imageFile = formData.get("imageFile");
  let price = formData.get("price");

  let createdItem = await createItem(
    {
      title: title as string,
      image: "./images/" + (imageFile as File).name,
      price: price as string
    });

  return json({ uploadedItem: createdItem });
}

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
          <input ref={titleFieldRef} className="border-4" type="text" name="title" />
        </label>
        <label>
          Image File:
          <input
            className="border-4"
            type="file"
            name="imageFile"
          />
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