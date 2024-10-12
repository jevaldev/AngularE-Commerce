import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopingCartPage } from './shoping-cart.page';

describe('ShopingCartPage', () => {
  let component: ShopingCartPage;
  let fixture: ComponentFixture<ShopingCartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
