// src/infrastructure/services/notification.service.ts
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../aws/snsClient";
import { AppointmentEntity } from "../../domain";

export class NotificationService {
  constructor(private readonly client = snsClient) {}

  async publishAppointmentCreated(
    appointment: AppointmentEntity
  ): Promise<void> {
    const command = new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: "New appointment registered",
      Message: JSON.stringify({
        action: "APPOINTMENT_CREATED",
        data: { ...appointment },
      }),
      MessageAttributes: {
        countryISO: {
          DataType: "String",
          StringValue: appointment.countryISO,
        },
      },
    });

    await this.client.send(command);
  }
}
