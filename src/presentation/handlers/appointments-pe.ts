import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateAppointmentPE, CreateAppointmentPEDto } from "../../domain";
import {
  AppointmentPEDatasourceImpl,
  AppointmentPERepositoryImpl,
} from "../../infrastructure";

const datasource = new AppointmentPEDatasourceImpl();
const appointmentPERepository = new AppointmentPERepositoryImpl(datasource);

export const createAppointmentPE = async (
  event: APIGatewayProxyEvent
): Promise<void> => {
  const body = event.body ? JSON.parse(event.body) : {};

  const [error, createAppointmentPEDto] = CreateAppointmentPEDto.create(body);
  if (error) {
    console.log({ error });
  }

  await new CreateAppointmentPE(appointmentPERepository).execute(
    createAppointmentPEDto!
  );

  console.log("Success");
};
