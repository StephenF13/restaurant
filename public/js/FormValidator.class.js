'use strict';

var FormValidator = function($form) {
    this.$form = $form;
    this.$errorMessage = $form.find('.error-message');
    this.$totalErrorCount = $form.find('.total-error-count');

    // Tableau général pour toutes les erreurs de validation trouvées
    this.totalErrors = null;
};

FormValidator.prototype.checkDataTypes = function () {

    this.$form.find('[data-type]').each(function (index, field) {

        var value;

        value = $(field).val().trim();

        var regexEmail = /^[\w.-]+@[\da-z][\w.-]*\.[a-z0-9-]{2,}$/i;

        switch ($(field).data('type')) {
            case 'email':
                if (value.length && !regexEmail.test(value)) {
                    this.totalErrors.push({
                        fieldName: $(field).data('name'),
                        message : 'doit être un email'
                    });
                }
                break;
            case 'number':
                if (value.length && !isNumber(value)) {
                    this.totalErrors.push({
                        fieldName: $(field).data('name'),
                        message : 'doit être un nombre'
                    });
                }
                break;
            case 'positive-integer':
                if (value.length && !isInteger(value) && !(value >= 0)) {
                    this.totalErrors.push({
                        fieldName: $(field).data('name'),
                        message : 'doit être un nombre entier positif'
                    });
                }
                break;
        }



        // Récupération de la valeur du champ de formulaire (sans les espaces en début et fin)
        if ($(field).val().trim().length && $(field).val().length < $(field).data('minlength')) {

            this.totalErrors.push({
                fieldName: $(field).data('name'),
                message : 'doit comporter au moins ' + $(field).data('minlength') + 'caractère(s)'
            });
        }
    }.bind(this));

};

FormValidator.prototype.checkRequiredFields = function () {

    this.$form.find('[data-required]').each(function (index, field) {

        // Récupération de la valeur du champ de formulaire (sans les espaces en début et fin)
        if (!$(field).val().trim().length) {
            this.totalErrors.push(
            {
                fieldName: $(field).data('name'),
                message : 'est requis'
            });
        }
    }.bind(this));

};

FormValidator.prototype.checkMinimumLength = function () {

    this.$form.find('[data-minlength]').each(function (index, field) {

        // Récupération de la valeur du champ de formulaire (sans les espaces en début et fin)
        if ($(field).val().trim().length && $(field).val().length < $(field).data('minlength')) {
            this.totalErrors.push({
                fieldName: $(field).data('name'),
                message : 'doit comporter au moins ' + $(field).data('minlength') + 'caractère(s)'
            });
        }
    }.bind(this));

};

FormValidator.prototype.onSubmitForm = function (event) {

    var errorMessage;

    errorMessage = '';

    // Création du tableau général des erreurs
    this.totalErrors = [];

    // Execution des différents validations
    this.checkRequiredFields();
    this.checkMinimumLength();
    this.checkDataTypes();

    // Enregistrement du nombre d'erreurs de validation trouvées dans le formulaire.
    this.$form.data('validation-error-count', this.totalErrors.length);

    if (this.totalErrors.length) {

        this.totalErrors.forEach(function (error) {

            errorMessage += 'Le champ <em><strong>' + error.fieldName + '</strong></em> ' + error.message + '.<br>';

        });
        this.$errorMessage.children('p').html(errorMessage);

        this.$totalErrorCount.text(this.totalErrors.length);

        this.$errorMessage.fadeIn('slow');

        event.preventDefault();
    }
};

FormValidator.prototype.run = function () {
    this.$form.on('submit', this.onSubmitForm.bind(this));

    if (this.$errorMessage.children('p').text().length) {
        this.$errorMessage.fadeIn('slow');
    }
};