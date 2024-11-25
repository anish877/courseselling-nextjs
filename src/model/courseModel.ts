import mongoose, { Schema, Document } from "mongoose";

export interface Video extends Document {
  _id: string;
  url: string;
  createdAt: Date;
}
const VideoSchema: Schema<Video> = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export interface Course extends Document {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  videos: Video[];
}

const CourseSchema: Schema<Course> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    videos:[VideoSchema],
  },
  { timestamps: true }
);

const CourseModel =
  (mongoose.models.Course as mongoose.Model<Course>) ||
  mongoose.model<Course>("Course", CourseSchema);

export default CourseModel;
