genRandStr = (length) => {
    let result = ""
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length
    for(let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

var itemsList = Array(100).fill().map(x => genRandStr(10))

domIdsObj = {containerId: "container", hiddenInputId: "hidden_input3"}
new CakewalkTags(domIdsObj, itemsList)