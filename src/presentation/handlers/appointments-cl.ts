import { SQSEvent } from "aws-lambda";
import { CreateAppointmentCL, CreateAppointmentCLDto } from "../../domain";
import {
  AppointmentCLDatasourceImpl,
  AppointmentCLRepositoryImpl,
  EventBridgeService,
} from "../../infrastructure";
import { AppointmentSNSMessage } from "../../shared/types";

const datasource = new AppointmentCLDatasourceImpl();
const appointmentCLRepository = new AppointmentCLRepositoryImpl(datasource);
const eventBridgeService = new EventBridgeService();

export const createAppointmentCL = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const snsMessage: AppointmentSNSMessage = JSON.parse(record.body);
    const body = JSON.parse(snsMessage.Message);

    const [error, createAppointmentCLDto] = CreateAppointmentCLDto.create(
      body.data
    );
    if (error) {
      console.log({ error });
    }

    await new CreateAppointmentCL(appointmentCLRepository).execute(
      createAppointmentCLDto!
    );

    await eventBridgeService.publishAppointmentCreated(body.data);

    console.log("Success");
  }
};
