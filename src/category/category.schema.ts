import type { Document } from 'mongoose';
import { Schema } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	categoryImage: string;
}

export const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true, unique: true },
		categoryImage: { type: String, required: true },
	},
	{ timestamps: true }
);
