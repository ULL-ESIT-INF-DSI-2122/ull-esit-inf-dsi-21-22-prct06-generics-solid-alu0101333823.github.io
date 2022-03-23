/**
 * Las estadísticas de los luchadores serán de este tipo personalizado
 * Se podrán acceder a ellas de esta manera:
 * ```ts
 * contendiente.getStats().attack
 * contendiente.getStats().defense
 * contendiente.getStats().speed
 * contendiente.getStats().hp
 * ```
 */
export type powerStats = {
  attack: number,
  defense: number,
  speed: number,
  hp: number
}

/**
 * Clase Fighter, almacena la información de los luchadores. Cada luchador de
 * diferentes universos tendrá una habilidad con respecto a su universo. 
 */
export abstract class Fighter {
  constructor(public name: string, public weight: number,
    public height: number, 
    public stats:powerStats,
  ) {};

  /**
   * Cada contendiente tendrá una habilidad secreta que le hará diferenciar
   * del resto de universos
   */
  abstract secretAbility(): void;

  /**
   * Retorna el nombre del luchador
   * @returns name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Retorna el peso del luchador
   * @returns weight
   */
  public getWeight(): number {
    return this.weight;
  }

  /**
   * Retorna la altura del luchador
   * @returns height
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * Retorna las estadísticas del luchador
   * @returns stats
   */
  public getStats(): powerStats {
    return this.stats;
  }
};
