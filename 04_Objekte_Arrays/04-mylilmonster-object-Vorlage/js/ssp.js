function schliesseSSP() {
    document.getElementById('ssp-dialog').style.display = 'none'
}

function oeffneSSP() {
    document.getElementById('ssp-dialog').style.display = 'block'
}

// 1: Schere, 2: Papier, 3: Stein
function spieleSSP(spielerWahl) {
    let computerWahl = Math.random() * 3
    computerWahl = Math.round(computerWahl + 0.5)
    let ergebnis = "Unentschieden!"

    //Unentschieden
    if (computerWahl == spielerWahl) {
        keksspeicher++;
    } else {
        //Wenn der Computer gewinnt ...
        if (computerWahl == 1 && spielerWahl == 2 ||
            computerWahl == 2 && spielerWahl == 3 ||
            computerWahl == 3 && spielerWahl == 1) {
            ergebnis = "Leider verloren... keine Kekse für dich"
        } else {
            // ... ansonsten gewinnt der Spieler
            ergebnis = "Super, gewonnen! 30 Kekse für dich!"
            keksspeicher += 30
        }
    }

    //Ausgabe
    document.getElementById('ssp-gegner-wahl').src = 'img/' + computerWahl + '.png'
    document.getElementById('ssp-spieler-wahl').src = 'img/' + spielerWahl + '.png'
    document.getElementById('ssp-ergebnis').innerText = ergebnis
}