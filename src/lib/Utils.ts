export class Utils {
  public static clamp ( value: number, min: number, max: number ) : number {
    return Math.min( Math.max( value, min ), max );
  }

  public static wrap ( value: number, min: number, max: number ) : number {
    const range = max - min;
    return ( ( value - min ) % range + range ) % range + min;
  }
}
