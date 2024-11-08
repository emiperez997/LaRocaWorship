import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: false,
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined): SafeHtml {
    const highlightedText = value?.replace(
      /\[([^\]]+)\]/g,
      `<span class="highlight">[$1]</span>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText!);
  }
}
