function generateRandomText() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-';
  const length = getLengthOfString();
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getLengthOfString() {
  //const screenWidth = window.screen.width;
  const screenWidth =  window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  const maxLengthPercentage = 0.50; 
  const maxLength = (screenWidth * maxLengthPercentage) / 100;
  const length = Math.floor(10 * maxLength) + 1;

  return length;
}

function injectStringToOther(original, pasted, place) {
  return original.slice(0, place) + pasted + original.slice(place + pasted.length);
}

function transitionToPage(href) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function() { 
      window.location.href = href
  }, 500)
}


let SCROLL_SPEED = 1500;

document.addEventListener('DOMContentLoaded', () => {
  let IS_LINKS_LOADED = false;

  const linksData = [
    // POSITION / LENGTH; CALCULATION BY RECOMMENDED POS / 80;
    { row: 1, position: 0.1, url: './pages/about-me.html', text: 'MIROSLAW', short: 'MIRA' },
    { row: 5, position: 0.1875, url: './pages/about-me.html', text: 'FULLSTACK-DEVELOPER', short: 'FULLSTACK' },
    { row: 8, position: 0.25, url: './pages/contact-me.html', text: 'CONTACT-INFO', short: 'CONTACT' }
  ];

  setTimeout(() => { 
    IS_LINKS_LOADED = true;
  }, 4500);

  const matrixRoot = document.querySelector('.matrix-root');

  const screenHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  const numParagraphs = screenHeight * 0.0375;

  for (let i = 0; i < numParagraphs; i++) {
    let paragraph = document.createElement('p');
    paragraph.classList.add('matrix-text');
    paragraph.classList.add('container');
    matrixRoot.appendChild(paragraph);
  }

  setTimeout(() => {
    const paragraphs = document.querySelectorAll('.matrix-text');
    paragraphs.forEach((paragraph, index) => {
      setTimeout(() => {
        paragraph.classList.add('fadeIn');
      }, 150 * index);
    });
  }, 1000);

  setTimeout(async () => {
    const footer = document.getElementsByClassName('footer-down');
    for(let i = 0; i < footer.length;i++) {
      footer[i].classList.add('fadeIn');
    }
  }, 150*numParagraphs);

  setInterval(async () => {
    let matrixes = document.getElementsByClassName('matrix-text');
    const ENTROPY_COEF = 500;

    for(let i = 0; i < matrixes.length; i++) {
      let line = matrixes[i];

      let input = `${generateRandomText()}`;

      if(IS_LINKS_LOADED) {
        console.log(linksData);
        for(let link of linksData) {
          if(i == link.row) {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.classList.add('matrix-hyperlink', 'glow');

            const length = getLengthOfString();

            const place = Math.ceil(length*link.position);

            let newTextContent = input.slice(0, place) + linkElement.outerHTML + input.slice(place + link.text.length);

            if(injectStringToOther(input, link.text, place).length > getLengthOfString()) {
              linkElement.textContent = link.short;
              newTextContent = input.slice(0, place) + linkElement.outerHTML + input.slice(place + link.short.length);
            }
            else {
              linkElement.textContent = link.text;
              newTextContent = input.slice(0, place) + linkElement.outerHTML + input.slice(place + link.text.length);
            }

            input = newTextContent;
          } 
        }
      }

      if(Math.random() > 0.5)
        line.innerHTML = input;
      else
        setTimeout(async () => {
          line.innerHTML = input;
        }, Math.random() * ENTROPY_COEF);
    }
  }, 1500);
});

document.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  SCROLL_SPEED = 1000 - scrollTop * 10;

  if (SCROLL_SPEED < 100)
    SCROLL_SPEED = 100;
});

document.addEventListener('scrollend', () => {
  SCROLL_SPEED = 1500;
});