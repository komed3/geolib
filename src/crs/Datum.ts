import { Ellipsoid } from './Ellipsoid';


export class Datum {
  public constructor (
    public readonly code: string,
    public readonly name: string,
    public readonly ellipsoid: Ellipsoid
  ) {}

  public clone () : Datum {
    return new Datum( this.code, this.name, this.ellipsoid.clone() );
  }

  public equals ( other: Datum ) : boolean {
    return this.code === other.code && this.name === other.name &&
      this.ellipsoid.equals( other.ellipsoid );
  }
}
