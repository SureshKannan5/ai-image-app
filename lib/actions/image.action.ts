"use server";

import { AddImageParams, UpdateImageParams } from "@/types";
import { handleError } from "../utils";
import connectDB from "../database/connectDB";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

export const addImage = async ({ image, path, userId }: AddImageParams) => {
  try {
    await connectDB();

    revalidatePath(path);

    const user = await User.findById(userId);

    if (!user) throw new Error("user not found");

    const newImage = await Image.create({ ...image, author: user._id });

    console.log("after image update", newImage);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
};

export const updateImage = async ({
  image,
  path,
  userId,
}: UpdateImageParams) => {
  try {
    await connectDB();

    revalidatePath(path);

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId)
      throw new Error("You are not authorized to perform this operation");

    const updatedImage = Image.findByIdAndUpdate(image._id, image, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    await connectDB();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/images");
  }
};

export const getImageById = async (imageId: string) => {
  try {
    await connectDB();

    const image = await Image.findById(imageId).populate(
      "author",
      "_id firstName lastName"
    );

    if (!image) throw new Error("image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
};
