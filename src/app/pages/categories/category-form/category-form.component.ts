import { Component, Injector} from '@angular/core';
import { Validators} from "@angular/forms"; 

import { BaseResourceFormComponent} from "../../../shared/components/base-resouce-form/base-resource-form.component"

import { Category } from "../shared/categoy.model";
import { CategoryService } from "../shared//category.service";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{

  category: Category = new Category();

  constructor(
    protected categoryService: CategoryService, protected injector: Injector) { 
      super(injector, new Category(), categoryService, Category.fromJson)
    }


  protected buildResourceForm(){
   this.resourceForm = this.formBuilder.group({
     id: [null],
     name: [null, [Validators.required, Validators.minLength(2)]],
     description : [null]
   })
    
  }

  protected creationPageTitle(): string{
    return"Cadastro de Nova Categoria";
  }

  protected editionPageTitle(): string{
    const categoryName = this.resource.name || "";

  return " Editando Categoria: " + categoryName;
  }

}
