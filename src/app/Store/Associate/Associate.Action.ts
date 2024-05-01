import { createAction, props } from "@ngrx/store";
import { Associates } from "../Model/Associate.model";

export const LOAD_ASSOCIATE = '[associate page] load associate'
export const LOAD_ASSOCIATE_SUCCESS = '[associate page] load associate success'
export const LOAD_ASSOCIATE_FAIL = '[associate page] load associate fail'

export const ADD_ASSOCIATE = '[associate page] add associate'
export const ADD_ASSOCIATE_SUCCESS = '[associate page] add associate success'

export const UPDATE_ASSOCIATE = '[associate page] update associate'
export const UPDATE_ASSOCIATE_SUCCESS = '[associate page] update associate success'

export const DELETE_ASSOCIATE = '[associate page] delete associate'
export const DELETE_ASSOCIATE_SUCCESS = '[associate page] delete associate success'

export const GET_ASSOCIATE = '[associate page] get associate'
export const GET_ASSOCIATE_SUCCESS = '[associate page] get associate success'

export const OPEN_POPUP = '[associate page]open popup'


export const loadAssociate = createAction(LOAD_ASSOCIATE)
export const loadAssociateSuccess = createAction(LOAD_ASSOCIATE_SUCCESS, props<{list: Associates[]}>())
export const loadAssociateFail = createAction(LOAD_ASSOCIATE_FAIL, props<{errorMessage: string}>())

export const addAssociate = createAction(ADD_ASSOCIATE, props<{inputData: Associates}>())
export const addAssociateSuccess = createAction(ADD_ASSOCIATE_SUCCESS, props<{inputData: Associates}>())

export const updateAssociate = createAction(UPDATE_ASSOCIATE, props<{inputData: Associates}>())
export const updateAssociateSuccess = createAction(UPDATE_ASSOCIATE_SUCCESS, props<{inputData: Associates}>())

export const deleteAssociate = createAction(DELETE_ASSOCIATE, props<{code: number}>())
export const deleteAssociateSuccess = createAction(DELETE_ASSOCIATE_SUCCESS, props<{code: number}>())

export const getAssociate = createAction(GET_ASSOCIATE, props<{id: number}>())
export const getAssociateSuccess = createAction(GET_ASSOCIATE_SUCCESS, props<{obj: Associates}>())

export const openPopup = createAction(OPEN_POPUP)