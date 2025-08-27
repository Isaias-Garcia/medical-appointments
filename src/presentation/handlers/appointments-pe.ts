import { SQSEvent } from "aws-lambda";
import { CreateAppointmentPE, CreateAppointmentPEDto } from "../../domain";
import {
  AppointmentPEDatasourceImpl,
  AppointmentPERepositoryImpl,
  EventBridgeService,
} from "../../infrastructure";
import { AppointmentSNSMessage } from "../../shared/types";

const datasource = new AppointmentPEDatasourceImpl();
const appointmentPERepository = new AppointmentPERepositoryImpl(datasource);
const eventBridgeService = new EventBridgeService();

export const createAppointmentPE = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const snsMessage: AppointmentSNSMessage = JSON.parse(record.body);
    const body = JSON.parse(snsMessage.Message);

    const [error, createAppointmentPEDto] = CreateAppointmentPEDto.create(
      body.data
    );
    if (error) {
      console.log({ error });
    }

    await new CreateAppointmentPE(appointmentPERepository).execute(
      createAppointmentPEDto!
    );

    await eventBridgeService.publishAppointmentCreated(body.data);

    console.log("Success");
  }
};
