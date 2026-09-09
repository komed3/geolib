import { type TDirection } from './Angle';


export class DMS {
  public constructor (
    public readonly degrees: number,
    public readonly minutes: number,
    public readonly seconds: number,
    public readonly direction: TDirection | null = null
  ) {}

  public toDecimal () : number {
    return ( this.degrees < 0 ? -1 : 1 ) * (
      Math.abs( this.degrees ) + this.minutes / 60 + this.seconds / 3600
    );
  }

  public equals ( { degrees, minutes, seconds, direction }: DMS ) : boolean {
    return this.degrees === degrees && this.minutes === minutes &&
      this.seconds === seconds && this.direction === direction;
  }

  public clone () : DMS {
    return new DMS( this.degrees, this.minutes, this.seconds, this.direction );
  }

  public toJSON () : { degrees: number, minutes: number, seconds: number, direction: TDirection | null } {
    return { degrees: this.degrees, minutes: this.minutes, seconds: this.seconds, direction: this.direction };
  }
}
