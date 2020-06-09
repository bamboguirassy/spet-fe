import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Etudiant} from '../etudiant/etudiant';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AssistanceEmailService} from '../assistanceemail/assistanceemail.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: ['.list-group-item:hover { background-color: #dd1b16; color: white; } '],
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
