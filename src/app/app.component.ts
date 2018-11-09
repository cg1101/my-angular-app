import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'app';
  urls = [
    ['Home', ['']],
    ['#1', ['', '1', 'account']],
    ['#2', ['', '2', 'account']],
    ['#3', ['', '3', 'account']],
    ['#4', ['', '4', 'account']],
    ['#5', ['', '5', 'account']],
    ['#6', ['', '6', 'account']],
    ['#1 ucc', ['', '1', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#2 ucc', ['', '2', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#2 uca', ['', '2', 'account', 'usage', 'details', 'uca', 'all']],
    ['#3 ucc', ['', '3', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#3 uca', ['', '3', 'account', 'usage', 'details', 'uca', 'all']],
    ['#4 ucc', ['', '4', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#4 uca', ['', '4', 'account', 'usage', 'details', 'uca', 'all']],
    ['#5 ucc', ['', '5', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#5 uca', ['', '5', 'account', 'usage', 'details', 'uca', 'all']],
    ['#6 ucc', ['', '6', 'account', 'usage', 'details', 'ucc', 'all']],
    ['#6 uca', ['', '6', 'account', 'usage', 'details', 'uca', 'all']],
    ['#6 uca 2018 Jan', ['', '6', 'account', 'usage', 'details', 'uca', 'JAN-2018']],
    ['#6 uca 2018 Feb', ['', '6', 'account', 'usage', 'details', 'uca', 'FEB-2018']],
  ];
}
