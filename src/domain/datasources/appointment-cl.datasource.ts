import { CreateAppointmentCLDto } from "../index";

export abstract class AppointmentCLDatasource {
  abstract create(
    createAppointmentCLDto: CreateAppointmentCLDto
  ): Promise<void>;
}
