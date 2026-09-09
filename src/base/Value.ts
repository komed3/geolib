import type { Axis, TAxisOptions } from './Axis';


export interface TValueStringOptions {
  locale?: string;
  precision?: number;
  showUnit?: boolean;
}


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, axis: Axis ) {
    this.axis = axis, this.value = axis.initialize( value );
  }

  public toNumber () : number {
    return this.value;
  }

  public equals ( { value, axis }: Value ) : boolean {
    return this.value === value && this.axis.equals( axis );
  }

  public clone () : Value {
    return new Value( this.value, this.axis.clone() );
  }

  public toJSON () : { value: number, axis: TAxisOptions } {
    return { value: this.value, axis: this.axis.toJSON() };
  }

  public toString ( { locale = 'en', precision, showUnit = true }: TValueStringOptions = {} ) : string {
    const value = this.value.toLocaleString( locale, {
      minimumFractionDigits: precision ?? 0,
      maximumFractionDigits: precision ?? 22
    } );

    return `${ value }${ showUnit ? this.axis.unit.symbol : '' }`;
  }
}
