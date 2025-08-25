import { prismaCL } from "../../data/mysql";
import { AppointmentCLDatasource, CreateAppointmentCLDto } from "../../domain";

export class AppointmentCLDatasourceImpl implements AppointmentCLDatasource {
  async create(createAppointmentCLDto: CreateAppointmentCLDto): Promise<void> {
    await prismaCL.appointmentCL.create({
      data: createAppointmentCLDto!,
    });
  }
}
