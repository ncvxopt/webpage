// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = (theme) => {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}


let setTheme = (theme) =>  {
  transTheme();
  setHighlight(theme);

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if(document.getElementById('ellis_logo')) {
      var el = document.getElementById('ellis_logo');
      if (theme == 'light') {
        el.src = '/assets/img/logos/EUMLogoB-768x119.png';
      } else {
        el.src = '/assets/img/logos/EUMLogoW.png';
      }
    }

    if(document.getElementById('ellis_EPFL_logo')) {
      var el_epfl = document.getElementById('ellis_EPFL_logo');
      if (theme == 'light') {
        el_epfl.src = '/assets/img/logos/EPFL-Ellis-Lausanne-Unit-logo.png';
      } else {
        el_epfl.src = '/assets/img/logos/EPFL-Ellis-Lausanne-Unit-logoW.png';
      }
    }

  }
  else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
  
  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    })
  }
};

let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
}


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}


let initTheme = (theme) => {
  if (theme == null || theme == 'null') {
    const userPref = window.matchMedia;
    if (userPref && userPref('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
  }
  
  setTheme(theme);
}


initTheme(localStorage.getItem("theme"));
