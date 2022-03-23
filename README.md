# Práctica 6: Principios SOLID. Clases e interfaces genéricas.
## Juan Marrero Domínguez alu0101333823

### Introducción
En esta práctica trabajaremos 3 ejercicios para comprender y acostumbrarnos al uso de interfaces y clases genéricas en el lenguaje TypeScript. Estará informada mediante la herramienta ***Coveralls*** y como viene siendo habitual documentada con ***TypeDoc*** y llevaremos a cabo la metodología TDD con ***Mocha*** y ***Chai***. En concreto este es [mi informe generado en Coveralls](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0101333823.github.io). Como costumbre que es, comencemos comentando los pasos previos al desarrollo de la práctica:

### Pasos previos
Son dos:
  * Aceptar la tarea asignada en _GitHub Classroom_ 
  * Leer y aprender sobre _Coveralls_ mediante la documentación y el vídeo del aula virtual

### Ejercicio 1
Este ejercicio ha resultado ser súmamente divertido gracias a la libertad de implementar prácticamente lo que deseemos. Consiste en ampliar nuestros combates `Pokémon` a otros universos de entretenimiento. Además de `Pokémon`, he implementado a los Super Sayajines de `Dragon Ball` y a personajes del famoso juego de lucha `Street Fighter`. Además, implementaremos una clase abstracta `Fighter` que modelará a todos los tipos de contendientes que se implementarán.

#### Clase Fighter
Esta clase abstracta será padre de todos los tipos de contendientes de todos los universos que implementaremos. Es prácticamente la clase `Pokémon` de la anterior práctica, sin embargo hay carácterísticas como los _tipos_ que han sido retiradas, pues contiene las características esenciales de un luchador. Cada contendiente tendrá una habilidad secreta que le hará diferenciar del resto de universos, esto se refleja en el método abstracto `secretAbility`. Tiene los _getters_ estándar de todas sus características y emplea el mismo sistema de estadísticas idéntico al de la práctica anterior. Es un tipo de objeto personalizado programado por mí llamado `powerStats`:

```ts
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
```

El resto del código de la clase es el siguiente: 

```ts 
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
```

Pruebas de esta clase siguiendo la metodología TDD:

```ts
  // Pruebas métodos de Fighter
  it('Pokémon es instancia de Fighter', () => {
    expect(Charizard).to.be.instanceOf(Fighter);
  });

  it('Un luchador tiene el método getName', () => {
    expect(Charizard.getName()).to.be.eq('Charizard');
  });

  it('Un luchador tiene el método getHeight', () => {
    expect(Charizard.getHeight()).to.be.eq(1.7);
  });
  
  it('Un luchador tiene el método getWeight', () => {
    expect(Charizard.getWeight()).to.be.eq(90.5);
  });
  
  it('Un luchador tiene el método getStats', () => {
    expect(Charizard.getStats().hp).to.eq(78);
  });
```

#### Clase Combat
Permite iniciar un combate entre dos contendientes. Contiene dos métodos: `start()` y `attack`. Es la misma clase que en la práctica anterior, pero ahora acepta a contendientes de distintos universos, y durante el combate vigila cuando un contendiente de cada universo puede activar sus habilidades. ***La efectividad de los ataques ha cambiado***, ahora depende de si el atacante tiene más de 50 kilos de peso que su contrincante, su multiplicador de ataque aumenta, y también visceversa. Código:

