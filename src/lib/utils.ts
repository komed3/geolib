export const clamp = ( value: number, min: number, max: number ) : number => {
  return Math.min( Math.max( value, min ), max );
}

export const wrap = ( value: number, min: number, max: number ) : number => {
  const range = max - min;
  return range === 0 ? min : ( ( value - min ) % range + range ) % range + min;
}
