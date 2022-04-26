import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public onOpenModal: (employee: undefined, mode: string) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
