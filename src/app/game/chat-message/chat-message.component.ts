import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chat} from '../../core/data/chat';
import {Observable} from 'rxjs';
import {CardUser} from '../../core/data/card-user';
import {UserService} from '../../root/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent  implements OnInit {
  @Input() chat: Chat | undefined;

  user$: Observable<CardUser | undefined> | undefined;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    if (this.chat) {
      this.user$ = this.userService.getUser$(this.chat?.idUser);

    } else {
      console.log('chatMessage.onInit - no Chat!!');
    }
  }

  getInitials(user: CardUser): string {
    return UserService.getInitials(user.userName);
  }
}
