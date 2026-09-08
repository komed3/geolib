export function clamp ( value: number, min: number, max: number ) : number {
  return Math.min( Math.max( value, min ), max );
}

export function wrap ( value: number, min: number, max: number ) : number {
  const range = max - min;
  if ( range <= 0 || ! Number.isFinite( range ) ) return value;
  return ( ( value - min ) % range + range ) % range + min;
}
