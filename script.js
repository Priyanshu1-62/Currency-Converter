const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const selects=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");

const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newSrc;
}
const UpdateAmount = async () =>{
    let myamount=document.querySelector(".amount input");
    let amount=myamount.value;
    if(amount==="" || amount<1){
        amount=1;
        myamount.value=1;
    }

    let url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let finalamount=rate * amount;
    msg.innerText=`${amount} ${" "} ${fromCurr.value} = ${finalamount} ${" "} ${toCurr.value}`;
}

window.addEventListener("load", () =>{UpdateAmount();});

for(let aselect of selects){

    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.value=currCode;
        newOption.innerText=currCode;
        if(aselect.name === "from" && currCode === "USD") newOption.selected="selected";
        if(aselect.name==="to" && currCode==="INR") newOption.selected="selected";
        aselect.append(newOption);
    }

    aselect.addEventListener("change", (e) =>{
        let element=e.target;
        updateFlag(element);
    });
}

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    UpdateAmount();
});
