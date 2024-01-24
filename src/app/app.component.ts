import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { User } from './models/user';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 })
export class AppComponent implements AfterViewInit {
  title = 'test-angular-sqlite-app';
  log: string = '** SQLite tests starting ** \n';
  userList: User[] = [];

  constructor(private storage: StorageService) {}

  async ngAfterViewInit() {
    try {
      // add some users
      await this.storage.addUser("Jones")
      this.log += '>>> user Jones has been added \n';
      await this.storage.addUser("Smith")
      this.log += '>>> user Smith has been added \n';
      await this.storage.addUser("Watson")
      this.log += '>>> user Watson has been added \n';

      // Update user with id = 2
      await this.storage.updateUserById('2',0);
      this.log += '>>> user Smith has been updated \n';

      // Delete user with id = 3
      await this.storage.deleteUserById('3');

      // Display the user's list
      this.storage.userState().pipe(
        switchMap(res => {
             if (res) {
                 return this.storage.fetchUsers();
             } else {
                 return of([]); // Return an empty array when res is false
             }
        })
        ).subscribe(data => {
          if (data.length > 0) {
             this.userList = data; // Update the user list when the data changes
             this.log += '## List of Users ## \n';
             for( const user of this.userList) {
              this.log += `> id: ${user.id} name: ${user.name} active: ${user.active} \n`;
             }
             this.log += '\n** SQLite tests ending successfully ** \n';
            } else {
              this.log += '\n** SQLite tests failed **\n';
            }
        });

    } catch (err) {
      this.log += '\n** SQLite tests failed **\n';
      throw new Error(`Error: ${err}`);
    }
  }
}
