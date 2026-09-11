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

  public toSI ( value: number ) : number {
    return value / this.factor;
  }

  public transform ( value: number, { name, quantity, factor }: Unit ) : number {
    if ( this.quantity !== quantity ) throw new Error( `Cannot transform ${ this.name } to ${ name }` );
    return value / factor * this.factor;
  }

  public equals ( { name, unit, quantity, factor }: Unit ) : boolean {
    return this.name === name && this.unit === unit && this.quantity === quantity &&
      this.factor === factor;
  }

  public clone () : Unit {
    return new Unit( this.toJSON() );
  }

  public toJSON () : UnitOptions {
    return { name: this.name, unit: this.unit, quantity: this.quantity, factor: this.factor };
  }
}
