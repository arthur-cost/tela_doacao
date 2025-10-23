import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.css']
})
export class DoacaoComponent {
  currentScreen: 'screen1' | 'screen2' | 'screen3' = 'screen1';
  currentDonationType: 'financeira' | 'alimentos' | 'roupas' = 'financeira';
  currentPaymentMethod: 'pix' | 'credit' = 'pix';
  currentValue: string = '50';
  
  showCustomValue: boolean = false;
  customValue: string = 'R$ 0,00';
  
  foodType: 'nao-perecivel' | 'perecivel' = 'nao-perecivel';
  foodQuantity: string = '';
  specialConditions: string = '';
  safetyGuidelinesAccepted: boolean = false;
  deliveryOption: 'coleta' | 'pontos' = 'coleta';

  
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';
  cardName: string = '';
  cardCpf: string = '';

  selectDonationType(type: 'financeira' | 'alimentos' | 'roupas'): void {
    this.currentDonationType = type;
  }

  selectValue(value: string): void {
    this.currentValue = value;
    this.showCustomValue = false;
  }

  showCustomValueInput(): void {
    this.showCustomValue = true;
    this.customValue = '';
  }

  onCustomValueInput(): void {
    let value = this.customValue.replace(/\D/g, '');
    
    if (value === '') {
      this.customValue = 'R$ 0,00';
      this.currentValue = '0';
      return;
    }
    
    const numericValue = parseInt(value) / 100;
    const formattedValue = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    this.customValue = `R$ ${formattedValue}`;
    this.currentValue = formattedValue.replace('.', '').replace(',', '.');
  }

  onCustomValueFocus(): void {
    if (this.customValue === 'R$ 0,00' || this.customValue === '') {
      this.customValue = '';
    }
  }

  onCustomValueBlur(): void {
    if (this.customValue === '' || this.customValue === 'R$ ') {
      this.customValue = 'R$ 0,00';
      this.currentValue = '0';
    }
  }

  selectPaymentMethod(method: 'pix' | 'credit'): void {
    this.currentPaymentMethod = method;
  }

  selectFoodType(type: 'nao-perecivel' | 'perecivel'): void {
    this.foodType = type;
  }

  selectDeliveryOption(option: 'coleta' | 'pontos'): void {
    this.deliveryOption = option;
  }

  confirmFinancialDonation(): void {
    this.currentScreen = 'screen2';
  }

  confirmFoodDonation(): void {
    if (!this.safetyGuidelinesAccepted) {
      alert('Por favor, confirme que leu e concorda com as Diretrizes de Segurança e Higiene.');
      return;
    }
    this.currentScreen = 'screen3';
  }

  finalizeDonation(): void {
    alert('Doação realizada com sucesso! Obrigado pela sua contribuição.');
  }

  backToStart(): void {
    this.currentScreen = 'screen1';
    this.safetyGuidelinesAccepted = false;
    this.foodQuantity = '';
    this.specialConditions = '';
  }

  formatForDisplay(value: string): string {
    const numericValue = parseFloat(value);
    return numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  
  formatCardNumber(): void {
    
    let numbers = this.cardNumber.replace(/\D/g, '');
    
    
    numbers = numbers.substring(0, 16);
    
    
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.cardNumber = formatted;
  }

  formatCardExpiry(): void {
    
    let numbers = this.cardExpiry.replace(/\D/g, '');
    
    
    numbers = numbers.substring(0, 4);
    
    
    if (numbers.length >= 2) {
      const month = numbers.substring(0, 2);
      const year = numbers.substring(2, 4);
      this.cardExpiry = `${month}/${year}`;
    } else {
      this.cardExpiry = numbers;
    }
  }

  formatCardCvv(): void {
    
    this.cardCvv = this.cardCvv.replace(/\D/g, '').substring(0, 4);
  }

  formatCpf(): void {
    
    let numbers = this.cardCpf.replace(/\D/g, '');
    
    
    numbers = numbers.substring(0, 11);
    
    
    if (numbers.length <= 3) {
      this.cardCpf = numbers;
    } else if (numbers.length <= 6) {
      this.cardCpf = numbers.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (numbers.length <= 9) {
      this.cardCpf = numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      this.cardCpf = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  }
}
