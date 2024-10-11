import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {Image} from "../../../lib/model/image"

export const POST = async (request) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    const newImage = new Image({
      name: file.name,
      data: buffer,
      contentType: file.type,
    });
    await newImage.save();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ response: "Failed Uploaded", success: false });
  }
};
