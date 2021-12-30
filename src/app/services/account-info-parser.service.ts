import { Injectable } from '@angular/core';
import { IMeterHistoryValue } from '../interfaces/meter-history-value.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoParserService {

  constructor() { }

  parseMetersHistory(htmlDoc: string): IMeterHistoryValue[] {
    const withoutSpaces = htmlDoc.replace('\n', '');

    const parser = new DOMParser();
    const document = parser.parseFromString(withoutSpaces, 'text/html');
    const rows = document.querySelector('tbody')?.querySelectorAll('tr');

    const values: IMeterHistoryValue[] = [];

    rows?.forEach(row => {
      const cells= row.querySelectorAll('td');
      const date = cells[0].innerText;
      const dateParts = date.split('-');

      values.push({
        date: {
          initial: date,
          year: Number(dateParts[0]),
          month: Number(dateParts[1]),
          day: Number(dateParts[2]),
        },
        type: cells[4].innerText,
        previousValue: Number(cells[6].innerText),
        currentValue: Number(cells[7].innerText)
      });
    });

    return values;
  }
}
