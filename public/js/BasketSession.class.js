'use strict';

var BasketSession = function() {
    // Contenu du panier
    this.items = null;
    this.storageName = 'panier';

    this.load();
};

BasketSession.prototype.add = function (mealId, name, quantity, salePrice)
{
    var index;

    // Conversion explicite des valeurs spacifiées en nombres
    mealId = parseInt(mealId);
    quantity = parseInt(quantity);
    salePrice = parseFloat(salePrice);

    // ?? Problème l'aliment est-il déjà dans le panier ??
    for (index = 0; index < this.items.length; index++) {
        if (this.items[index].mealId === mealId) {
            this.items[index].quantity += quantity;

            this.save();

            return true;
        }
    }

    this.items.push({
       mealId: mealId,
       name: name,
       quantity: quantity,
       salePrice: salePrice
    });

    this.save();

    return false;
};

BasketSession.prototype.clear = function ()
{
    saveDataToDomStorage(this.storageName, null);
};

BasketSession.prototype.isEmpty = function ()
{
    return this.items.length === 0;
};

BasketSession.prototype.load = function ()
{
    this.items = loadDataFromDomStorage(this.storageName);

    if (this.items === null) {
        this.items = [];
    }
};

BasketSession.prototype.remove = function (mealId)
{
    var index;

    for (index = 0; index < this.items.length; index++) {
        if (this.items[index].mealId === mealId) {
            this.items.splice(index, 1);

            this.save();

            return true;
        }
    }

    // si on avait un objet complet en argument plutôt que l'id seul
    // this.items.splice(this.items.indexOf(meal), 1);
    //
    // Autre façon de faire avec la méthode de filtrage de tableaux filter
    // this.items = this.items.filter(function(item) {
    //     return item.mealId !== mealId;
    // });
    //
    // ES6 avec fonctions fléchées
    // this.items = this.items.filter(item => item.mealId !== mealId);

    return false;
};

BasketSession.prototype.save = function ()
{
    saveDataToDomStorage(this.storageName, this.items);
};