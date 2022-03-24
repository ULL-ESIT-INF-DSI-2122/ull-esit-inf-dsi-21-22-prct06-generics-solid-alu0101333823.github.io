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

### Ejercicio 2
Para crear nuestra plataforma de _Streaming_, crearemos una interfaz genérica `Stremeable` con la que sentar unas bases para el resto de clases a crear: 

```ts
  /**
   * Esta interfaz será la responsable de ser implementada en todas las clases
   * para crear DSIflix. Deberá poder añadir items, así como eliminarlos, y podrá
   * obtenerse una peli, serie o documental por nombre. Podrá devolverse el 
   * número de contenido digital total.
   */
  export interface Stremeable<T> {
    /**
     * @param item item a añadir
     */
    addItem(item: T): void;
    
    /**
     * @param name nombre del item a devolver
     * @returns item 
     * @returns undefined en caso de no encontrarse 
     */
    getItemByName(name: string): T | undefined;

    /**
     * Dado un item lo elimina de la lista
     * @param name nombre del item a eliminar
     */
    removeItemByName(name: string): void;

    /**
     * Devuelve el número de items totales
     */
    getAllItems(): number;
  } 
```

Con esta interfaz, crearemos la clase abstracta genérica que nos permitirá crear las pautas necesarias para definir las colecciones de `Series`, `Películas` y `Documentales`. Esta clase se llamará `BasicStremeableCollection`. He particularizado dos de los métodos, uno que te devuelve el número de _items_ que tiene la colección y otro que añade un _item_ a dicha base de datos: 

```ts
  /**
   * Esta clase abstracta genérica es la base para desarrollar
   * las diferentes colecciones en la plataforma.
   */
  export abstract class BasicStremeableCollection<T> implements Stremeable<T> {
    protected items: T[] = [];
    constructor() {
    }
    
    /** 
     * @param item item a añadir
     */
    addItem(item: T): void {
      this.items.push(item);
    }
    
    /**
     * Devuelve el número de items totales
     */
    getAllItems(): number {
      return this.items.length;
    }

    /**
     * Dado un item lo elimina de la lista
     * @param name nombre del item a eliminar
     */
    abstract removeItemByName(name: string): void;

    /**
     * @param name nombre del item a devolver
     * @returns item 
     * @returns undefined en caso de no encontrarse 
     */
    abstract getItemByName(name: string): T | undefined;
  }
``` 

Ahora bien, creamos los tres tipos de colecciones, pero no sin antes crear las clases `Serie`, `Movie` y `Documentary`, que serán el tipo de sus respectivas colecciones. Estas clases solo guardan sus características como su nombre, número de capítulos o duración:

```ts
  export class Serie {
    /**
     * @param name nombre de la serie
     * @param duration duración medio de cada capítulo
     * @param chapterNum número total de capítulos
     */
    constructor(public name: string, public duration: number, public chapterNum: number) {
    }
  }

  export class Movie {
    /**
     * @param name nombre de la película
     * @param duration duración en minutos de la misma
     */
    constructor(public name: string, public duration: number) {
    }
  }

  export class Documentary {
    /**
     * @param name nombre del documental
     * @param duration duración en minutos del mismo
     */
    constructor(public name: string, public duration: number) {
    }
  }
```

Por último, creamos las 3 últimas colecciones con las que podremos particularizar los dos métodos que nos restan definidos en `Stremeable`. Dichas colecciones serán `SeriesCollection`, `MoviesCollection` y `DocumentaryCollection`:

