// Variables

const servers = {
  TvFutbol: ["https://tvfutbol.info/player/2/channel", "selected"],
};
const btnSettings = document.getElementById("settings-button");
const settings = document.getElementById("settings-container");
const chooseServer = document.getElementById("servers");
const interval = document.getElementById("interval");
const channels = document.getElementById("channel");
const btnSearch = document.getElementById("search");
const main = document.getElementById("main");
const portionChanels = 6;
const intervalChanels = document.querySelectorAll("#channel option");
intervalChanels[portionChanels].setAttribute("selected", "selected");
let choosedServer = null;
let currentServer = null;
let choosedInterval = interval.value;
let currentInterval = null;
let choosedChannels = channels.value;
let initialChannel = Number(choosedInterval) + Number(choosedChannels);
let currentInitialChannel = null;

// FUNCIONES

function openSettings () {
  btnSettings.style.opacity = 0;
  settings.classList.add("settings-container-open");
}

function loadServers() {
  chooseServer.innerHTML = "";
  for (let server in servers) {
    chooseServer.innerHTML += `
    <option value=${server} name="servers" class="select__option" ${servers[server][1]}>
    ${server}
    </option>
    `;
  }
  choosedServer = chooseServer.value;
}

function loadChannels() {
  window.scrollTo(0, 0);
  choosedServer = chooseServer.value;
  choosedInterval = interval.value;
  choosedChannels = channels.value;
  initialChannel = Number(choosedInterval) + Number(choosedChannels);
  if (
    currentServer !== choosedServer ||
    currentInterval !== choosedInterval ||
    currentInitialChannel !== initialChannel
  ) {
    currentServer = choosedServer;
    currentInterval = choosedInterval;
    currentInitialChannel = initialChannel;
    main.innerHTML = "";
    for (let i = initialChannel; i < initialChannel + 10; i++) {
      if (i === 0) {
        i++;
      }
      let url = servers[choosedServer][0].replace("channel", i);
      main.innerHTML += `
      <article class="channelcard">
          <h3 class="channelcard__title">Canal ${i}</h3>
          <iframe
            class="channelcard__url"
            width="380"
            height="214"
            src="${url}"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <div class="channelcard__footer">
            <a href="${url}" title ="Pantalla Completa" class="channelcard__link">
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
            </a>
          </div>
        </article>
      `;
    }
  }
}

// Inicio

loadServers();
loadChannels();
// listeners

btnSettings.addEventListener("click", openSettings);
btnSearch.addEventListener("click", loadChannels);
