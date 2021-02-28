import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TryService {
  stripe = Stripe(environment.stripekey);
  form: any;

  constructor() { }
  enableInputs() {
    Array.prototype.forEach.call(
      this.form?.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }
   disableInputs() {
    Array.prototype.forEach.call(
      this.form?.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }


 triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    this.form?.appendChild(submit);
    submit.click();
    submit.remove();
  }
  registerElements(elements:any, exampleName:string) {
    const formClass = '.' + exampleName;
    const example:any = document.querySelector(formClass);
  
    this.form = example?.querySelector('form');
    const resetButton = example?.querySelector('a.reset');
    const error:any = this.form?.querySelector('.error');
    let errorMessage:any = error?.querySelector('.message');
  
    // Listen for errors from each Element, and show error messages in the UI.
    let savedErrors:any = {};
    elements.forEach(function(element:any, idx:any) {
      element.on('change', function(event:any) {
        if (event.error) {
          error?.classList.add('visible');
          savedErrors[idx] = event.error.message;
          errorMessage.innerText = event.error.message;
        } else {
          savedErrors[idx] = null;
  
          // Loop over the saved errors and find the first one, if any.
          var nextError = Object.keys(savedErrors)
            .sort()
            .reduce(function(maybeFoundError, key) {
              return maybeFoundError || savedErrors[key];
            }, null);
  
          if (nextError) {
            // Now that they've fixed the current error, show another one.
            errorMessage.innerText = nextError;
          } else {
            // The user fixed the last error; no more errors.
            error.classList.remove('visible');
          }
        }
      });
    });
  
    // Listen on the form's 'submit' handler...
    this.form?.addEventListener('submit', (e:any) =>{
      e.preventDefault();
  
      // Trigger HTML5 validation UI on the form if any of the inputs fail
      // validation.
      var plainInputsValid = true;
      Array.prototype.forEach.call(this.form.querySelectorAll('input'), function(
        input
      ) {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });
      if (!plainInputsValid) {
        this.triggerBrowserValidation();
        return;
      }
  
      // Show a loading screen...
      example.classList.add('submitting');
  
      // Disable all inputs.
      this.disableInputs();
  
      // Gather additional customer data we may have collected in our form.
      var name = this.form.querySelector('#' + exampleName + '-name');
      var address1 = this.form.querySelector('#' + exampleName + '-address');
      var city = this.form.querySelector('#' + exampleName + '-city');
      var state = this.form.querySelector('#' + exampleName + '-state');
      var zip = this.form.querySelector('#' + exampleName + '-zip');
      var additionalData = {
        name: name ? name.value : undefined,
        address_line1: address1 ? address1.value : undefined,
        address_city: city ? city.value : undefined,
        address_state: state ? state.value : undefined,
        address_zip: zip ? zip.value : undefined,
      };
  
      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      this.stripe.createToken(elements[0], additionalData).then((result:any) =>{
        // Stop loading!
        example.classList.remove('submitting');
  
        if (result.token) {
          // If we received a token, show the token ID.
          example.querySelector('.token').innerText = result.token.id;
          example.classList.add('submitted');
        } else {
          // Otherwise, un-disable inputs.
          this.enableInputs();
        }
      });
    });
  
    resetButton.addEventListener('click', (e:any) =>{
      e.preventDefault();
      // Resetting the form (instead of setting the value to `''` for each input)
      // helps us clear webkit autofill styles.
      this.form?.reset();
  
      // Clear each Element.
      elements.forEach(function(element:any) {
        element.clear();
      });
  
      // Reset error state as well.
      error.classList.remove('visible');
  
      // Resetting the form does not un-disable inputs, so we need to do it separately:
      this.enableInputs();
      example.classList.remove('submitted');
    });
  }

}
