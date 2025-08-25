export class UpdateAppointmentDto {
  private constructor(
    public readonly insuredId?: string,
    public readonly scheduleId?: number,
    public readonly countryISO?: "PE" | "CL"
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string | undefined, UpdateAppointmentDto | undefined] {
    const { insuredId, scheduleId, countryISO } = props;

    if (insuredId !== undefined) {
      if (typeof insuredId !== "string") {
        return ["insuredId must be a string", undefined];
      }
      if (!/^\d{5}$/.test(insuredId)) {
        return ["insuredId must be a 5 digit string", undefined];
      }
    }

    if (scheduleId !== undefined) {
      if (typeof scheduleId !== "number") {
        return ["scheduleId must be a number", undefined];
      }
    }

    if (countryISO !== undefined) {
      if (countryISO !== "PE" && countryISO !== "CL") {
        return ["countryISO must be either 'PE' or 'CL'", undefined];
      }
    }

    if (
      insuredId === undefined &&
      scheduleId === undefined &&
      countryISO === undefined
    ) {
      return ["At least one field must be provided for update", undefined];
    }

    return [
      undefined,
      new UpdateAppointmentDto(insuredId, scheduleId, countryISO),
    ];
  }
}
