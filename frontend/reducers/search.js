export default function (search=[], action) {
    if (action.type === 'saveSearchResto') {
        var searchCopy = [...search, {adresse: action.adresse, date: action.date, heure: action.heure}, action.filter];

        // console.log(JSON.stringify(searchCopy))
        // console.log(searchCopy)


        return searchCopy;
    } else {
        return search;
    }
}