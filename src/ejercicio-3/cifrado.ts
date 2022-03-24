
/**
 * Clase estándar que permitirá cifrar un mensaje mediante el Cifrado de 
 * César.
 * @param desplazamiento el número de desplazamientos para cifrar
 * @param alphabet alfabeto que se usará para cifrar
 */
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

const cifrado = new Cifrado(5, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz');
const firstMsg = cifrado.cifrar('Hola, como estas');
console.log(`Ciframos 'Hola, como estas': ${firstMsg}`);
console.log(`Desciframos '${firstMsg}': ${cifrado.descifrar(firstMsg)}`);
