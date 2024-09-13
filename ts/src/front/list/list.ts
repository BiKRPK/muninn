import $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { BackgroundController } from '../../background/background';

const openUploadButton = document.getElementById('newVideo');
openUploadButton.onclick = () => {
    BackgroundController.instance().openUploadWindow();
}
