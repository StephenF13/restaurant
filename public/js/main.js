'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////

function runFormValidation() {
    var $forms;
    var formValidator;

    $forms = $('form:not([data-no-validation=true])');

    // Y a t-il un formulaire à valider sur la page actuelle ?
    // if (form.length === 1) {
    //     // Oui, execution de la validation de formulaire
    //     formValidator = new FormValidator(form);
    //     formValidator.run();
    // }
    if ($forms.length > 0) {
        // Oui, execution de la validation de formulaire
        $forms.each(function () {
            formValidator = new FormValidator($(this));
            formValidator.run();
        });
    }
}

function runOrderForm() {
    var orderForm;

    orderForm = new OrderForm();

    switch ( $('[data-order-step]').data('order-step') ) {
        case 'success':
            orderForm.success(); // Succès du paiement de la commande
            break;
        default:
            orderForm.run(); // Commande en cours
    }

}


/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

$(function () {
    // Effet spécial sur la boite de notification (le flash bag)
    $('#notice').delay(3000).fadeOut('slow');
    runFormValidation();

    if (typeof OrderForm !== 'undefined') {
        runOrderForm();
    }
});