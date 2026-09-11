export interface UnitOptions {
  name: string;
  unit: string;
}


export class Unit {
  public readonly name: string;
  public readonly unit: string;

  public constructor ( { name, unit }: UnitOptions ) {
    this.name = name, this.unit = unit;
  }
}
