import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/styles.scss';
import M from 'materialize-css';
import {
    Carousel
} from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'

document.addEventListener('DOMContentLoaded', function () {
    var carousel = M.Carousel.init(document.querySelectorAll('.carousel'), {});
})
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

