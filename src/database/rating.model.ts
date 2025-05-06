import { Document, Schema } from 'mongoose';

import { RatingStatus } from '../types/enums';

export interface IRating extends Document {
  _id: string;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: RatingStatus;
  created_at: Date;
}