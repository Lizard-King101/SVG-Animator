import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Noise } from 'noisejs';
import observeResize from 'simple-element-resize-detector';
import { ColorPickerPage } from '../../../popover/color-picker/color-picker';

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreateModal implements AfterViewInit{
  @ViewChild('View') view: any;
  @ViewChild('Menu') menu: any;

  menuController;
  viewController;


  constructor(private pop: PopoverController) {
    
  }

  ngAfterViewInit() {
    this.view = <HTMLElement>this.view.nativeElement;
    this.menu = <HTMLElement>this.menu.nativeElement;
    this.menuController = new Menu();
    this.menuController.init(this.menu);
    this.viewController = new View();
    this.viewController.init(this.view);
    console.dir(this.menuController);
  }

  id() {
    return Math.random().toString(36).substr(2, 9);
  }
  
}

function Menu() {
  this.collapsed = false;
  this.element;

  this.toggle = () => {
    this.collapsed = !this.collapsed;
  }
  this.init = (e) => {
    // set menu element
    this.element = e;
  }
}

function View() {
  this.element;

  this.view;
  this.scale = 1;
  this.viewSize = { w: 0, h: 0 };

  // this is a Rect Object
  this.canvas;
  this.canvasSize = { w: 750, h: 400 };
  this.canvasPos = { x: 0, y: 0 };

  this.mousePos = { x: 0, y: 0 };

  
  // initialize view
  this.init = (e, canvasSize = { w: 750, h: 400 }) => {
    // set view element
    this.element = e;
    this.canvasSize = canvasSize;
    this.setupView();
    this.setupListeners();
  };


  this.setupListeners = () => {
    observeResize(this.element, () => {
      this.viewSize = {
        w: this.element.clientWidth,
        h: this.element.clientHeight
      }
      this.view.setAttribute("width", this.viewSize.w+"px");
      this.view.setAttribute("height", this.viewSize.h+"px");
      this.view.setAttribute("viewbox", "0 0 "+this.element.clientWidth+" "+this.element.clientHeight);
    });

    this.element.addEventListener('mousedown', (e)=>{
      // 0 : Left, 1: Middle, 2: Right
      console.log(['left','middle','right'][e.button])
    });
    this.element.addEventListener('mouseup', (e)=>{
      console.log('mouseup', e)
    });

    this.element.addEventListener('mousemove', (e)=>{
      this.mousePos = {x: e.screenX, y: e.screenY };
    });

    this.element.addEventListener('wheel', (e)=>{
      console.log(e);
    });
  }

  this.setupView = () => {
    // create svg element and children
    this.view = document.createElementNS('http://www.w3.org/2000/svg','svg');
    this.element.append(this.view);
    this.view.setAttribute("width", this.element.clientWidth+"px");
    this.view.setAttribute("height", this.element.clientHeight+"px");
    this.view.setAttribute("viewbox", "0 0 "+this.element.clientWidth+" "+this.element.clientHeight);

    this.canvas = GetObject('rect');
    this.canvas.init({
      size: this.canvasSize,
      pos: this.canvasPos,
      super: this,
      parent: this.view,
      nest: true
    });
    this.canvas.fillColor('#fff');
    console.dir(this.view);
  }


  this.scroll = () => {

  };
  this.move = () => {

  };

  this.toViewPos = (pos = {x: 0, y: 0}) => {

  }

  this.toCanvasPos = (pos = {x: 0, y: 0}) => {
    
  }
}

function GetObject(type) {
  if(type == 'rect') return new Rect();
}

function Point() {
  this.handles = false;
  this.pos = {
    x: 0,
    y: 0
  }



}

function Line() {

}

function Curve() {

}

function Rect() {
  this.element;
  this.parent;
  this.view;

  this.handles = false;
  this.pos = {
    x: 0,
    y: 0
  }
  this.size = {
    w: 0,
    h: 0
  }

  this.styles = {

  }

  this.init = (options) => {
    // create canvas rect
    this.element = document.createElementNS('http://www.w3.org/2000/svg','rect');
    if(options.size) this.size = options.size; this.setSize();
    if(options.pos) this.pos = options.pos; this.setPos();
    if(options.super) this.view = options.super;
    if(options.parent) this.parent = options.parent;
    if(options.nest && options.parent) this.parent.append(this.element);
  }

  this.fillColor = (color) => {
    if(color) this.styles.fill = color;
    else delete this.styles.fill;
    this.updateStyle()
  }
  this.strokeColor = (color) => {
    if(color) this.styles.stroke = color;
    else delete this.styles.stroke;
    this.updateStyle()
  }
  this.fillOpacity = (int) => {
    if(int) this.styles['fill-opacity'] = int;
    else delete this.styles['fill-opacity'];
    this.updateStyle()
  }
  this.strokeOpacity = (int) => {
    if(int) this.styles['stroke-opacity'] = int;
    else delete this.styles['stroke-opacity'];
    this.updateStyle()
  }
  this.strokeWidth = (width) => {
    if(width) this.styles['stroke-width'] = width;
    else delete this.styles['stroke-width'];
    this.updateStyle()
  }
  this.updateStyle = () => {
    let styleStr = '';
    Object.keys(this.styles).forEach((style)=>{
      let val = this.styles[style];
      styleStr += style + ':' + val + ';'
    });
    this.element.setAttribute("style", styleStr);
  }

  this.setSize = (size) => {
    if(size) this.size = size;
    this.element.setAttribute("width", this.size.w);
    this.element.setAttribute("height", this.size.h);
  }

  this.setPos = (pos) => {
    if(pos) this.pos = pos;
    this.element.setAttribute("x", this.pos.x);
    this.element.setAttribute("y", this.pos.y);
  }

}