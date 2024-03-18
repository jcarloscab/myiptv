/************ Variables *******************/

const servers = {
  TvFutbol: [
    {
      type: "channel",
      channelUrl: ["https://tvfutbol.info/player/2/channel"],
      defaultChannel: 60,
      finalChannel: 150,
    },
    "selected",
  ],
  DAZN: [
    {
      type: "url",
      channelUrl: [
        "https://pirlotvenvivo.me/tv/dazn1.php",
        "https://pirlotvenvivo.me/tv/dazn2.php",
        "https://pirlotvenvivo.me/tv/daznlaliga.php",
        "https://pirlotvenvivo.me/daznf1.php",
      ],
      defaultChannel: 1,
    },
  ],
  ESPN: [
    {
      type: "url",
      channelUrl: [
        "https://pirlotvenvivo.me/iframe/espnhdor.php",
        "https://pirlotvenvivo.me/iframe/espn2hdor.php",
        "https://pirlotvenvivo.me/iframe/espn3hdor.php",
        "https://pirlotvenvivo.me/iframe/espnextraor.php",
      ],
      defaultChannel: 1,
    },
  ],
  HBOMax: [
    {
      type: "url",
      channelUrl: [
        "https://pirlotvenvivo.me/iframe/hbomax.php",
        "https://pirlotvenvivo.me/iframe/hbomax2.php",
        "https://pirlotvenvivo.me/iframe/hbomax3.php",
        "https://pirlotvenvivo.me/iframe/hbomax4.php",
        "https://pirlotvenvivo.me/iframe/hbomax5.php",
        "https://pirlotvenvivo.me/iframe/hbomax6.php",
        "https://pirlotvenvivo.me/iframe/hbomax7.php",
        "https://pirlotvenvivo.me/iframe/hbomax8.php",
      ],
      defaultChannel: 1,
    },
  ],
};

const btnSettings = document.getElementById("settings-button");
const btnSettingsUp = document.getElementById("settings-container-button");
const settings = document.getElementById("settings-container");
const serverSelect = document.getElementById("servers");
const btnSearch = document.getElementById("search");
const main = document.getElementById("main");
const initialChannel = document.getElementById("initial-channel");
const rangeChannel = document.getElementById("channel-range");
const textFinalChannel = document.getElementById("text-final-channel");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
let selectedServer;

/********************** FUNCIONES *****************************/

function openSettings() {
  btnSettings.style.opacity = 0;
  settings.classList.add("settings-container-open");
}

function closeSettings() {
  settings.classList.remove("settings-container-open");
  btnSettings.style.opacity = 1;
}

function getServers(fnNewServer) {
  serverSelect.innerHTML = "";
  for (let server in servers) {
    serverSelect.innerHTML += `
    <option value=${server} name="servers" class="select__option" ${servers[server][1]}>
    ${server}
    </option>
    `;
  }
  selectedServer = serverSelect.value;
  // rellenamos el intervalo de canales y el canal por defecto en el campo de seleccion de canales
  fnNewServer(servers[selectedServer][0], setNewInitChannel, loadChannels);
}

function loadNewServer(server, fnNewChannel, fnChannels) {
  if (server.type == "channel") {
    textFinalChannel.textContent = server.finalChannel;
    initialChannel.setAttribute("max", server.finalChannel);
    rangeChannel.setAttribute("max", server.finalChannel);
  } else {
    textFinalChannel.textContent = server.channelUrl.length;
    initialChannel.setAttribute("max", server.channelUrl.length);
    rangeChannel.setAttribute("max", server.channelUrl.length);
  }
  fnNewChannel(server.defaultChannel);
  fnChannels(server, initialChannel.value);
}

function setNewInitChannel(newChannel) {
  initialChannel.value = newChannel;
  rangeChannel.value = newChannel;
}

function loadChannels(server, channel) {}
// function loadChannels(server, channel) {
//   window.scrollTo(0, 0);
//   selectedServer = serverSelect.value;
//   choosedInterval = interval.value;
//   choosedChannels = channels.value;
//   initialChannel = Number(choosedInterval) + Number(choosedChannels);
//   if (
//     currentServer !== selectedServer ||
//     currentInterval !== choosedInterval ||
//     currentInitialChannel !== initialChannel
//   ) {
//     currentServer = selectedServer;
//     currentInterval = choosedInterval;
//     currentInitialChannel = initialChannel;
//     main.innerHTML = "";
//     for (let i = initialChannel; i < initialChannel + 10; i++) {
//       if (i === 0) {
//         i++;
//       }
//       let url = servers[selectedServer][0].replace("channel", i);
//       main.innerHTML += `
//       <article class="channelcard">
//           <h3 class="channelcard__title">Canal ${i}</h3>
//           <iframe
//             class="channelcard__url"
//             width="380"
//             height="214"
//             src="${url}"
//             frameborder="0"
//             allowfullscreen
//           ></iframe>
//           <div class="channelcard__footer">
//             <a href="${url}" title ="Pantalla Completa" class="channelcard__link">
//             <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
//             </a>
//           </div>
//         </article>
//       `;
//     }
//   }
// }

// Inicio

getServers(loadNewServer);

/****************listeners ******************************/

btnSettings.addEventListener("click", openSettings);

btnSettingsUp.addEventListener("click", closeSettings);

btnSearch.addEventListener("click", () => {
  loadChannels(servers[selectedServer][0], initialChannel.value);
});

rangeChannel.addEventListener("mousemove", () =>
  setNewInitChannel(rangeChannel.value)
);

initialChannel.addEventListener("change", () =>
  setNewInitChannel(initialChannel.value)
);

serverSelect.addEventListener("change", () => {
  selectedServer = serverSelect.value;
  loadNewServer(servers[selectedServer][0], setNewInitChannel, loadChannels);
});

// aparicion de botones generales
main.addEventListener("mousemove", () => {
  if (!prev.classList.contains("prev--show")) {
    btnPrev.classList.add("prev--show");
    btnNext.classList.add("next--show");
    btnSettings.classList.add("settings-button--show");
    setTimeout(() => {
      btnPrev.classList.remove("prev--show");
      btnNext.classList.remove("next--show");
      btnSettings.classList.remove("settings-button--show");
    }, 3000);
  }
});
