import { CreateAppointmentCLDto } from "../index";

export abstract class AppointmentCLRepository {
  abstract create(
    createAppointmentCLDto: CreateAppointmentCLDto
  ): Promise<void>;
}
