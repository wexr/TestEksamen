var convert = require('./convert.js');

function penge(){
    let money = Number(prompt("Hvor mange danske penge skal veksles?"));
    let result = 0;

    result = (money * 7.46);
    alert(money + "kr tilsvarer " + result +"EUR");
}

function hentbruger() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {   
            console.log("virket")
            console.log("response" + this.response);
            //laver det om til object
            var obj = JSON.parse(this.response)
            
            var startappend = "<tr><th>id</th><th>fornavn</th><th>efternavn</th><th>kontornr</th><th>indestaende</th><th>rente</th><th>brugernavn</th><th>password</th></tr> "
            $('#liste').append($(startappend));

            for (let index = 0; index < obj.length; index++) {
                var start = '<tr>';

                var id = '<td>'+ obj[index].id+' </td>'
                var fornavn = '<td>'+ obj[index].fornavn+' </td>'
                var efternavn = '<td>'+ obj[index].efternavn+' </td>'
                var kontonr = '<td>'+ obj[index].kontonr+' </td>'
                var indestaende = '<td>'+ obj[index].indestaende+' </td>'
                var rente = '<td>'+ obj[index].rente+' </td>'
                var brugernavn = '<td>'+ obj[index].brugernavn+' </td>'
                var password = '<td>'+ obj[index].password+' </td>'

                var slut = '</tr>'

                var finallinje = start+id+fornavn+efternavn+kontonr+indestaende+rente+brugernavn+password+slut;
                $('#liste').append($(finallinje));

            }



        }
    }

    xmlhttp.open("GET", "http://localhost:8088/hent", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
}