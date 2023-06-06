//@action : {type: 'ONECHANGE', result: articleData}

export const articleAction = (states, action) =>  {
    switch (action.type) {
        case 'ONECHANGE':
            return states.map((item) => {
                if(item.id === action.result.id){
                    return action.result
                }else{
                    return item
                }
            })
            break;

        case 'ALLCHANGE':
            return action.result
            break;
    
        default:
            return states
            break;
    }
}

//@states : {lang: 'fr'}
export const storageAction = (states, action) => {
    switch (action.type) {
        case 'LANGCHANGE':
            return{...states, lang: action.result}
            break;
    
        default:
            return states
            break;
    }
}