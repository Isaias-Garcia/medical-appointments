export class CreateAppointmentDto {
  private constructor(
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: "PE" | "CL"
  ) {}

  toPlainObject() {
    return {
      id: Date.now().toString(),
      insuredId: this.insuredId,
      scheduleId: this.scheduleId,
      countryISO: this.countryISO,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
  }

  static create(props: {
    [key: string]: any;
  }): [string | undefined, CreateAppointmentDto | undefined] {
    const { insuredId, scheduleId, countryISO } = props;

    if (!insuredId || typeof insuredId !== "string") {
      return ["insuredId is required and must be a string", undefined];
    }

    if (!/^\d{5}$/.test(insuredId)) {
      return ["insuredId must be a 5 digit", undefined];
    }

    if (!scheduleId || typeof scheduleId !== "number") {
      return ["scheduleId is required and must be a number", undefined];
    }

    if (!countryISO || (countryISO !== "PE" && countryISO !== "CL")) {
      return [
        "countryISO is required and must be either 'PE' or 'CL'",
        undefined,
      ];
    }

    return [
      undefined,
      new CreateAppointmentDto(insuredId, scheduleId, countryISO),
    ];
  }
}
