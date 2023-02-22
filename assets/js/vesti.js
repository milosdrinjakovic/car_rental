dohvatiVesti();

function readMore(id){
    let paragraph = document.getElementById('vest' + id);
    let dugme = document.getElementById('readMore' + id);
    if(paragraph.classList.contains('clamp')) {
        paragraph.classList.remove('clamp');
        dugme.value = 'Prikazi manje';
    } else{
        paragraph.classList.add('clamp');
        dugme.value = 'Prikazi vise';
    }
}

function dohvatiVesti() {
    $.ajax({
        url: 'assets/data/news.json',
        method: 'GET',
        type: 'json',
        success: function (data) {
            let ispis = '';
            for (vest of data) {
                ispis += `<div class="module line-clamp col-lg-4 col-md-6 mb-4 single-blog">
                <div class="thumb">
                    <img class="img-fluid" src="${vest.image}" alt="">
                </div>
                <p class="date">${vest.date}</p>
                <a href="blog-single.html"><h4>${vest.title}</h4></a>
                <p class="clamp" id="vest${vest.id}">
                    ${vest.text}
                </p>
                <input type="button" id="readMore${vest.id}" onclick="readMore(${vest.id})" value="Prikazi vise"/>
            </div>`
            }
            document.getElementById('vesti-ispis').innerHTML = ispis;
        },
        complete: function(data) {
            document.getElementById('vesti-loading').style.display = 'none'
        }
    })
}

