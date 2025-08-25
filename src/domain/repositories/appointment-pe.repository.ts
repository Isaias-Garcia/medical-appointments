import { CreateAppointmentPEDto } from "../index";

export abstract class AppointmentPERepository {
  abstract create(
    createAppointmentPEDto: CreateAppointmentPEDto
  ): Promise<void>;
}
