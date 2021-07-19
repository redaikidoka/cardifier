import {Component, Input, OnInit} from '@angular/core';
import {Hand} from '../../core/data/game';
import {Observable} from 'rxjs';
import {Chat} from '../../core/data/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Input() chats$: Observable<Chat[]> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
