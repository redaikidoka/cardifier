import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../core/data/chat';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() chat: Chat | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

}
