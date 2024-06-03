import { Injectable } from "@angular/core";     
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root'

})
export class UserStoreService {
    
    private fullName$ = new BehaviorSubject<string>("");
    private role$ = new BehaviorSubject<string>("");
    private userId$ = new BehaviorSubject<number>(0);
    constructor() { }

    public getRoleFromStore(){
        return this.role$.asObservable();
    }

    public setRoleForStore(role:string){
        this.role$.next(role);
    }

    public getFullNameFromStore(){
        const fullName = this.fullName$.getValue(); // obtin valoarea direct din BehaviorSubject
    console.log('Full name from UserStoreService:', fullName);
        return this.fullName$.asObservable();
    }

    public setFullNameForStore(fullname: string){
        this.fullName$.next(fullname);
    }
    public getUserIdFromStore() {
        return this.userId$.asObservable(); 
      }
    
      public setUserIdForStore(userId: number) {
        this.userId$.next(userId); 
      }
}