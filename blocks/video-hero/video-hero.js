export default async function decorate(block) {
  const videoLinkElement = block.querySelector('a');
  const videoLink = videoLinkElement.href;

  const videoTitleElement = block.querySelector('h6');
  const videoTitle = videoTitleElement.textContent;

  const videoSubtitleElement = block.querySelector('h2');
  const videoSubtitle = videoSubtitleElement.textContent;

  block.querySelector(':scope > div:first-of-type').remove();

  const range = document.createRange();
  function render(html) {
    return range.createContextualFragment(html);
  }

  function scrollToSection(event) {
    event.preventDefault();
    window.scrollBy({ top: 850, behavior: 'smooth' });
  }

  function createHeroHtml() {
    return render(/* HTML */ `
      <div class="video-hero-container">
        <video autoplay muted loop id="myVideo" preload="none">
          <source src="${videoLink}" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div class="video-hero-text">
          <h6>${videoTitle}</h6>
          <h1>${videoSubtitle}</h1>
        </div>
        <a class="hero-scroll-container" id="scroll-down-button">
          <div class="hero-scroll-btn"></div>
        </a>
      </div>
    `);
  }

  const filtersHtml = createHeroHtml();
  block.append(filtersHtml);

  const mybutton = document.getElementById('scroll-down-button');
  mybutton.addEventListener('click', scrollToSection);
}