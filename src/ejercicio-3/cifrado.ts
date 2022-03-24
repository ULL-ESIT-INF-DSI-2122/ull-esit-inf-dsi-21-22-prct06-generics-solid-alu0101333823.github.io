
export class Cifrado {
  constructor(private desplazamiento: number, private alphabet: string) {
  }

  cifrar(msg: string): string {
    let result: string = '';
    
    for (let i = 0; i < msg.length; i++) {
      // La letra a ascii de nuestro alfabeto (a = 0, b = 1, etc)
      let aux = this.alphabet.indexOf(msg[i]);
      console.log(aux);
      // Ese índice de nuestro alfableto ahora será igual a index % alphabet length
      aux = (aux + this.desplazamiento) % this.alphabet.length;
      // Ese índice ahora resultado a letra otra vez
      result += this.alphabet[aux];
    }
    
    return result;
  }

  descifrar(msg: string): string {
    const result: string = '';

    return result;
  }
}

const cifrado = new Cifrado(5, 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ');
console.log(`Ciframos hola: ${cifrado.cifrar('ABC')}`);
