import {Injectable} from '@angular/core';
import {Character, CharacterList} from '../core/data/character';
import {Observable} from 'rxjs';
import {map, mergeMap, take, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

// import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  constructor(private afs: AngularFirestore) {
  }

  getCharacter$(idCharacter: string): Observable<Character | undefined> {

    return this.afs.doc<Character>(`characters/${idCharacter}`).valueChanges().pipe(
      map(character => {
        if (character && character.hands) {
          character.hands = character.hands.sort((a, b) => (a.order ?? 0) < (b.order ?? 0) ? -1 : 1);
        }

        return character;
      }),
      tap(character => console.log('character.service::getCharacter$ ', character))
    );

  }


  getCharacters$(theList: CharacterList[], idGame: string): Observable<Character[]> {
    const idList = theList.map(charEntry => charEntry.idCharacter);
    console.log('character.service::getCharacters$', theList, idList);

    return this.afs.collection<Character>(`games/${idGame}/characters`, ref => ref.where('idCharacter', 'in', idList)).valueChanges().pipe(
      tap(characters => console.log('- character.service::getCharacters$ looked for ', theList, 'found ', characters)),
      map( characters => {
        characters.forEach(character => {
          if (character && character.hands) {
            character.hands = character.hands.sort((a, b) => (a.order ?? 0) < (b.order ?? 0) ? -1 : 1);
          }
        });

        return characters;
      }),
      tap(characters => console.log('- character.service::getCharacters$ - sorted hands', characters))
    );

  }

}
