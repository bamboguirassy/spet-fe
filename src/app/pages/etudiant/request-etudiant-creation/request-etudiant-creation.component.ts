import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-etudiant-creation',
  templateUrl: './request-etudiant-creation.component.html',
  styleUrls: ['./request-etudiant-creation.component.scss']
})
export class RequestEtudiantCreationComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    document.getElementById('preloader').classList.add('hide');
  }

  ngOnInit() {
  }

}
