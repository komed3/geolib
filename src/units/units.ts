import type { Unit } from './unit';


export const UNITS = Object.freeze( {
  degree: Object.freeze( {
    name: 'degree',
    symbol: '°'
  } ),

  radian: Object.freeze( {
    name: 'radian',
    symbol: 'rad'
  } ),

  metre: Object.freeze( {
    name: 'metre',
    symbol: 'm'
  } ),

  kilometre: Object.freeze( {
    name: 'kilometre',
    symbol: 'km'
  } )
} satisfies Record< string, Unit > );
