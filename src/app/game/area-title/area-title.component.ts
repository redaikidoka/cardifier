import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../core/data/game';

@Component({
  selector: 'app-area-title',
  templateUrl: './area-title.component.html',
  styleUrls: ['./area-title.component.scss']
})
export class AreaTitleComponent implements OnInit {
  @Input() titleText = 'title';
  @Input() iconUrl: string | undefined;

  @Input() iconSize = 'h-8';
  @Input() textSize = 'text-2xl';

  constructor() {
  }

  ngOnInit(): void {
  }

}
