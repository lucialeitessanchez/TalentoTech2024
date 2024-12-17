

var cardContainer=document.getElementById('card');



for(var i=1; i<=18; i++) {
    var cardDiv=document.createElement('div');

cardDiv.className='col-md-3';

cardDiv.innerHTML=`
<div class="card mt-8">
<img src="https://picsum.photos/300/200?random=${i}" class="card-img-top" >
<div class="card-body">
  <h5 class="card-title">Card title: ${i}</h5>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>
`;

cardContainer.appendChild(cardDiv); //va agrando hijos al contenedor de cards
}