```ts
  /**
   * Clase combate. Este objeto simula un combate entre dos Contendientes pasados
   * como argumentos.
   */
  export class Combat {
    constructor(private myFighter: Fighter, private enemyFighter: Fighter) {};

    /**
     * Calcula el daño de el ataque de un luchador hacia el otro y lo devuelve
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
     * Inicia el combate entre los dos Pokémon. Dependiendo del universo, se darán circunstancias concretas
     * para activar el ataque especial de cada luchador. 
     */
    public start() {
      // // My stats
      let myHP: number = this.myFighter.getStats().hp;
      const myWeight: number = this.myFighter.getWeight();
      let myAttack: number = this.myFighter.getStats().attack;
      const myDefense: number = this.myFighter.getStats().defense;

      // // Enemy stats
      let enemyHP: number = this.enemyFighter.getStats().hp;
      const enemyWeight: number = this.enemyFighter.getWeight();
      let enemyAttack: number = this.enemyFighter.getStats().attack;
      const enemyDefense: number = this.enemyFighter.getStats().defense;

      while (myHP >= 0 && enemyHP >= 0) {
        // Ataca myFighter
        // Comprobamos si es un Pokémon, pues siempre dicen su nombre antes de atacar
        if (this.myFighter instanceof Pokemon) this.myFighter.secretAbility();
        // Si es un luchador de Capcom activa su habilidad, aumentando en 10 su ataque
        if (this.myFighter instanceof StreetFighterCapcom) {
          this.myFighter.secretAbility();
          myAttack = this.myFighter.getStats().attack;
        }

        enemyHP -= this.attack(myWeight, enemyWeight, myAttack, enemyDefense);
        if (enemyHP < 0) enemyHP = 0;

        console.log(`${this.myFighter.getName()} ha atacado a ${this.enemyFighter.getName()}!`);
        console.log(`${this.enemyFighter.getName()} tiene ${enemyHP} puntos de vida restantes!`);
        
        // En caso de tener la vida menor o igual a cero, los SuperSayajin activan su habilidad secreta
        if (this.enemyFighter instanceof SuperSayajin) {
          if (!this.enemyFighter.getGodMode() && enemyHP === 0) {
            enemyHP = 1;
            this.enemyFighter.secretAbility();
            enemyAttack = this.enemyFighter.getStats().attack;
          }
        }

        // Compruebo si lo he derrotado
        if (enemyHP <= 0) break;
        if (myHP <= 0) break;

        // Ataca enemyFighter
        // Comprobamos si es un Pokémon, pues siempre dicen su nombre antes de atacar
        if (this.enemyFighter instanceof Pokemon) this.enemyFighter.secretAbility();
        // Si es un luchador de Capcom activa su habilidad, aumentando en 10 su ataque
        if (this.enemyFighter instanceof StreetFighterCapcom) {
          this.enemyFighter.secretAbility();
          enemyAttack = this.enemyFighter.getStats().attack;
        }

        myHP -= this.attack(enemyWeight, myWeight, enemyAttack, myDefense);
        if (myHP < 0) myHP = 0;
        
        console.log(`${this.enemyFighter.getName()} ha atacado a ${this.myFighter.getName()}!`);
        console.log(`${this.myFighter.getName()} tiene ${myHP} puntos de vida restantes!`);
        // En caso de tener la vida menor o igual a cero, los SuperSayajin activan su habilidad secreta
        if (this.myFighter instanceof SuperSayajin) {
          if (!this.myFighter.getGodMode() && myHP === 0) {
            myHP = 1; 
            this.myFighter.secretAbility();
            myAttack = this.myFighter.getStats().attack;
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
```

En un fichero auxiliar `fightSimulation.ts` se ha instanciado dos objetos de `Combat` y simular dos luchas. Este es el output: 

  ![](/assets/output1.png)
  > Resultado de las peleas

Pruebas TDD:

```ts
  it('Un combate tiene el método de comenzar un combate', () => {
    expect(fight.start()).to.be.eql(undefined);
    expect(secondFight.start()).to.be.eql(undefined);
    expect(thirdFight.start()).to.be.eql(undefined);
  });
```

#### Universos implementados
Como dije antes, hay tres universos implementados: `Pokémon`, `Dragon Ball` y `Street Fighter`. Cada uno de ellos tiene una habilidad y características diferente. Cada una de estas habilidad se hará en combate y le otorgará un cambio de estadísticas o incluso una victoria asegurada. 

Empezando por `Pokèmon`, su habilidad característica es que cada Pokemon antes de atacar grita su nombre (se puede observar en la anterior simulación de combate). Además, cuenta con un atributo extra, el tipo del Pokémon. 

Este es el código implementado:

```ts
  /**
   * Esta clase Pokémon representa a un Contendiente del universo
   * Pokémon. La cualidad que tienen es que además de tener con su tipo
   * independientemente de los demás tipos de contendientes, gritará su 
   * nombre antes de atacar
   */
  export class Pokemon extends Fighter {
    constructor(public name: string, public weight: number,
      public height: number, public type: string, 
      public stats:powerStats, public phrase: string) {
      super(name, weight, height, stats);    
    }

    /**
     * La habilidad especial de este universo consiste en que cada Pokémon gritará
     * su nombre previo a atacar.
     */
    public secretAbility(): void {
      console.log(this.phrase); 
    }
  }
```

Estas son las pruebas: 

```ts
  // Pruebas Pokémon
  it('Pokémon es instancia de Fighter', () => {
    expect(Charizard).to.be.instanceOf(Fighter);
  });

  it('Pokémon es instancia de Pokemon', () => {
    expect(Charizard).to.be.instanceOf(Pokemon);
  });

  it('Pokémon tiene un método para decir su nombre', () => {
    expect(Charizard.secretAbility).to.be.exist;
  });
``` 

