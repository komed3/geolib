import { Datum } from './Datum';


export type CRSType = 'geographic' | 'projected';


export class CRS {
  public constructor (
    public readonly code: string,
    public readonly name: string,
    public readonly type: CRSType,
    public readonly datum: Datum
  ) {}
}
