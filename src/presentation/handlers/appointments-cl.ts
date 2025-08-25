import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateAppointmentCL, CreateAppointmentCLDto } from "../../domain";
import {
  AppointmentCLDatasourceImpl,
  AppointmentCLRepositoryImpl,
} from "../../infrastructure";

const datasource = new AppointmentCLDatasourceImpl();
const appointmentCLRepository = new AppointmentCLRepositoryImpl(datasource);

export const createAppointmentCL = async (
  event: APIGatewayProxyEvent
): Promise<void> => {
  const body = event.body ? JSON.parse(event.body) : {};

  const [error, createAppointmentCLDto] = CreateAppointmentCLDto.create(body);
  if (error) {
    console.log({ error });
  }

  await new CreateAppointmentCL(appointmentCLRepository).execute(
    createAppointmentCLDto!
  );

  console.log("Success");
};
