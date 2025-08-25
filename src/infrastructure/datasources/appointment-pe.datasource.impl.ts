import { prismaPE } from "../../data/mysql";
import { AppointmentPEDatasource, CreateAppointmentPEDto } from "../../domain";

export class AppointmentPEDatasourceImpl implements AppointmentPEDatasource {
  async create(createAppointmentPEDto: CreateAppointmentPEDto): Promise<void> {
    await prismaPE.appointmentPE.create({
      data: createAppointmentPEDto!,
    });
  }
}
