const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const dateInput = document.querySelector('#date');
if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;
}
const form = document.querySelector('#quote-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      'Name: ' + (data.get('name') || ''),
      'Phone: ' + (data.get('phone') || ''),
      'Journey type: ' + (data.get('journey') || ''),
      'Travel date: ' + (data.get('date') || 'Not specified'),
      'Preferred pick-up time: ' + (data.get('time') || 'Not specified'),
      'Pick-up: ' + (data.get('pickup') || 'Not specified'),
      'Destination: ' + (data.get('destination') || 'Not specified'),
      'Return journey: ' + (data.get('return') || 'Not specified'),
      'Passengers: ' + (data.get('passengers') || 'Not specified'),
      'Additional details: ' + (data.get('details') || 'None')
    ];
    document.querySelector('#form-status').textContent = 'Opening your email application with your enquiry details…';
    window.location.href = 'mailto:info@amm-taxi.co.uk?subject=' +
      encodeURIComponent('AMM Taxi & Events — quote enquiry') +
      '&body=' + encodeURIComponent(lines.join('\n'));
  });
}
