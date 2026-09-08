export function approximatelyEqual( a: number, b: number, tolerance = Number.EPSILON ) : boolean {
  return Math.abs( a - b ) <= tolerance;
}

export function min ( values: readonly number[] ) : number {
  return Math.min( ...values );
}

export function max ( values: readonly number[] ) : number {
  return Math.max( ...values );
}
