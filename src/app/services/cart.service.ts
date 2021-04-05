import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartSummary } from '../models/card';
import { CartItem, CartItems } from '../models/cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  private cartSummary = new CartSummary()
  private dataSource = new BehaviorSubject<CartSummary>(this.cartSummary);
  data = this.dataSource.asObservable()
  
  constructor() { 
    
  }

  addToCart(cartItem:CartItem){
      // check findex point
      CartItems.push(cartItem)
      this.cartSummary.customerId = cartItem.customerId
      this.calculateCart()
  }

  removeFromCart(cartItem:CartItem){
    let item:CartItem = CartItems.find(c=>c.carId===cartItem.carId)
    CartItems.splice(CartItems.indexOf(item),1)
    this.calculateCart()
  }

  calculateCart(){
    let total = CartItems.reduce((acc, val) => acc += val.totalPrice, 0)
    this.cartSummary.cartTotal = total
    this.dataSource.next(this.cartSummary)
  }

  cartList():CartItem[]{
    return CartItems
  }

}