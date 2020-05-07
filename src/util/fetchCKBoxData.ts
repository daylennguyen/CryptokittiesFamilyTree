// https://api.ckbox.co/cattributes
// https://api.ckbox.co/kitties?id=

export async function fetchCattributes() {
    var response = await fetch("https://api.ckbox.co/cattributes")
    var json = await response.json()
    return json
}
export async function fetchKittyGenetics(props:{kittyId: number}) {
    var response = await fetch(`https://api.ckbox.co/kitties?id=${props.kittyId}`)
    var json = await response.json()
    return json
}

