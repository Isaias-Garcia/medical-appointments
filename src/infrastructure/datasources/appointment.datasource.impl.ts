import {
  GetCommand,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "../../data/dynamoDB";
import {
  CreateAppointmentDto,
  //   CustomError,
  AppointmentDatasource,
  AppointmentEntity,
  UpdateAppointmentDto,
} from "../../domain";

export class AppointmentDatasourceImpl implements AppointmentDatasource {
  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<AppointmentEntity> {
    const appointmentDto = createAppointmentDto.toPlainObject();
    const data: PutCommandInput = {
      TableName: process.env.APPOINTMENTS_TABLE!,
      Item: appointmentDto,
    };
    await dynamoDb.send(new PutCommand(data));

    const appointment = await this.findById(appointmentDto.id);

    return AppointmentEntity.fromJson(appointment);
  }

  async getAll(): Promise<AppointmentEntity[]> {
    const result = await dynamoDb.send(
      new ScanCommand({ TableName: process.env.APPOINTMENTS_TABLE })
    );

    const appointments = result.Items ?? [];

    return appointments.map(AppointmentEntity.fromJson);
  }

  async findById(id: string): Promise<AppointmentEntity> {
    const result = await dynamoDb.send(
      new GetCommand({
        TableName: process.env.APPOINTMENTS_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) throw new Error(`Appointment with id ${id} not found`);

    return AppointmentEntity.fromJson(result.Item);
  }

  async updateById(
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<AppointmentEntity> {
    const data: UpdateCommandInput = {
      TableName: process.env.APPOINTMENTS_TABLE!,
      Key: {
        id: updateAppointmentDto.id,
      },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": updateAppointmentDto.status,
      },
    };

    await dynamoDb.send(new UpdateCommand(data));

    return AppointmentEntity.fromJson(updateAppointmentDto);
  }
}
