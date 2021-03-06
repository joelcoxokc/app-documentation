import {inject} from 'aurelia-dependency-injection';
import {AUChannel} from '../services/channel';
import {DOM} from 'aurelia-pal';
import {onAnimationEnd} from './util';
const ACTIVE_CLASSNAME = 'is-active';
const ANIMATION_CLASSNAME = 'au-animation';
const DEFAULT_CLASSNAME = 'au-overlay';


export class OverlayElement {
  element = DOM.createElement('overlay');

  eventListeners = {};

  constructor(parent) {
    this.element.className += ` ${ANIMATION_CLASSNAME} ${DEFAULT_CLASSNAME}`;
    this.parent = parent;
    this.element.classList.add('au-animate');
    return this;
  }

  attach() {
    return onAnimationEnd( this.element, ()=> {
      this.parent.element.appendChild(this.element);
    });
  }

  detach() {
    return onAnimationEnd( this.element, ()=> {
      this.parent.fragment.appendChild(this.element);
    });
  }

  destroy() {
    this.element.remove();
  }
}

@inject(AUChannel)
export class OverlayController {

  element  = DOM.createElement('au-overlay');
  fragment = DOM.createDocumentFragment();
  active   = true;

  constructor(channel, screenSize) {
    this.channel = channel;
  }

  registerContainer(context, element) {
    this.context = context;
    this.container = element;
    this.container.appendChild(this.element);
    return this;
  }

  destroyContainer() {
    this.container.removeChild(this.element);
  }

  getOrCreateOverlay(context) {
    return new OverlayElement(this);
  }
  createOverlay(context) {
    return new OverlayElement(this);
  }

  activate() {
    this.element.classList.add(ACTIVE_CLASSNAME);
  }

  deactivate() {
    this.element.classList.remove(ACTIVE_CLASSNAME);
  }
}
