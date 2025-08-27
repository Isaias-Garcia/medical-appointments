import { prismaCL } from "../../data/mysql";
import { AppointmentCLDatasource, CreateAppointmentCLDto } from "../../domain";

export class AppointmentCLDatasourceImpl implements AppointmentCLDatasource {
  async create(createAppointmentCLDto: CreateAppointmentCLDto): Promise<void> {
    if (process.env.SIMULATE_RDS) {
      console.log("Data that would be stored in RDS MySQL:");
      console.log(JSON.stringify(createAppointmentCLDto, null, 2));
      return;
    }

    await prismaCL.appointmentCL.create({
      data: createAppointmentCLDto!,
    });
  }
}
