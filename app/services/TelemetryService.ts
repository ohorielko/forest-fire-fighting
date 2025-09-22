export class TelemetryData {
  constructor(
    public lat: number,
    public lon: number,
    public alt: number,
    public roll: number,
    public pitch: number,
    public yaw: number,
    public battery: number
  ) {}
}

export class TelemetryService {
  static async fetchTelemetry(): Promise<TelemetryData> {
    const res = await fetch("http://127.0.0.1:8000/api/telemetry");
    const data = await res.json();
    return new TelemetryData(
      data.lat, data.lon, data.alt,
      data.roll, data.pitch, data.yaw,
      data.battery
    );
  }
}
