const clean = (string) => {
  return string.replace(/ - Topic/g, "").replace(/VEVO/g, "");
};
const fetchSongs = async () => {
  // Get the top 3 songs from my youtube playlist
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=PLAVz83Xtm7v2SeBdjrAFBNCwYIft8ZdVl&key=AIzaSyD_-SE7VcOCfum3vfbqGn3iypOtmnaJJj0";
  const response = await fetch(url);
  const data = await response.json();

  // Map the data to a more readable format
  const videos = data.items.map((item) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    author: clean(item.snippet.videoOwnerChannelTitle),
    thumbnail: item.snippet.thumbnails.high.url,
  }));

  // Remove the loading text and Render the data
  const list = document.getElementById("songs");
  list.innerHTML = "";

  videos.forEach((video) => {
    const li = document.createElement("li");
    const title = document.createElement("h4");
    const a = document.createElement("a");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const imageContainer = document.createElement("div");
    const img = document.createElement("img");

    imageContainer.classList.add("thumb-container");
    div.classList.add("song-info");

    img.src = video.thumbnail;
    img.alt = video.title;

    a.href = video.url;
    a.target = "_blank";
    a.rel = "noreferrer";

    title.innerText = video.title;

    p.innerText = ` by ${video.author}`;

    imageContainer.appendChild(img);

    div.appendChild(title);
    div.appendChild(p);

    a.appendChild(imageContainer);
    a.appendChild(div);

    li.appendChild(a);

    list.appendChild(li);
  });
};

const nav = document.querySelector("#nav");
const container = document.querySelector("main");
const views = container.querySelectorAll("section");

const clearClasses = (view) => {
  view.classList.remove("slide-in-left");
  view.classList.remove("slide-in-right");
  view.classList.remove("slide-out-left");
  view.classList.remove("slide-out-right");
};

const getViewState = () => {
  const hash = (window.location.hash = window.location.hash);
  if (hash.length !== 0) {
    const children = Array.from(nav.children);
    children.forEach((c) => {
      c.removeAttribute("data-active");
      if (c.dataset.value === hash.slice(1)) {
        c.setAttribute("data-active", true);
      }
    });
    views.forEach((v) => {
      if (v.id === hash.slice(1)) {
        v.style.display = "block";
      } else {
        v.style.display = "none";
      }
    });
  }
};

const switchViewState = (prevIndex, view, rtl) => {
  window.history.replaceState(null, null, `#${view}`);

  const prevView = views[prevIndex];

  if (prevView.id === view) {
    return;
  }

  views.forEach((v) => {
    clearClasses(v);
    prevView.classList.add(rtl ? "slide-out-right" : "slide-out-left");
    if (v.id === view) {
      setTimeout(() => {
        v.style.display = "block";
        v.classList.add(rtl ? "slide-in-left" : "slide-in-right");
      }, 200);
    } else if (v.id !== prevView.id) {
      v.style.display = "none";
    } else {
      setTimeout(() => {
        v.style.display = "none";
      }, 200);
    }
  });
};

for (const child of nav.children) {
  const children = Array.from(nav.children);
  const index = children.indexOf(child);
  child.addEventListener("click", () => {
    const currentActiveIndex = children.findIndex((c) => c.dataset.active);
    child.setAttribute("data-active", true);

    const value = child.dataset.value;
    switchViewState(currentActiveIndex, value, index < currentActiveIndex);

    for (const sibling of child.parentElement.children) {
      if (sibling !== child) {
        sibling.removeAttribute("data-active");
      }
    }
  });
}

fetchSongs();
getViewState();
