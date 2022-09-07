import './form';
import './submit';

import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Tooltip, Toast, Popover} from 'bootstrap';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.jpg';

window.addEventListener('load', function() {
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});