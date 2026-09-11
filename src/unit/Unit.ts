export type Quantity = 'angle' | 'scale' | 'length' | 'time';

export interface UnitOptions {
  name: string;
  unit: string;
  quantity: Quantity;
}


export class Unit {
  public readonly name: string;
  public readonly unit: string;
  public readonly quantity: Quantity;

  public constructor ( { name, unit, quantity }: UnitOptions ) {
    this.name = name, this.unit = unit, this.quantity = quantity;
  }
}