```ts
  /**
   * Clase que guarda una colección de Series
   */
  export class SeriesCollection extends BasicStremeableCollection<Serie> {
    constructor() {
      super();
    }

    /**
     * Elimina una serie de la base de datos
     * @param name nombre de la serie
     */
    removeItemByName(name: string): void {
      this.items.forEach((element, index) => {
        if (element.name === name) {
          this.items = this.items.splice(index, 1);
        }
      });
    }
    
    /**
     * Busca y devuelve una serie de la base de datos por
     * su nombre
     * @param name 
     * @returns 
     */
    getItemByName(name: string): Serie | undefined {
      this.items.forEach((element) => {
        if (element.name === name) {
          return element;
        }
      });
      return undefined;
    }
  }

  export class MoviesCollection extends BasicStremeableCollection<Movie> {
    constructor() {
      super();
    }

    /**
     * Elimina una Movie de la base de datos
     * @param name nombre de la Movie
     */
    removeItemByName(name: string): void {
      this.items.forEach((element, index) => {
        if (element.name === name) {
          this.items = this.items.splice(index, 1);
        }
      });
    }
    
    /**
     * Busca y devuelve una Movie de la base de datos por
     * su nombre
     * @param name 
     * @returns 
     */
    getItemByName(name: string): Movie | undefined {
      this.items.forEach((element) => {
        if (element.name === name) {
          return element;
        }
      });
      return undefined;
    }
  }

  export class DocumentaryCollection extends BasicStremeableCollection<Documentary> {
    /**
     * @param name nombre del documental
     * @param duration duración en minutos del mismo
     */
    constructor() {
      super();
    }

    /**
     * Elimina una Documentary de la base de datos
     * @param name nombre de la Documentary
     */
    removeItemByName(name: string): void {
      this.items.forEach((element, index) => {
        if (element.name === name) {
          this.items = this.items.splice(index, 1);
        }
      });
    }
    
    /**
     * Busca y devuelve una Documentary de la base de datos por
     * su nombre
     * @param name 
     * @returns 
     */
    getItemByName(name: string): Documentary | undefined {
      this.items.forEach((element) => {
        if (element.name === name) {
          return element;
        }
      });
      return undefined;
    }
  }
```

Para terminar con este segundo ejercicio, las pruebas llevadas a cabo para el correcto _testeo_ de estas clases mecionadas anteriormente:

```ts
  const serie1 = new Serie('Lost', 50, 120);
  const movie1 = new Movie('1917', 117);
  const documentary1 = new Documentary('WWII a color', 800);
  const series = new SeriesCollection();
  const movies = new MoviesCollection();
  const documentaries = new DocumentaryCollection();

  describe('Pruebas de las clases del Ejercicio 2', () => {
    describe('Pruebas de la clase BasicStremeableCollection', () => {
      it('Puede añadir items', () => {
        expect(series.addItem(serie1)).to.be.eql(undefined);
        expect(movies.addItem(movie1)).to.be.eql(undefined);
        expect(documentaries.addItem(documentary1)).to.eql(undefined);
      });

      it('Puede decirnos cuantos items tiene guardados', () => {
        expect(series.getAllItems()).to.be.eq(1);
        expect(movies.getAllItems()).to.be.eq(1);
        expect(documentaries.getAllItems()).to.eq(1);
      });
    });

    describe('Pruebas de la clase Serie', () => {
      it('Series es instancia de BasicStremeableCollection', () => {
        expect(series).to.be.instanceOf(BasicStremeableCollection);
      });

      it('Series es instancia de SeriesCollection', () => {
        expect(series).to.be.instanceOf(SeriesCollection);
      });

      it('Series tiene un método para buscar por nombre una serie', () => {
        expect(series.getItemByName('Lost')).to.not.eql(serie1);
        expect(series.getItemByName('Castle')).to.be.eql(undefined);
      });

      it('Series tiene un método para eliminar por nombre una serie', () => {
        expect(series.removeItemByName('Lost')).to.be.eql(undefined);
      });
    });

    describe('Pruebas de la clase MovieCollection', () => {
      it('MoviesCollection es instancia de BasicStremeableCollection', () => {
        expect(movies).to.be.instanceOf(BasicStremeableCollection);
      });

      it('MoviesCollection es instancia de MoviesCollection', () => {
        expect(movies).to.be.instanceOf(MoviesCollection);
      });

      it('MoviesCollection tiene un método para buscar por nombre una película', () => {
        expect(movies.getItemByName('1917')).to.not.eql(movie1);
        expect(movies.getItemByName('El padrino')).to.be.eql(undefined);
      });

      it('MoMoviesCollectionvie tiene un método para eliminar por nombre una película', () => {
        expect(movies.removeItemByName('1917')).to.be.eql(undefined);
      });
    });

    describe('Pruebas de la clase DocumentaryCollection', () => {
      it('DocumentaryCollection es instancia de BasicStremeableCollection', () => {
        expect(documentaries).to.be.instanceOf(BasicStremeableCollection);
      });

      it('DocumentaryCollection es instancia de DocumentaryCollection', () => {
        expect(documentaries).to.be.instanceOf(DocumentaryCollection);
      });

      it('DocumentaryCollection tiene un método para buscar por nombre un documental', () => {
        expect(documentaries.getItemByName('WWII a color')).to.not.eql(documentary1);
        expect(documentaries.getItemByName('El espacio')).to.be.eql(undefined);
      });

      it('DocumentaryCollection tiene un método para eliminar por nombre un documental', () => {
        expect(documentaries.removeItemByName('WWII a color')).to.be.eql(undefined);
      });
    });
  });
```

