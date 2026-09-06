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

  public equals ( { code, name, ellipsoid }: Datum ) : boolean {
    return this.code === code && this.name === name && this.ellipsoid.equals( ellipsoid );
  }
}
