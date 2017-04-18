import component from './component';
import './main.styl';

document.body.appendChild(component('Hello you!'));

if (document.getElementById('__bs_script__')) {
  window.addEventListener('beforeunload', e => {
    const msg = 'Something (Browsersync) is trying to reload the page. Allow?';
    e.returnValue = msg;
    return msg;
  });
}
