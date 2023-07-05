import $ from 'jquery';
import * as bootstrap from 'bootstrap';
// Default theme
import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";
import { initialize} from '../frontfunctions';

// The desktop window is the window displayed while game is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
new AppWindow(kWindowNames.desktop);

document.addEventListener( 'DOMContentLoaded', initialize);