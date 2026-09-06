import { Datum } from './Datum';


export type CRSType = 'geographic' | 'projected';


export class CRS {
  public constructor (
    public readonly code: string,
    public readonly name: string,
    public readonly type: CRSType,
    public readonly datum: Datum
  ) {}

  public clone () : CRS {
    return new CRS( this.code, this.name, this.type, this.datum.clone() );
  }

  public equals ( other: CRS ) : boolean {
    return this.code === other.code;
  }

  public isGeographic () : boolean {
    return this.type === 'geographic';
  }

  public isProjected () : boolean {
    return this.type === 'projected';
  }
}
