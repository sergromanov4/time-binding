import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DateListDocument = HydratedDocument<DateList>;

@Schema()
export class Time {
  @Prop()
  userId: string;

  @Prop()
  status: string;
}

export const TimetSchema = SchemaFactory.createForClass(Time);

@Schema()
export class DateList {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true, type: Map, of: TimetSchema })
  time: Map<string, Time>;
}

export const DateListSchema = SchemaFactory.createForClass(DateList);
