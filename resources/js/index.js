let getId = () => Math.random().toString(36).substring(2, 9);

let getAccordionItem = (title, id) => {
  return `
    <div class="accordion-item" id="card-${id}">
      <h2 class="accordion-header" id="heading-${id}">
       <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" >
         ${title}
       </button>
      </h2>
      <div id="collapse-${id}" class="collapse" aria-labelledby="heading-${id}" data-bs-parent="#accordionId">
      </div>
    </div>
    `;
};



let createCarouselOuter = (id, innerId) => {
  return  `
    <div id="carouselControls-${id}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner" id="${innerId}"> </div>
      <button class="carousel-control-prev car-rectangle-left" type="button" data-bs-target="#carouselControls-${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button> 
      <button class="carousel-control-next car-rectangle-right" type="button" data-bs-target="#carouselControls-${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;
};

let createCarouselItem = (id, active) => {
  return `<div class="carousel-item ${active ? "active" : ""}" id="${id}"> </div>`;
};

let createCard = (item) => {
  return `
    <div class="card d-block" ">
      <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}"  alt="...">
      <div class="card-body">
        <h5 class="card-title">${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
        <p  class="card-subtitle text-secondary">${item["pubDate"]}</p>
        <p  class="card-text">${item["description"]}</p>
        <a  href="${item["link"]}" class="stretched-link" target="_blank"></a>
      </div>
    </div>
    `;
};

let addContent = async () => {

  magazines.forEach(async (magazineUrl ,magazineIdx) => {
   
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(magazineUrl)}`
    );
    let data = await response.json();
  
   let accordionItemId = getId();
   let accordionItem = getAccordionItem(data.feed.title, accordionItemId);
  //  console.log(accordionItem)
   document.getElementById("accordionId").innerHTML += accordionItem;

   
   if(magazineIdx === 0){
    document.getElementById(`collapse-${accordionItemId}`).classList.add("show");
   }

   let carouselId = getId();
   let carouselInnerId = getId();
   const carousel = createCarouselOuter(carouselId , carouselInnerId);
   document.getElementById(`collapse-${accordionItemId}`).innerHTML = carousel;

    
    data.items.forEach((item,itemIdx) => {
      //generate card
      const card = createCard(item);
       //generate carousel item
      const carouselItemId = getId();
      const carouselItem   = createCarouselItem(carouselItemId, itemIdx === 0 );
      //appended carousel item
      document.getElementById(carouselInnerId).innerHTML += carouselItem;
      //appended card to carousel item
      document.getElementById(carouselItemId).innerHTML += card;
      });
  });
};
// add c

addContent(); 
