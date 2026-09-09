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
}
