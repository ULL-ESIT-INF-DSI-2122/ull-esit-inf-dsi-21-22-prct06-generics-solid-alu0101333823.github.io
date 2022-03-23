import {Fighter} from './figther';
import {Pokemon} from './pokemon';
import {SuperSayajin} from './superSayajin';

/**
 * Clase combate. Este objeto simula un combate entre dos Contendientes pasados
 * como argumentos.
 */
export class Combat {
  constructor(private myFighter: Fighter, private enemyFighter: Fighter) {};

  /**
   * 
   * @param pesoAtacante peso del luchador atacante
   * @param pesoDefensor peso del luchador defensor
   * @param ataque ataque del atacante
   * @param defensa defensa del defensor
   * @returns daño inflingido
   */
  private attack(pesoAtacante: number, pesoDefensor: number, ataque: number, defensa: number): number {
    let damageMultiplier: number = 1; // Por defecto a 1
    // Muy eficaz
    if (pesoAtacante > pesoDefensor + 50) damageMultiplier = 2;
    // Poco eficaz
    if (pesoAtacante < pesoDefensor + 50) damageMultiplier = 0.5;
    // En cualquier otro caso, el multiplicador de daño será uno
    return Math.floor(50 * (ataque / defensa) * damageMultiplier);
  }
  
  /**
   * Inicia el combate entre los dos Pokémon
   */
  public start() {
    // // My stats
    let myHP: number = this.myFighter.getStats().hp;
    const myWeight: number = this.myFighter.getWeight();
    const myAttack: number = this.myFighter.getStats().attack;
    const myDefense: number = this.myFighter.getStats().defense;

    // // Enemy stats
    let enemyHP: number = this.enemyFighter.getStats().hp;
    const enemyWeight: number = this.enemyFighter.getWeight();
    const enemyAttack: number = this.enemyFighter.getStats().attack;
    const enemyDefense: number = this.enemyFighter.getStats().defense;

    while (myHP >= 0 && enemyHP >= 0) {
      // Ataca myFighter
      // Comprobamos si es un Pokémon, pues siempre dicen su nombre antes de atacar
      if (this.myFighter instanceof Pokemon) this.myFighter.secretAbility();
      
      enemyHP -= this.attack(myWeight, enemyWeight, myAttack, enemyDefense);
      if (enemyHP < 0) enemyHP = 0;

      console.log(`${this.myFighter.getName()} ha atacado a ${this.enemyFighter.getName()}!`);
      console.log(`${this.enemyFighter.getName()} tiene ${enemyHP} puntos de vida restantes!`);
      
      // En caso de tener la vida menor o igual a cero, los SuperSayajin activan su habilidad secreta
      if (this.enemyFighter instanceof SuperSayajin) {
        if (!this.enemyFighter.getGodMode() && enemyHP === 0) {
          enemyHP = 1;
          this.enemyFighter.secretAbility();
          myHP = 0;
        }
      }

      // Compruebo si lo he derrotado
      if (enemyHP <= 0) break;
      if (myHP <= 0) break;

      // Ataca enemyFighter
      // Comprobamos si es un Pokémon, pues siempre dicen su nombre antes de atacar
      if (this.enemyFighter instanceof Pokemon) this.enemyFighter.secretAbility();
        
      myHP -= this.attack(enemyWeight, myWeight, enemyAttack, myDefense);
      if (myHP < 0) myHP = 0;
      
      console.log(`${this.enemyFighter.getName()} ha atacado a ${this.myFighter.getName()}!`);
      console.log(`${this.myFighter.getName()} tiene ${enemyHP} puntos de vida restantes!`);
      // En caso de tener la vida menor o igual a cero, los SuperSayajin activan su habilidad secreta
      if (this.myFighter instanceof SuperSayajin) {
        if (!this.myFighter.getGodMode() && myHP === 0) {
          myHP = 1; 
          this.myFighter.secretAbility();
          enemyHP = 0;
        }
      }
    }   
    console.log('');
    console.log(`El combate ha finalizado: `);
    if (enemyHP <= 0) {
      console.log(`¡${this.myFighter.getName()} es el ganador!`);
    } else {
      console.log(`¡${this.enemyFighter.getName()} es el ganador!`);
    } 
    console.log('');
  }
};
