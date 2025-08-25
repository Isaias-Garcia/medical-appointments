import { CreateAppointmentPEDto } from "../index";

export abstract class AppointmentPEDatasource {
  abstract create(
    createAppointmentPEDto: CreateAppointmentPEDto
  ): Promise<void>;
}
