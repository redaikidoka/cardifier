import {Component, Input, OnInit} from '@angular/core';
import {Hand} from '../../core/data/game';
import {Observable} from 'rxjs';
import {Chat} from '../../core/data/chat';
import {ChatService} from '../../root/chat.service';
import {AuthService} from '../../root/auth.service';
import {DiceService} from '../../root/dice.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Input() chats$: Observable<Chat[]> | undefined;
  @Input() showSystem = true;
  @Input() idGame: string | undefined;

  newChat = '';

  constructor(private chatter: ChatService, private auth: AuthService, private roller: DiceService) {
  }

  ngOnInit(): void {
  }

  makeChat(): void {
    console.log('chatList::makeChat - new message:', this.newChat);

    if (this.newChat === '') {
      return;
    }

    if (this.isRoll(this.newChat)) {
      this.roller.rollAndChat(this.newChat, this.idGame || '');
    } else {
      const myChat = {
        idGame: this.idGame,
        idUser: this.auth.myId(),
        userName: this.auth.me().userName,
        message: this.newChat,
        when: (new Date()).valueOf()
      } as Chat;

      this.chatter.createChat(myChat);
    }

    this.newChat = '';

  }

  isRoll(chatText: string): boolean {
    return (chatText.toLowerCase().indexOf('/roll') > -1);


  }
}
