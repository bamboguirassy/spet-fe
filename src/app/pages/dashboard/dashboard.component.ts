import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { Etudiant } from '../etudiant/etudiant';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AssistanceEmail } from '../assistanceemail/assistanceemail';
import { NewMail } from '../assistanceemail/NewMail';
import { AssistanceEmailService } from '../assistanceemail/assistanceemail.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements AfterViewInit, OnInit {
  etudiant: Etudiant;
 
  constructor(public acivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public assistanceEmailSrv: AssistanceEmailService) {
    
  }
  ngOnInit(): void {
    this.etudiant = this.acivatedRoute.snapshot.data.etudiant;
  }
  
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }


}
