const arrival = new Date("2026-04-01T11:40:00+08:00");

const messages = {
  21: {
    audio: "audio/21.m4a",
    img: "images/21.jpg",
    cz: "Ahoj moje koalí ženuško, vím, že jsi ode mě chtěla slyšet hlasovku v Češtině, rozhodl jsem se, že ti ode dneška každý den, až do doby než se zase potkáme budu posílat jednu hlasovku. Celkem je to 21 dní. Už se nemůžu dočkat, strašně mi chybíš... Chci aby to co nejrychleji uteklo a doufám, že ti tohle pomůže se cítit blíž, i když jsme hodně daleko. Na konec bych chtěl zmínit jednu věc co na tobě miluju, je to tvůj smích, chybí mi chvíle kdy jsme se spolu smáli. Díky, že mě vždycky podporuješ, jsi nejlepší. Moc moc moc tě miluju, tvůj koalí manžel Rob.",
    en: "Hello, my dear koala wifey, I know you wanted to hear my voice in Czech, so I have decided that from today until we meet again, I will send you one voice message every day. That's 21 days in total. I can't wait, I miss you so much... I want this time to pass as quickly as possible, and I hope this will help you feel closer to me, even though we are far apart. Finally, I would like to mention one thing I love about you, and that is your laughter. I miss the moments when we laughed together. Thank you for always supporting me. You are the best. I love you very, very much, your koala husband, Rob."
  },
};

function daysRemaining() {
  let now = new Date();
  let diff = arrival - now;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function buildGrid() {
  const grid = document.getElementById("grid");
  const today = daysRemaining();

  for (let i = 21; i >= 1; i--) {
    let div = document.createElement("div");
    div.classList.add("day");
    div.innerHTML = i;

    if (i - 1 >= today) {
      div.classList.add("unlocked");
      div.onclick = () => openMessage(i);
    } else {
      div.classList.add("locked");
    }

    grid.appendChild(div);
  }
}

function openMessage(day) {
  let m = messages[day];
  if (!m) return;

  const firstMessageDate = new Date(arrival);
  firstMessageDate.setDate(firstMessageDate.getDate() - 20); // 21 days total
  const messageDate = new Date(firstMessageDate);
  messageDate.setDate(firstMessageDate.getDate() + (21 - day));

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = messageDate.toLocaleDateString("en-US", options);

  let imgHtml = m.img
    ? `<img src="${m.img}" alt="Day ${day}" style="max-width:100%; margin-bottom:15px;">`
    : "";

  document.getElementById("popupContent").innerHTML = `
<pre>
--------------------
Date: ${formattedDate}
--------------------
</pre>

${imgHtml}

<audio controls>
  <source src="${m.audio}" type="audio/mp4">
</audio>

<b>CZECH</b>
<p>${m.cz}</p>

<hr>

<b>ENGLISH</b>
<p>${m.en}</p>

<pre>
--------------------
i love you the most
</pre>
`;

  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function checkArrival() {
  if (daysRemaining() <= 0) {
    launchConfetti();
  }
}

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 5 + Math.random() * 5,
      speed: 2 + Math.random() * 3
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(update);
  }

  update();
}

function updateHeaderCountdown() {
  const header = document.getElementById("header");
  const now = new Date();
  const diff = arrival - now;

  if (diff <= 0) {
    header.textContent = `
-------------------------------
 LOVE TRANSMISSION SYSTEM v1.0
-------------------------------

0 days 0 hours 0 minutes
`;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  header.textContent = `
-------------------------------
 LOVE TRANSMISSION SYSTEM v1.0
-------------------------------

${days} days ${hours} hours ${minutes} minutes
`;
}

updateHeaderCountdown();
setInterval(updateHeaderCountdown, 60000);

buildGrid();
checkArrival();
