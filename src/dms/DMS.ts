import { type TDirection } from './Angle';


export class DMS {
  public constructor (
    public readonly degrees: number,
    public readonly minutes: number,
    public readonly seconds: number,
    public readonly direction: TDirection | null = null
  ) {}
}