Los contendientes `SuperSayajines` son los más poderoso. Gracias al poder de las bolas de dragón evaden la muerte y activan su habilidad _Kamehameha_ que les permite ganar instantáneamente. _Muy justo la verdad_. Esta habilidad será activada cuando su vida llegue a cero, se les fijará la vida a 1 y su ataque aumentara a ***9999***. Tienen un `boolean` para indicar si esta habilidad ha sido activada o no: `godmode`. Inicialmente será falso. Este es el código y las pruebas de este universo: 

```ts
  export class SuperSayajin extends Fighter {
    constructor(public name: string, public weight: number,
      public height: number, 
      public stats:powerStats, public godMode: boolean = false) {
      super(name, weight, height, stats);    
    }

    /**
     * Devuelve el booleano que comprueba si una Kamehameha ha sido realizada
     * o no 
     */
    public getGodMode(): boolean {
      return this.godMode;
    }

    /**
     * La habilidad secreta de los Super Sayan consiste en que al su vida reducirse 
     * a cero, revive y inflinje un ataque que mata a cualquier contrincante, gracias 
     * a las bolas de dragón
     */
    public secretAbility(): void {
      this.stats.attack = 9999;
      this.stats.hp = 1;
      this.godMode = true;
      console.log('Pensabas que habías ganado pero... KAMEHAMEHA');
    } 
  }
```

```ts
  it('SuperSayajin es instancia de Fighter', () => {
    expect(Vegeta).to.be.instanceOf(Fighter);
  });

  it('SuperSayajin es instancia de SuperSayajin', () => {
    expect(Vegeta).to.be.instanceOf(SuperSayajin);
  });

  it('SuperSayajin tiene en su poder la KameHameHa', () => {
    expect(Vegeta.secretAbility).to.exist;
  });

  it('SuperSayajin tiene un bool para decir si ha usado la KameHameHa', () => {
    expect(Vegeta.getGodMode()).to.be.false;
  });
```

Por último, he implementado a los famosos luchadores de la famosa franquicia de _Capcom_ `StreetFighter`. Su habilidad consiste en que antes de cada ataque, realizan el famoso `Hadōken`. Esto les aumenta el ataque en 10 **cada ataque** que realizan. Código y pruebas de la clase:

```ts
  export class StreetFighterCapcom extends Fighter {
    constructor(public name: string, public weight: number,
      public height: number, 
      public stats:powerStats, public godMode: boolean = false) {
      super(name, weight, height, stats);    
    }
    /**
     * Habilidad secreta Hadōken que realiza un ataque reforzado
     */
    public secretAbility() {
      console.log('HADOOKEN');
      this.getStats().attack += 10;
    }
  }
```

```ts
  // Pruebas StreetFighter
  it('StreetFighterCapcom es instancia de Fighter', () => {
    expect(Ryu).to.be.instanceOf(Fighter);
  });

  it('StreetFighterCapcom es instancia de StreetFighterCapcom', () => {
    expect(Ryu).to.be.instanceOf(StreetFighterCapcom);
  });

  it('StreetFighterCapcom tiene en su poder el Hadōken', () => {
    expect(Ryu.secretAbility()).to.eql(undefined);
  });
```

#### Clase Pokédex
Esta clase ahora es capaz de almacenar a todos los contendientes y de **todos** los universos. Podrá añadir y quitar luchadores gracias a sus métodos `add` y `remove`.

Código de la implementación:

```ts
  /**
   * Clase que almacena luchadores de cualquier universo
   */
  export class Pokedex {
    constructor(private fighters: Fighter[]) {
    }

    /**
     * Añade un luchador a la base de datos
     * @param fighter luchador a añadir
     */
    add(fighter: Fighter) {
      this.fighters.push(fighter);
    }

    /**
     * Elimina un luchador de una posición dada
     * @param pos posición que queremos eliminar
     */
    remove(pos: number) {
      this.fighters = this.fighters.slice(pos, 1);
    }
  }
```

Pruebas implementadas

```ts
  // Pruebas Pokédex
  it('Pokédex es instancia de Pokédex', () => {
    expect(pokedex).to.be.instanceOf(Pokedex);
  });
  
  it('Pokédex tiene un método que añade luchadores de varios universos', () => {
    expect(pokedex.add).to.be.exist;
    // expect(pokedex.add(Charizard)).to.be.eql('');
    // expect(pokedex.add(Vegeta)).to.be.eql('');
  });
  
  it('Pokédex puede eliminar luchadores de su base de datos', () => {
    expect(pokedex.remove).to.be.exist;
  });
```