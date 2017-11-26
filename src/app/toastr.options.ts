import {ToastOptions} from 'ng2-toastr/ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = true;
  showCloseButton = true;
  toastLife = 5000;
}
