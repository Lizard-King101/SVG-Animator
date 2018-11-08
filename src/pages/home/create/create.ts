import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Noise } from 'noisejs';
import { ColorPickerPage } from '../../../popover/color-picker/color-picker';

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreateModal implements AfterViewInit{
  @ViewChild('View') view: any;
  @ViewChild('Menu') menu: any;

  constructor(private pop: PopoverController) {
    
  }

  ngAfterViewInit() {
    this.view = <HTMLElement>this.view.nativeElement;
    this.menu = <HTMLElement>this.menu.nativeElement;
  }

  id() {
    return Math.random().toString(36).substr(2, 9);
  }
  
}

function Menu() {
  this.colapse = false;
}

function Cavas() {
  this.scale = 1;
  this.container = {
    w: 750,
    h: 400
  };this.pos = {
    x: 0,
    y: 0
  };

  // initialize view
  this.init = () => {

  };


  this.scroll = () => {

  };
  this.move = () => {

  };
}


function Point() {
  this.pos = {
    x: 0,
    y: 0
  }



}

function Line() {

}

function Curve() {

}

function BezierCurve() {

}
