export type NormalizeMode = 'none' | 'clamp' | 'wrap';


export class Utils {
  public static clamp ( value: number, min: number, max: number ) : number {
    return Math.min( Math.max( value, min ), max );
  }

  public static wrap ( value: number, min: number, max: number ) : number {
    const range = max - min;
    return ( ( value - min ) % range + range ) % range + min;
  }

  public static normalize ( value: number, min: number, max: number, mode: NormalizeMode = 'none' ) : number {
    return mode === 'clamp' ? this.clamp( value, min, max ) : mode === 'wrap' ? this.wrap( value, min, max ) : value;
  }
}
