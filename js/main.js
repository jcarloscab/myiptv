/************ Variables *******************/

const servers = {
  TvFutbol: [
    {
      type: "channel",
      channelUrl: ["https://tvfutbol.info/player/3/channel"],
      defaultChannel: 60,
      finalChannel: 150,
    },
    "selected",
  ],
  DAZN: [
    {
      type: "url",
      channelUrl: [
        {
          url: "https://pirlotvenvivo.me/tv/dazn1.php",
          channel: "DAZN 1",
        },
        {
          url: "https://pirlotvenvivo.me/tv/dazn2.php",
          channel: "DAZN 2",
        },
        {
          url: "https://pirlotvenvivo.me/tv/daznlaliga.php",
          channel: "DAZN Liga",
        },
        {
          url: "https://pirlotvenvivo.me/daznf1.php",
          channel: "DAZN F1",
        },
      ],
      defaultChannel: 1,
    },
  ],
  ESPN: [
    {
      type: "url",
      channelUrl: [
        {
          url: "https://pirlotvenvivo.me/iframe/espnhdor.php",
          channel: "ESPN",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/espn2hdor.php",
          channel: "ESPN 2",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/espn3hdor.php",
          channel: "ESPN 3",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/espnextraor.php",
          channel: "ESPN EXTRA",
        },
      ],
      defaultChannel: 1,
    },
  ],
  HBOMax: [
    {
      type: "url",
      channelUrl: [
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax.php",
          channel: "HBOMax",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax2.php",
          channel: "HBOMax 2",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax3.php",
          channel: "HBOMax 3",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax4.php",
          channel: "HBOMax 4",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax5.php",
          channel: "HBOMax 5",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax6.php",
          channel: "HBOMax 6",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax7.php",
          channel: "HBOMax 7",
        },
        {
          url: "https://pirlotvenvivo.me/iframe/hbomax8.php",
          channel: "HBOMax 8",
        },
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
const initialChannel = document.getElementById("initial-channel");
const rangeChannel = document.getElementById("channel-range");
const channelsPanel = document.getElementById("channels-panel");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const textFinalChannel = document.getElementById("text-final-channel");
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
  fnChannels(
    server,
    Number(initialChannel.value),
    setNewInitChannel,
    showChannel
  );
}

function setNewInitChannel(newChannel) {
  initialChannel.value = newChannel;
  rangeChannel.value = newChannel;
}

function showChannel(url, title) {
  channelsPanel.innerHTML += `<article class="channelcard">
    <iframe
      class="channelcard__url"
      width="100%"
      height="100%"
      src="${url}"
      frameborder="0"
      allow="encrypted-media"
      allowfullscreen
    >
    </iframe>
    <div class="channelcard__pannel">
      <h3 class="channelcard__title">${title}</h3>
      <a
        href="${url}"
        title="Pantalla Completa"
        class="channelcard__link"
      >
        <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
      </a>
    </div>
  </article>`;
}

function loadChannels(server, channel, fnInitChannel, fnShowChannel) {
  let finalChannel = 0;
  let title = "";
  channelsPanel.innerHTML = "";
  if (innerWidth <= 425) {
    finalChannel = channel + 1;
  } else {
    finalChannel = channel + 3;
  }
  // si estamos al principio de la lista ocultamos el boton prev
  if (channel == 1) {
    btnPrev.classList.add("next--hidden");
  } else {
    btnPrev.classList.remove("next--hidden");
  }
  // comprobamos si el servidor muestra los canales por numero o por url
  if (server.type == "channel") {
    // comprobamos que el canal final no se exceda del total de canales del servidor
    if (finalChannel > server.finalChannel) {
      finalChannel = server.finalChannel;
      if (innerWidth <= 425) {
        channel = finalChannel - 1;
      } else {
        channel = finalChannel - 3;
      }
      fnInitChannel(channel);
    }
    // si estamos al final de la lista ocultamos el boton next
    if (finalChannel == server.finalChannel) {
      btnNext.classList.add("next--hidden");
    } else {
      btnNext.classList.remove("next--hidden");
    }
    // mostramos los canales
    for (let i = channel; i <= finalChannel; i++) {
      let url = server.channelUrl[0].replace("channel", i);
      title = `Canal ${i}`;
      fnShowChannel(url, title);
    }
  } else {
    if (finalChannel > server.channelUrl.length) {
      finalChannel = server.channelUrl.length;
      if (innerWidth <= 425) {
        channel = finalChannel - 1;
      } else {
        channel = finalChannel - 3;
      }
      fnInitChannel(channel);
    }
    // si estamos al final de la lista ocultamos el boton next
    if (finalChannel == server.channelUrl.length) {
      btnNext.classList.add("next--hidden");
    } else {
      btnNext.classList.remove("next--hidden");
    }
    // mostramos los canales
    for (let i = channel - 1; i <= finalChannel - 1; i++) {
      let url = server.channelUrl[i].url;
      title = `${server.channelUrl[i].channel}`;
      fnShowChannel(url, title);
    }
  }
}

getServers(loadNewServer);

/****************listeners ******************************/

btnSettings.addEventListener("click", openSettings);

btnSettingsUp.addEventListener("click", closeSettings);

btnSearch.addEventListener("click", () => {
  loadChannels(
    servers[selectedServer][0],
    Number(initialChannel.value),
    setNewInitChannel,
    showChannel
  );
  closeSettings();
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
channelsPanel.addEventListener("mousemove", () => {
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

btnPrev.addEventListener("click", () => {
  let channel = 0;
  if (innerWidth <= 425) {
    channel = Number(initialChannel.value) - 2;
  } else {
    channel = Number(initialChannel.value) - 4;
  }

  if (channel < 1) {
    channel = 1;
  }

  setNewInitChannel(channel);
  loadChannels(
    servers[selectedServer][0],
    Number(initialChannel.value),
    setNewInitChannel,
    showChannel
  );
});

btnNext.addEventListener("click", () => {
  let channel = 0;
  if (innerWidth <= 425) {
    channel = Number(initialChannel.value) + 2;
  } else {
    channel = Number(initialChannel.value) + 4;
  }
  setNewInitChannel(channel);
  loadChannels(
    servers[selectedServer][0],
    Number(initialChannel.value),
    setNewInitChannel,
    showChannel
  );
});
