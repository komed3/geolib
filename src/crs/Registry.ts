interface RegistryEntry {
  readonly code: string;
}


export abstract class Registry< T extends RegistryEntry > {
  protected readonly entries = new Map< string, T >();
}
