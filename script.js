const targetDate = new Date("September 19, 2026 07:00:00").getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = targetDate - now;

  if(distance <= 0){
    document.getElementById("countdown").innerHTML = "<h3>The Championship has started!</h3>";
    return;
  }

  const days = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
  const seconds = Math.floor((distance%(1000*60))/1000);

  document.getElementById("days").innerText = String(days).padStart(2,"0");
  document.getElementById("hours").innerText = String(hours).padStart(2,"0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2,"0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2,"0");
}

updateCountdown();
setInterval(updateCountdown,1000);
