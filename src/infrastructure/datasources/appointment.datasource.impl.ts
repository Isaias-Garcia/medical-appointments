import {
  GetCommand,
  PutCommand,
  PutCommandInput,
  ScanCommand,
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
    const data: PutCommandInput = {
      TableName: process.env.APPOINTMENTS_TABLE!,
      Item: createAppointmentDto.toPlainObject(),
    };
    await dynamoDb.send(new PutCommand(data));

    return AppointmentEntity.fromJson({ ...createAppointmentDto });
  }

  async getAll(): Promise<AppointmentEntity[]> {
    const result = await dynamoDb.send(
      new ScanCommand({ TableName: process.env.APPOINTMENTS_TABLE })
    );

    console.log("Raw scan result:", JSON.stringify(result, null, 2));
    console.log("First item structure:", result.Items?.[0]);
    console.log("Type of first item id:", typeof result.Items?.[0]?.id);
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
    // await this.findById(updateTodoDTo.id);
    // const updatedTodo = await prisma.todo.update({
    //   where: { id: updateTodoDTo.id },
    //   data: updateTodoDTo!.values,
    // });

    // return AppointmentEntity.fromJson(updatedTodo);
    throw Error("No implement");
  }
}
