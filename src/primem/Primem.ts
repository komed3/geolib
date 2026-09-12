import { DegreeValue } from '../value';


export interface PrimemOptions {
  name: string;
  value: DegreeValue;
}


export class Primem {
  public readonly name: string;
  public readonly value: DegreeValue;

  public constructor ( { name, value }: PrimemOptions ) {
    this.name = name, this.value = value;
  }
}
