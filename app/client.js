import component from './component';
import './client.styl';

document.body.appendChild(component('Hello you!'));
document.body.appendChild(component('Hello yourself!'));

console.log('Well hello');

// ontämäkinsaatanatyömaa
// if (document.getElementById('__bs_script__')) {
  // window.addEventListener('beforeunload', e => {
    // const msg = 'Something (Browsersync) is trying to reload the page. Allow?';
    // e.returnValue = msg;
    // return msg;
  // });
// }
