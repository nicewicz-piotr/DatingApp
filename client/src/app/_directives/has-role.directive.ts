import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit {
  user: User;
  @Input() appHasRole: string[];

  constructor(private viewContainerRef: ViewContainerRef, private templeateRef: 
    TemplateRef<any>, private accountService: AccountService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
     }

  ngOnInit(): void {
    //clear view if no roles
    if(!this.user?.roles || this.user == null){
      this.viewContainerRef.clear();
      return;
    }
    //show if any role
    if(this.user?.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templeateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
