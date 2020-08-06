import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import '../../node_modules/foundation-sites/dist/js/foundation.js';
import '../../node_modules/jquery/dist/jquery.min.js';

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');
