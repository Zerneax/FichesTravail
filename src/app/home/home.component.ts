import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test: String = "test";
  generateForm: FormGroup;
  calculations: Array<String> = [];

  constructor(private formBuilder: FormBuilder,
    private homeService: HomeService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.generateForm = this.formBuilder.group({
      minA: ['', Validators.required],
      maxA: ['', Validators.required],
      minB: ['', Validators.required],
      maxB: ['', Validators.required],
      inf: [''],
      add: [''],
      nbAdd: [''],
      sub: [''],
      nbSub: [''],
      mul: [''],
      nbMul: [''],
      div: [''],
      nbDiv: ['']
    });
  }

  generateCalculations() {

    let minA = this.generateForm.value['minA'];
    let maxA = this.generateForm.value['maxA'];
    let minB = this.generateForm.value['minB'];
    let maxB = this.generateForm.value['maxB'];
    let nbAdd = this.generateForm.value['nbAdd'];
    let nbSub = this.generateForm.value['nbSub'];
    let nbMul = this.generateForm.value['nbMul'];
    let nbDiv = this.generateForm.value['nbDiv'];
    let inf = this.generateForm.value['inf'];

    this.homeService.setInformations(inf, minA, maxA, minB, maxB);

    if( nbAdd != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateCalculations(nbAdd, ' + '));
    }

    if( nbSub != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateCalculations(nbSub, ' - '));
    }

    if( nbMul != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateCalculations(nbMul, ' x '));
    }

    if( nbDiv != undefined) {
      this.calculations = this.calculations.concat(this.homeService.generateCalculations(nbDiv, ' : '));
    }

    for(var i = 0; i < this.calculations.length; i ++) {
      console.log("" + this.calculations[i]);
    }
  }

  generatePDF() {
    this.homeService.generatePDF(this.calculations);
  }

  submit() {
    this.generateCalculations();
    this.generatePDF();
  }

  // checkBorneSup(control: FormControl) {
  //   //console.log("test: " + this.test);
  //   if(control.value != "") {
  //     let borne = control.value;
  //     if(this.generateForm.value['minA'] == undefined ) {
  //       return { isInvalid: true};
  //     } else if ( borne < this.generateForm.value['minA']) {
  //       return { isInvalid: true};
  //     }
  //   }
  //
  //   return null;
  // }

}
