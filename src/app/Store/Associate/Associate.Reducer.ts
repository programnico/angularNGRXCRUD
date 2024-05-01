import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.State";
import { addAssociateSuccess, deleteAssociateSuccess, getAssociateSuccess, loadAssociateFail, loadAssociateSuccess, openPopup, updateAssociateSuccess } from "./Associate.Action";

const _AssociateReducer = createReducer(AssociateState,

    on(loadAssociateSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),
    on(loadAssociateFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    }),
    on(addAssociateSuccess, (state, action) => {
        const _maxId=Math.max(...state.list.map(o=>o.id));
        const _newData = {...action.inputData}
        _newData.id = _maxId+1;
        return {
            ...state,
            list: [...state.list, _newData],
            errorMessage: ''
        }
    }),
    on(updateAssociateSuccess, (state, action) => {
        
        const _newData = state.list.map(o=>{
            return o.id === action.inputData.id?action.inputData: o
        })
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),
    on(deleteAssociateSuccess, (state, action) => {
        
        const _newData = state.list.filter(o=>o.id!==action.code);
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),
    on(getAssociateSuccess, (state, action) => {
        return {
            ...state,
            associateObj: action.obj,
            errorMessage: ''
        }
    }),
    on(openPopup, (state, action) => {
        return {
            ...state,
            associateObj: {
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                associategroup: "level1",
                status: true
            }
        }
    }),
)



export function AssociateReducer(state: any, action: any) {
    return _AssociateReducer(state, action);
}