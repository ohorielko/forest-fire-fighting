// TelemetryData.ts
export class TelemetryData {
  public lat: number;
  public lon: number;
  public alt: number;
  public roll: number;
  public pitch: number;
  public yaw: number;
  public battery: number;
  public timestamp: Date;

  constructor(data: {
    lat: number;
    lon: number;
    alt: number;
    roll: number;
    pitch: number;
    yaw: number;
    battery: number;
  }) {
    this.lat = data.lat;
    this.lon = data.lon;
    this.alt = data.alt;
    this.roll = data.roll;
    this.pitch = data.pitch;
    this.yaw = data.yaw;
    this.battery = data.battery;
    this.timestamp = new Date();
  }

  // Helper method to convert to JSON
  toJSON() {
    return {
      lat: this.lat,
      lon: this.lon,
      alt: this.alt,
      roll: this.roll,
      pitch: this.pitch,
      yaw: this.yaw,
      battery: this.battery,
      timestamp: this.timestamp.toISOString()
    };
  }

  // Helper method to check if data is valid
  isValid(): boolean {
    return (
      this.lat >= -90 && this.lat <= 90 &&
      this.lon >= -180 && this.lon <= 180 &&
      this.alt >= 0 &&
      this.battery >= 0 && this.battery <= 100
    );
  }
}