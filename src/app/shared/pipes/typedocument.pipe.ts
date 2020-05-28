import {Pipe, PipeTransform} from '@angular/core';
import {Typedocument} from '../../pages/typedocument/typedocument';

@Pipe({
    name: 'typedocument'
})
export class TypedocumentPipe implements PipeTransform {

    transform(typedocuments: Typedocument[], source: string): any {
        return typedocuments.filter(td => td.source === source);
    }
}
