import { AppointmentEntity } from "../../domain";

export interface AppointmentSNSMessage {
  TopicArn: string;
  Subject: string;
  Message: string;
  MessageAttributes: string;
}

export enum CountryISO {
  PE = "PE",
  CL = "CL",
}

export interface EventBridgeMessage {
  source: string;
  detail: AppointmentEventDetail;
}

interface AppointmentEventDetail {
  action: string;
  data: AppointmentEntity;
}
