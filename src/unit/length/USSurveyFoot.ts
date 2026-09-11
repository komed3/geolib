import { Unit } from '../Unit';


export class USSurveyFoot extends Unit {
  public constructor () {
    super( { name: 'US survey foot', unit: 'ft', quantity: 'length', factor: 1200 / 3937 } );
  }
}
