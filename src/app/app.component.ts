import { Component, OnInit } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-graphql-modular';
  countries: any[] = [];
  error: any;
  loading: boolean = true;

  constructor(private apollo: Apollo){}

  ngOnInit(): void {
    this.getOperation();
  }

  getOperation(){
    const Get_Request = gql `
      query{
        countries {
          name
        }
      }
    `;

    this.apollo.watchQuery({
      query: Get_Request
    }).valueChanges.subscribe(({ data, error}: any) => {
      this.loading = false;
      this.countries = data.countries;
      error = error;
    });
  }
}
