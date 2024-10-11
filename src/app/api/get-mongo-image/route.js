import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {Image} from "../../../lib/model/image"


export const GET = async () => {

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const images = (await Image.find().select("name data contentType")).reverse();

    return NextResponse.json({ success: true, images });
  } catch {
    NextResponse.json({ success: false, error: "Failed" });
  }
};
