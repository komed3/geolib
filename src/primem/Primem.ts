import type { AxisOptions } from '../axis';
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

  public equals ( { name, value }: Primem ) : boolean {
    return this.name === name && this.value.equals( value );
  }

  public clone () : Primem {
    return new Primem( { name: this.name, value: this.value.clone() } );
  }

  public toJSON () : { name: string, value: { value: number, axis: AxisOptions } } {
    return { name: this.name, value: this.value.toJSON() };
  }
}
