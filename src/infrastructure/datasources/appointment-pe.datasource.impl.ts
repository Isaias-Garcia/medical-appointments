import { prismaPE } from "../../data/mysql";
import { AppointmentPEDatasource, CreateAppointmentPEDto } from "../../domain";

export class AppointmentPEDatasourceImpl implements AppointmentPEDatasource {
  async create(createAppointmentPEDto: CreateAppointmentPEDto): Promise<void> {
    if (process.env.SIMULATE_RDS) {
      console.log("Data that would be stored in RDS MySQL:");
      console.log(JSON.stringify(createAppointmentPEDto, null, 2));
      return;
    }

    await prismaPE.appointmentPE.create({
      data: createAppointmentPEDto!,
    });
  }
}
