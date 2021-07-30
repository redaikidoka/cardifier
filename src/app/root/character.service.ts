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
    // let ourCharacter: Character = {} as Character;
    // return of(this.faker);

    return this.afs.doc<Character>(`characters/${idCharacter}`).valueChanges().pipe(
      tap(character => console.log('character.service::getCharacter$ singleton', character)),
    );
    // return this.db.list<Character>('/characters', ref => ref.orderByKey().equalTo(idCharacter)).valueChanges().pipe(
    //   // tap(character => console.log('character.service::getCharacter$', idCharacter, character)),
    //   map(characters => characters[0] ?? null),
    //   tap(character => ourCharacter = character),
    //   tap(character => console.log('character.service::getCharacter$ singleton', character)),
    //   // mergeMap(character => {
    //   //   return this.gameService.getHand$('44');
    //   // }),
    //   // map( hand44 => {
    //   //   if (ourCharacter.hands) {
    //   //   ourCharacter.hands.push(hand44);
    //   //   } else {
    //   //     ourCharacter.hands = [hand44];
    //   //   }
    //   //
    //   //   return ourCharacter;
    //   // })
    // );
  }

  // getGameCharacter(idGame: number, idUser: number): Observable<Character> {
  //   return of(this.getFaker());
  // }

  getCharacters$(theList: CharacterList[]): Observable<Character[]> {
    const idList = theList.map(charEntry => charEntry.idCharacter);

    return this.afs.collection<Character>('characters', ref => ref.where('idCharacter', 'in', idList)).valueChanges().pipe(
      tap(characters => console.log('looked for ', theList, 'found ', characters))
    );
    // const characterObservables: Observable<any>[] = [];
    //
    // theList?.forEach((cl: CharacterList) => {
    //   characterObservables.push(this.getCharacter$(cl.idCharacter).pipe(take(1)));
    // });
    //
    // console.log('character.service::getCharacters$ -> character fetch observables', characterObservables);
    //
    // // if (characterObservables.length > 0) {
    // // return forkJoin(characterObservables).pipe(
    // //     map(characters => {
    // //       console.log('Game.service getGame$ -> getcharacter() forkjoin', characters);
    // //       game.characters = characters;
    // //       ourGame.characters = characters;
    // //
    // //       return ourGame;
    // //     })
    // //   );
    // // }
    // // return game;
    // return forkJoin(characterObservables).pipe(
    //   tap(characters => console.log('character.service::getCharacters$ forked', characters))
    //   // map(characters => ({theGame, characters}))
    // );
  }

}
