// 0: nicht belegt, 1: Computer wählt, 2: Spieler wählt
var tttboard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

//Anzahl der Züge zählen
var tttzuege = 0

function oeffneTTT() {
    document.getElementById('ttt-dialog').style.display = 'block'
}

function schliesseTTT() {
    document.getElementById('ttt-dialog').style.display = 'none'

    //Feld zurücksetzen
    tttboard = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    tttboard.forEach(resetFeldTTT)
    document.getElementById('ttt-ergebnis').innerText = ""
    tttzuege = 0
}

function resetFeldTTT(item, index) {
    let feld = document.getElementById('ttt' + index)
    feld.setAttribute('aria-label', '')
    feld.disabled = false
}

function spieleTTT(feldnr) {
    //Feld markieren und deaktivieren
    tttboard[feldnr] = 2
    let feldbtn = document.getElementById('ttt' + feldnr)
    feldbtn.setAttribute('aria-label', 'x')
    feldbtn.disabled = true
    tttzuege++

    let gewinner = pruefeGewinnerTTT()

    if (gewinner == 2) {
        //Spieler gewonnen
        document.getElementById('ttt-ergebnis').innerText = "Super, gewonnen! 30 Kekse für dich!"
        keksspeicher += 30
        deaktiviereTTT()
    } else {
        //Computer an der Reihe
        if (tttzuege < 9) {
            computerZugTTT()
            gewinner = pruefeGewinnerTTT()
            if (gewinner == 1) {
                //Computer gewonnen
                document.getElementById('ttt-ergebnis').innerText = "Leider verloren... keine Kekse für dich"
                deaktiviereTTT()
            }
        } else {
            keksspeicher++
            document.getElementById('ttt-ergebnis').innerText = "Unentschieden!"
        }
    }
}

function computerZugTTT() {
    let cfeldnr = Math.random() * 8
    cfeldnr = Math.round(cfeldnr)

    if (tttboard[cfeldnr] != 0) {
        //Zug wiederholen, wenn Feld schon belegt
        computerZugTTT()
    } else {
        tttboard[cfeldnr] = 1
        let feldbtn = document.getElementById('ttt' + cfeldnr)
        feldbtn.setAttribute('aria-label', 'o')
        feldbtn.disabled = true
        tttzuege++
    }
}

function pruefeGewinnerTTT() {

    //3 senkrecht
    if (tttboard[0] != 0 && tttboard[0] == tttboard[3] && tttboard[0] == tttboard[6]) {
        return tttboard[0]
    }

    if (tttboard[1] != 0 && tttboard[1] == tttboard[4] && tttboard[1] == tttboard[7]) {
        return tttboard[1]
    }

    if (tttboard[2] != 0 && tttboard[2] == tttboard[5] && tttboard[2] == tttboard[8]) {
        return tttboard[2]
    }

    //3 waagrecht
    if (tttboard[0] != 0 && tttboard[0] == tttboard[1] && tttboard[0] == tttboard[2]) {
        return tttboard[0]
    }

    if (tttboard[3] != 0 && tttboard[3] == tttboard[4] && tttboard[3] == tttboard[5]) {
        return tttboard[3]
    }

    if (tttboard[6] != 0 && tttboard[6] == tttboard[7] && tttboard[6] == tttboard[8]) {
        return tttboard[6]
    }

    //diagonal rechts-oben nach links-unten
    if (tttboard[2] != 0 && tttboard[2] == tttboard[4] && tttboard[2] == tttboard[6]) {
        return tttboard[2]
    }

    //diagonal links-oben nach links-unten
    if (tttboard[0] != 0 && tttboard[0] == tttboard[4] && tttboard[0] == tttboard[8]) {
        return tttboard[0]
    }

    return null;
}

function deaktiviereTTT() {
    let btns = document.querySelectorAll('#ttt-board button')
    btns.forEach(deaktiviereBtnTTT)
}

function deaktiviereBtnTTT(item) {
    item.disabled = true
}