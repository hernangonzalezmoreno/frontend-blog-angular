import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  public pageTitle: string = 'Crear nueva entrada';

  constructor() { }

  ngOnInit(): void {
  }

}
