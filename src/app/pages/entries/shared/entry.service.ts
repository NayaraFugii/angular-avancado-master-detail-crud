import { Injectable, Injector } from '@angular/core';

import { BaseResourceService}  from "../../../shared/services/base-resource.service"
import { CategoryService} from "../../categories/shared/category.service";

import {Observable} from "rxjs";
import {flatMap} from "rxjs/operators";

import { Entry } from "./entry.models";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> { 

  constructor(protected injector: Injector,private CategoryService: CategoryService) { 

    super("api/entries", injector, Entry.fromJson);
  }
  

  create(entry: Entry): Observable<Entry>{
       return this.CategoryService.getById(entry.categoryId).pipe(
        flatMap(category => {
          entry.category = category;

          return super.create(entry)
        })
      )  
  }

  update(entry: Entry): Observable<Entry>{

    return this.CategoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.update(entry)
      })
    )    
  }

  
}





