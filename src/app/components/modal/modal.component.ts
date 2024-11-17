import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <ng-template cdkPortal>
      <article class="modal">
        <header class="modal__header">
          <ng-content select="[modal-header]"></ng-content>
          <button (click)="closeModal.emit()">Close</button>
        </header>
        <div class="modal__body">
          <ng-content select="[modal-body]"></ng-content>
        </div>
      </article>
    </ng-template>
  `,
  imports: [PortalModule],
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(CdkPortal) portal: CdkPortal | undefined;
  @Output() closeModal = new EventEmitter<void>();

  overlay = inject(Overlay);
  overlayConfig = new OverlayConfig({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    minWidth: 500,
  });
  overlayRef = this.overlay.create();

  constructor() {}

  ngOnInit() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal.emit();
    });
  }

  ngAfterViewInit(): void {
    this.overlayRef?.attach(this.portal);
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }
}
