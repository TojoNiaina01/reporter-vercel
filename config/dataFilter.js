/**------------------------------------------------------------------------
 * ?                                DataFilter
 * @data             :  ilay tableau ho filtre-na
 * @type             :  ilay mo-clé hi-filtre-na anazy (ohatra oe : id)
 * @numberToSlice    :  ny isan'ny portion an'ilay tableau ilaina
 *------------------------------------------------------------------------**/



export const dataFilter = (data, type, numberToSlice) => {
    const result = []
    data.forEach(element => {
        if(!result.find(item => item[type] === element[type])){
            result.push(element)
        }
    })

    if(result.length > numberToSlice){
        return result.slice(0, numberToSlice)
    }else{
        return result
    }
}