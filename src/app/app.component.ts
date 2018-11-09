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
    ['Account 1', ['', '1', 'account']],
    ['Account 2', ['', '2', 'account']],
    ['Account 3', ['', '3', 'account']],
    ['Account 4', ['', '4', 'account']],
    ['Account 5', ['', '5', 'account']],
    ['Account 6', ['', '6', 'account']],
    ['Account 1 ucc usage', ['', '1', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 2 ucc usage', ['', '2', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 2 uca usage', ['', '2', 'account', 'usage', 'details', 'uca', 'all']],
    ['Account 3 ucc usage', ['', '3', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 3 uca usage', ['', '3', 'account', 'usage', 'details', 'uca', 'all']],
    ['Account 4 ucc usage', ['', '4', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 4 uca usage', ['', '4', 'account', 'usage', 'details', 'uca', 'all']],
    ['Account 5 ucc usage', ['', '5', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 5 uca usage', ['', '5', 'account', 'usage', 'details', 'uca', 'all']],
    ['Account 6 ucc usage', ['', '6', 'account', 'usage', 'details', 'ucc', 'all']],
    ['Account 6 uca usage', ['', '6', 'account', 'usage', 'details', 'uca', 'all']],
    ['Account 6 uca usage 2018 Jan', ['', '6', 'account', 'usage', 'details', 'uca', 'JAN-2018']],
    ['Account 6 uca usage 2018 Feb', ['', '6', 'account', 'usage', 'details', 'uca', 'FEB-2018']],
  ];
}
