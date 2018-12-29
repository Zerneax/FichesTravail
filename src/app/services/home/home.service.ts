import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  generateRandomNumber(min, max) {
    return Math.ceil((Math.random() * max) + min);
  }

  generateAdds(nbAdd, minA, maxA, minB, maxB) {
    let calculations: Array<String> = [];
    for(var i = 0; i < nbAdd;) {
      let a = this.generateRandomNumber(minA, maxA);
      let b = this.generateRandomNumber(minB, maxB);
      let calculation = '' + a + ' + ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }

    }
    return calculations;
  }

  generateSubs(nbSub, minA, maxA, minB, maxB) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbSub;) {
      let a = this.generateRandomNumber(minA, maxA);
      let b = this.generateRandomNumber(minB, maxB);
      let calculation = '' + a + ' - ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }

  generateMuls(nbMul, minA, maxA, minB, maxB) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbMul;) {
      let a = this.generateRandomNumber(minA, maxA);
      let b = this.generateRandomNumber(minB, maxB);
      let calculation = '' + a + ' x ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }


  generateDivs(nbDiv, minA, maxA, minB, maxB) {
    let calculations : Array<String> = [];
    for(var i = 0; i < nbDiv;) {
      let a = this.generateRandomNumber(minA, maxA);
      let b = this.generateRandomNumber(minB, maxB);
      let calculation = '' + a + ' : ' + b + " = ______";
      if(!calculations.includes(calculation)) {
        calculations.push(calculation);
        i ++;
      }
    }
    return calculations;
  }

  generatePDF(calculations) {

    var nbPages = 1;

    var maxPages = 1;
    if(calculations.length > 24  )
      maxPages = Math.round(calculations.length / 24);

    var doc = new jsPDF();

    doc.setLineWidth(1);
    doc.rect(5, 5, 100, 25);
    doc.rect(105, 5, 100, 25);
    doc.setFontStyle("bold");
    doc.setFontSize(22);
    doc.text('Calculs', 40, 20);

    doc.setFontStyle("normal");
    doc.setFontSize(14);
    var x = 20;
    var y = 50;

    for(var i = 0; i < calculations.length; i ++) {
      doc.text(calculations[i], x, y);
      x += 60;

      if(i != 0 && i % 23 == 0) {
        x = 20;
        y = 50;
        doc.text('Page ' + nbPages + '/' + maxPages, 180, 290);
        nbPages ++;

        doc.addPage(nbPages, 'a6');
        doc.setLineWidth(1);
        doc.rect(5, 5, 100, 25);
        doc.rect(105, 5, 100, 25);
        doc.setFontStyle("bold");
        doc.setFontSize(22);
        doc.text('Calculs', 40, 20);

        doc.setFontStyle("normal");
        doc.setFontSize(14);
      }

      if(x > 140) {
        x = 20;
        y += 30;
      }

    }

    doc.text('Page ' + nbPages + '/' + maxPages, 180, 290);
    doc.save('Fiche calculs.pdf');
  }
}
