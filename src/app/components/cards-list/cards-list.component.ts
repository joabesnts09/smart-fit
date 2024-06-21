import { Component, Input } from '@angular/core'
import { GetUnitsService } from '../../services/get-units.service'
import { ILocations } from '../../interfaces/location.interface'
import { CommonModule } from '@angular/common'
import { CardComponent } from '../card/card.component'

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
  @Input() unitsList: ILocations[] = []

  constructor() {}

  ngOnInit() { 
  }
}
