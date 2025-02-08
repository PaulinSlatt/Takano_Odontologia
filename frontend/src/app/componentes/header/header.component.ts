import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  scrollToSection(section: string) {
    const target = document.getElementById(section);
    if (target) {
      this.smoothScrollTo(target);
    }
  }

  private smoothScrollTo(element: HTMLElement) {
    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + startPosition;
    const duration = 2000; 
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }



}
