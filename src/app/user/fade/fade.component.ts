import { Component, Input } from '@angular/core'; 
import {
  trigger, 
  state, 
  style, 
  transition, 
  animate, 
} from '@angular/animations'; 

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.css'], 
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})), 
      transition(':enter, :leave', [animate(1000, style({ opacity: 1}))]), 
    ])
  ], 
})
export class FadeComponent {
  @Input() errorMessage: string | null = null; 
}
