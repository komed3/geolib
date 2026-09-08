export class Utils {
  public static clamp ( value: number, min: number, max: number ) : number {
    return Math.min( Math.max( value, min ), max );
  }

  public static normalize ( value: number, min: number, max: number ) : number {
    return this.wrap( value, min, max );
  }

  public static wrap ( value: number, min: number, max: number ) : number {
    const range = max - min;
    return ( ( value - min ) % range + range ) % range + min;
  }

  public static approximatelyEqual ( a: number, b: number, tolerance = Number.EPSILON ) : boolean {
    return Math.abs( a - b ) <= tolerance;
  }

  public static min ( ...values: number[] ) : number {
    return Math.min( ...values );
  }

  public static max ( ...values: number[] ) : number {
    return Math.max( ...values );
  }

  public static sum ( ...values: number[] ) : number {
    return values.reduce( ( sum, value ) => sum + value, 0 );
  }

  public static average ( ...values: number[] ) : number {
    return this.sum( ...values ) / values.length;
  }
}
