import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addAssociate, addAssociateSuccess, deleteAssociate, deleteAssociateSuccess, getAssociate, getAssociateSuccess, loadAssociate, loadAssociateFail, loadAssociateSuccess, updateAssociate, updateAssociateSuccess } from "./Associate.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showAlert } from "../Common/App.Action";

@Injectable()
export class AssociateEffects {
    constructor(private action$: Actions, private service: AssociateService) {

    }

    _loadAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(loadAssociate),
            exhaustMap((action) => {
                return this.service.getAll().pipe(
                    map((data) => {
                        return loadAssociateSuccess({ list: data })
                    }),
                    catchError((_error) => of(loadAssociateFail({ errorMessage: _error.message })))
                )
            })
        )
    )

    _addAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(addAssociate),
            switchMap((action) => {
                return this.service.create(action.inputData).pipe(
                    switchMap((data) => {
                        return of(addAssociateSuccess({ inputData: action.inputData }),
                        showAlert({message: 'Created successfully.', resultType:'pass'}))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to create associate', resultType: 'fail' })))
                    )
            })
        )
    )

    _getAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(getAssociate),
            exhaustMap((action) => {
                return this.service.getByCode(action.id).pipe(
                    map((data) => {
                        return getAssociateSuccess({ obj: data })
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to fetch data' + _error.message, resultType: 'fail' })))
                )
            })
        )
    )

    
    _updateAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(updateAssociate),
            switchMap((action) => {
                return this.service.update(action.inputData).pipe(
                    switchMap((data) => {
                        return of(updateAssociateSuccess({ inputData: action.inputData }),
                        showAlert({message: 'Updated successfully.', resultType:'pass'}))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to update associate', resultType: 'fail' })))
                    )
            })
        )
    )
    
    _deleteAssociate = createEffect(() =>
        this.action$.pipe(
            ofType(deleteAssociate),
            switchMap((action) => {
                return this.service.delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteAssociateSuccess({ code: action.code }),
                        showAlert({message: 'Delete successfully.', resultType:'pass'}))
                    }),
                    catchError((_error) => of(showAlert({ message: 'Failed to delete associate', resultType: 'fail' })))
                    )
            })
        )
    )
}