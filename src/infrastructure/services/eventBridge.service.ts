import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { eventBridgeClient } from "../aws/eventBridgeClient";

import { AppointmentEntity } from "../../domain";

export class EventBridgeService {
  constructor(private readonly client = eventBridgeClient) {}

  async publishAppointmentCreated(
    appointment: AppointmentEntity
  ): Promise<void> {
    const eventParams = {
      Entries: [
        {
          Source: "appointment-service",
          DetailType: "Appointment Created",
          Detail: JSON.stringify({
            action: "UPDATE_APPOIMENT_STATUS",
            data: appointment,
          }),
          EventBusName: process.env.EVENT_BUS_ARN,
        },
      ],
    };

    await this.client.send(new PutEventsCommand(eventParams));
  }
}
