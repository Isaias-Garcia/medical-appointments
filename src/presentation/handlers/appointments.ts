import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  SQSEvent,
} from "aws-lambda";
import {
  CreateAppointmentDto,
  CreateAppointment,
  GetAppointment,
  GetAppointments,
  UpdateAppointmentDto,
  UpdateAppointment,
} from "../../domain";
import {
  AppointmentDatasourceImpl,
  AppointmentRepositoryImpl,
  NotificationService,
} from "../../infrastructure";
import { EventBridgeMessage } from "../../shared/types/appointment.types";

const datasource = new AppointmentDatasourceImpl();
const appointmentRepository = new AppointmentRepositoryImpl(datasource);
const notificationService = new NotificationService();

export const createAppointment = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body ? JSON.parse(event.body) : {};

  const [error, createAppointmentDto] = CreateAppointmentDto.create(body);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Error creating appointment",
        details: error,
      }),
    };
  }

  const appointment = await new CreateAppointment(
    appointmentRepository,
    notificationService
  ).execute(createAppointmentDto!);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Appointment successfully created",
      appointment,
    }),
  };
};

export const updateAppointment = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body: EventBridgeMessage = JSON.parse(record.body);

    const [error, updateAppointmentDto] = UpdateAppointmentDto.create(
      body.detail.data
    );
    if (error) {
      console.log({ error });
    }

    const appointment = await new UpdateAppointment(
      appointmentRepository
    ).execute(updateAppointmentDto!);

    console.log({ appointment });
  }
};

export const getAppointmentById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters || {};
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "ID not provided",
        details: "",
      }),
    };
  }

  const appointment = await new GetAppointment(appointmentRepository).execute(
    id
  );

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Appointment found",
      appointment,
    }),
  };
};

export const getAppointments = async (): Promise<APIGatewayProxyResult> => {
  const appointmets = await new GetAppointments(
    appointmentRepository
  ).execute();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Appointments list",
      appointmets,
    }),
  };
};
