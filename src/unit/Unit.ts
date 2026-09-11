export type Quantity = 'angle' | 'scale' | 'length' | 'time';

export interface UnitOptions {
  name: string;
  unit: string;
  quantity: Quantity;
  factor?: number;
}


export class Unit {
  public readonly name: string;
  public readonly unit: string;
  public readonly quantity: Quantity;
  public readonly factor: number;

  public constructor ( { name, unit, quantity, factor = 1 }: UnitOptions ) {
    this.name = name, this.unit = unit, this.quantity = quantity, this.factor = factor;
  }

  public transform ( value: number, { quantity, factor }: Unit ) : number {
    if ( this.quantity !== quantity )
      throw new Error( `Cannot transform ${ this.quantity } to ${ quantity }` );

    return value * factor / this.factor;
  }
}
