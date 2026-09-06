import { deg2Rad } from '../utils/math';


interface StringOptions {
  precision?: number;
  lang?: string;
  showUnit?: boolean;
}


export abstract class Value {
  public constructor ( public readonly value: number ) {}

  public toRadians () : number {
    return deg2Rad( this.value );
  }

  public toString ( { precision, lang, showUnit }: StringOptions = {} ) : string {
    return this.value.toLocaleString( lang, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    } ) + ( showUnit ? '°' : '' );
  }
}
