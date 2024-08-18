// animate.directive.ts
import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimate]',
  standalone: true,
})
export class AnimateDirective implements OnInit {
  @Input() animationName: string = 'fadeIn'; // Default animation name

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'animated'); // Add base animation class
    this.renderer.addClass(this.el.nativeElement, this.animationName); // Add specific animation class
  }
}