### Ejercicio 3
En este último ejercicio se implementará una clase que nos permitirá cifrar mensajes que le pasemos como parámetros a sus métodos. El constructor de la clase debe ser quien guarde el _alfabeto_ que vamos a usar y el _desplazamiento_ que se usará. La clave en este ejercicio nos la indicaron en la asignatura de _Seguridad en Sistemas Informáticos_. El mayor desafío consistirá en que los desplazamientos que causen un desborde (es decir la letra Y si la desplazamos a la derecha 3 posiciones se sale del orden del alfabeto español ¿no?). Para estos casos usaremos la operación **módulo**. Esto permitirá que las letras que causen un desbordamiento se desplacen de manera correcta. 

Por ejemplo, la z es 26 (en el alfabeto inglés, supongamos que la ñ no existe). Si la desplazamos dos veces, obtenemos 28, número que no corresponde a nada en el alfabeto. Pero si sacamos el módulo de la suma al ser dividida entre 26, obtenemos esto:

  * `28 % 26 = 2`

Cualquier carácter que no pertenezca al alfabeto que la clase tiene registrado será ignorado totalmente. Por ejemplo comas y espacios. He realizado un ejemplo, cuyo alfabeto es el siguiente: `ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz`. El resultado es el siguiente:

  ![](/assets/output2.png)
  > Resultado de un cifrado

Como se puede observar, los espacios y la coma son absolutamente respetados. En caso de introducir un espacio o la coma en el alfabeto, serían desplazados también. He aquí el algoritmo:ç

```ts
  export class Cifrado {
    constructor(private desplazamiento: number, private alphabet: string) {
    }

    /**
     * Cifra un mensaje usando el alfabeto y desplazamiento indicado en el 
     * constructor
     * @param msg mensaje a cifrar
     * @returns el mensaje cifrado
     */
    cifrar(msg: string): string {
      let result: string = '';    
      for (let i = 0; i < msg.length; i++) {
        if (this.alphabet.indexOf(msg[i]) !== -1) {
          let aux = this.alphabet.indexOf(msg[i]);
          aux = (aux + this.desplazamiento) % this.alphabet.length;
          result += this.alphabet[aux];
        } else {
          result += msg[i];
        }
      }    
      return result;
    }

    /**
     * Descifra un mensaje usando el alfabeto y desplazamiento indicado en el 
     * constructor
     * @param msg mensaje a descifrar
     * @returns el mensaje descifrado
     */
    descifrar(msg: string): string {
      let result: string = '';
      for (let i = 0; i < msg.length; i++) {
        if (this.alphabet.indexOf(msg[i]) !== -1) {
          let aux = this.alphabet.indexOf(msg[i]);
          aux = (aux - this.desplazamiento) % this.alphabet.length;
          result += this.alphabet[aux];
        } else {
          result += msg[i];
        }
      } 
      return result;
    }
  }
```

Se emplea un auxiliar para recalcular el índice a usar en el alfabeto, ese nuevo índice indicará la letra de sustitución para el cifrado. Por último, estas son las pruebas llevadas a cabo: 

```ts
  const cifrado = new Cifrado(5, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz');
  const firstMsg = cifrado.cifrar('Hola, como estas');

  describe('Pruebas del ejercicio 3', () => {
    describe('Pruebas clase Cifrado', () => {
      it('Cifrado es instancia de Cifrado', () => {
        expect(cifrado).to.be.instanceOf(Cifrado);
      });

      it('Cifrado tiene un método para cifrar', () => {
        expect(cifrado.cifrar('Hola, como estas')).to.be.eq(firstMsg);
      });

      it('Cifrado tiene un método para descifrar', () => {
        expect(cifrado.descifrar(firstMsg)).to.be.eq('Hola, como estas');
      });
    });   
  });
```