// Import all of jquery
import * as $ from 'jquery'

// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import '../scss/styles.scss';
import M from 'materialize-css';
import {
    Carousel
} from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'

document.addEventListener('DOMContentLoaded', function () {
    var carousel = M.Carousel.init(document.querySelectorAll('.carousel'), {});
})


