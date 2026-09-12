import type { Axis, AxisOptions } from '../axis';
import type { UnitStringOptions } from '../unit';


export interface ValueOptions {
  axis: Axis;
}

export interface ValueStringOptions extends UnitStringOptions {
  maxPrecision?: number;
  minPrecision?: number;
  locale?: string;
  displayUnit?: boolean;
  unitDelimiter?: string;
}


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, { axis }: ValueOptions ) {
    this.axis = axis, this.value = axis.normalize( value );
  }

  public equals ( { value, axis }: Value ) : boolean {
    return this.value === value && this.axis.equals( axis );
  }

  public clone () : Value {
    return new Value( this.value, { axis: this.axis.clone() } );
  }

  public toJSON () : { value: number, axis: AxisOptions } {
    return { value: this.value, axis: this.axis.toJSON() };
  }

  public toString ( {
    maxPrecision = 22, minPrecision = 0, locale = 'en', displayUnit = true,
    unitDelimiter = '', ...options
  }: ValueStringOptions = {} ) : string {
    const value = this.value.toLocaleString( locale, {
      minimumFractionDigits: minPrecision,
      maximumFractionDigits: maxPrecision
    } );

    return `${ value }${ displayUnit ? unitDelimiter + this.axis.unit.toString( options ) : '' }`;
  }
}
