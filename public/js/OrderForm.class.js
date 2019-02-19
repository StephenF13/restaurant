'use strict';

var OrderForm = function () {
    this.$form          = $('#order-form');
    this.$meal          = $('#meal');
    this.$mealDetails   = $('#meal-details');
    this.$orderSummary  = $('#order-summary');
    this.$validateOrder = $('#validate-order');

    this.basketSession = new BasketSession();
};

OrderForm.prototype.onAjaxChangeMeal = function (meal) {

    // mise à jour de l'affichage


    // Construction de l'URL absolue vers la photo du produit alimentaire.
    this.$mealDetails.children('img').attr(
        'src',
        getWwwUrl() + '/images/meals/' + meal.photo
    );

    this.$mealDetails.children('p').text(meal.description);
    this.$mealDetails.find('strong').text(formatMoneyAmount(meal.salePrice));

    // Enregistrement du prix dans un champ de formulaire caché.
    this.$form.find('input[name=salePrice]').val(meal.salePrice);
};

OrderForm.prototype.onAjaxClickValidateOrder = function (result) {
    var orderId;

    // Désérialization du résultat en JSON contenant le numéro de commande
    orderId = JSON.parse(result);

    // Rédirection HTTP vers la page de demande de paiement de la commande
    // nb: appel à une méthode assign() plutôt que de redéfinir la propriété href de l'objet location
    // toujours préferer un appel à une méthode à un changement de la valeur d'une propriété directement
    window.location.assign(
        getRequestUrl() + '/order/payment?id=' +  orderId
    );
};

OrderForm.prototype.onAjaxRefreshOrderSummary = function (basketViewHtml) {
    this.$orderSummary.html(basketViewHtml);

    this.$validateOrder.attr('disabled', this.basketSession.isEmpty());
};

OrderForm.prototype.onChangeMeal = function () {

    /*
     * Exécution d'une requête HTTP GET AJAJ (Asynchronous JavaScript And JSON)
     * pour récupérer les informations de l'aliment sélectionné dans la liste déroulante.
     */
    $.getJSON
    (
        getRequestUrl() + '/meal?id=' + this.$meal.val(), // URL vers un contrôleur PHP
        this.onAjaxChangeMeal.bind(this) // Méthode appelée au retour de la réponse HTTP
    );
};

OrderForm.prototype.onClickValidateOrder = function () {
    var formFields;

    formFields = {
        basketItems: this.basketSession.items
    };
    // Execution d'une requête HTTP POST AJAH (Asynchronous Javascript And HTML)
    // Pour récupérer le contenu du panier sous la forme d'un document html partiel
    $.post(
        getRequestUrl() + '/order/validation', // URL de destination
        formFields,
        this.onAjaxClickValidateOrder.bind(this) // Au retour de la réponse HTTP
    );
};

OrderForm.prototype.onClickRemoveBasketItem = function (event) {

    this.basketSession.remove(
        parseInt($(event.currentTarget).data('meal-id'))
    );

    this.refreshOrderSummary();

    event.preventDefault();
};

OrderForm.prototype.onSubmitForm = function (event) {
    /*
     * Le formulaire doit être validé par la classe FormValidator.
     *
     * Quand cette classe s'exécute elle enregistre combien d'erreurs de validation elle
     * a trouvé dans un attribut HTML data-validation-error-count de la balise <form>
     * (voir le code dans la méthode onSubmitForm() de la classe FormValidator).
     *
     * Si au moins une erreur est trouvée on ne veut surtout pas continuer !
     */
    if (this.$form.data('validation-error-count') > 0) {
        // on ne fait rien, une ou des erreurs ont été trouvées dans le formulaire
        return;
    }

    this.basketSession.add(
        this.$meal.val(),
        this.$meal.children('option:selected').text(),
        this.$form.find('input[name=quantity]').val(),
        this.$form.children('input[name=salePrice]').val()
    );

    // Mise à jour du récapitulatif de la commande
    this.refreshOrderSummary();

    this.$form.trigger('reset');
    this.$meal.trigger('change');
    this.$form.children('.error-message').hide();

    event.preventDefault();

};

OrderForm.prototype.refreshOrderSummary = function () {

    var formFields;

    formFields = {
        basketItems: this.basketSession.items
    };
    // Execution d'une requête HTTP POST AJAH (Asynchronous Javascript And HTML)
    // Pour récupérer le contenu du panier sous la forme d'un document html partiel
    $.post(
        getRequestUrl() + '/basket', // URL de destination
        formFields,
        this.onAjaxRefreshOrderSummary.bind(this) // Au retour de la réponse HTTP
    );
};

OrderForm.prototype.run = function () {

    /*
     * Installation d'un gestionnaire d'évènement sur la sélection d'un aliment
     * dans la liste déroulante des aliments.
     */
    this.$meal.on('change', this.onChangeMeal.bind(this));

    /*
     * Utilisation de la méthode jQuery trigger() pour déclencher dès maintenant
     * l'évènement de la liste déroulante afin d'afficher le premier aliment de la liste.
     */
    this.$meal.trigger('change');

    this.$form.on('submit', this.onSubmitForm.bind(this));

    this.$orderSummary.on('click', 'button', this.onClickRemoveBasketItem.bind(this));

    // Pour rappel en cas d'appel d'une méthode d'un autre objet dans un écouteur d'évt dans un objet, passer
    // la bonne instance de l'objet qui contient la méthode appelée
    // this.$orderSummary.on('click', 'button', this.basketSession.remove.bind(this.basketSession));

    this.refreshOrderSummary();

    this.$validateOrder.on('click', this.onClickValidateOrder.bind(this));

    /*
     * Le formulaire est caché au démarrage (pour éviter le clignotement de la page),
     * il faut l'afficher.
     */
    this.$form.fadeIn('fast');
};

OrderForm.prototype.success = function () {
    this.basketSession.clear();
};