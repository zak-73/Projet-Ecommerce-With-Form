// chargement du DOM
document.addEventListener("DOMContentLoaded", ready);
function ready() {
    'use strict';


    ///////////////////////////////////////////////////////////////////////////////////////////
    // 1 et 2 CREATION D’UN BOUTON FIXED EN BAS A DROITE, RENDRE LE MENU PRINCIPAL FIXE EN HAUT
    //////////////////////////////////////////////////////////////////////////////////////////
    const mainMenu = document.getElementById('primary-nav');
    const btBackToTop = document.getElementById('back-to-top');
    btBackToTop.style.opacity = '0';
    window.addEventListener('scroll', checkScroll);
    function checkScroll() {
        // HTML tag
        let documentTag = document.documentElement;
        //console.log(documentTag.scrollY);
        let posVertScroll = documentTag.scrollTop;
        //console.log(posVertScroll);
        const header = document.querySelector('header');
        let hauteurHeader = header.clientHeight;
        //console.log(hauteurHeader)

        // menu fixé
        if(posVertScroll > hauteurHeader) {
            mainMenu.classList.add('fixed')
        } else {
            mainMenu.classList.remove('fixed')
        }
        // bt back to top
        if(posVertScroll > 100) {
            btBackToTop.classList.add('animfadeIn')
        } else {
            btBackToTop.classList.remove('animfadeIn')
        }
    }

    // effet smooth sur le scroll to top
    btBackToTop.addEventListener('click', function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });


    //////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////
    // 3) FAIRE APPARAITRE UNE POPUP DE PUB
    ///////////////////////////////////////
    const delay = 5;
    const dataPub = "Il faut que cette popup s'ouvre au bout de " + delay + "s<br>Et qu'elle ne s'ouvre qu'une seule fois pdt la navigation";
    let openPub = setTimeout(function() {openPopup(dataPub, 700, 400);}, delay*1000);
    function checkSessionStorage() {
        if(sessionStorage.getItem("openPub")) {
            clearTimeout(openPub);
        } else {
            sessionStorage.setItem("openPub", "on");
        }
    }
    checkSessionStorage();
    ///////////////////////////////////////




    /////////////////////////////
    // open popup
    ////////////////////////////
    const bodyTag = document.querySelector('body');
    function openPopup( data, l, h) {
        bodyTag.insertAdjacentHTML('afterBegin', '<div id="popup">' + data + '</div>');

        let popup = document.getElementById('popup');
        popup.style.background = "red";
        popup.style.color = "#fff";
        popup.style.width = l + 'px';
        popup.style.height = h + 'px';
        popup.style.textAlign = "center";
        popup.style.position = "absolute";
        popup.style.left = "50%";
        popup.style.top = "50%";
        popup.style.padding = "20px";
        popup.style.marginLeft = -(l / 2) + 'px';
        popup.style.marginTop = -(h / 2) + 'px';
        popup.style.boxShadow = "10px 10px 20px #aaa";
        popup.style.zIndex = "1";

        popup.insertAdjacentHTML('afterBegin', '<div id="close">X</div>');
        const btClose = document.getElementById('close');
        btClose.addEventListener('click', closePopup);
        btClose.style.textAlign = "right";
        btClose.style.cursor = "pointer";
        btClose.style.padding = "10px";
        btClose.style.fontWeight = "bold";
        btClose.style.display = "block";
    }
    function closePopup() {
        bodyTag.removeChild(this.parentElement)
    }



    /////////////////////////////////////////
    // 4) RESPONSIVE :
    /////////////////////////////////////////
    const primaryNav = document.getElementById('primary-nav');
    const btMobile = document.getElementById('mobile-nav');

    btMobile.addEventListener('click', openMobileMenu);
    function openMobileMenu() {
        primaryNav.classList.toggle('animfadeIn');
        primaryNav.classList.toggle('display');
    }



    ///////////////////////////////////////////
    // 5) IMAGE ALEATOIRE POUR LE HEADER
    ///////////////////////////////////////////
    const tabImgHeader = ["header-01.jpg", "header-02.jpg", "header-03.jpg"];
    function imgRandomHeader(tabImg, dir) {
        //console.log(tabImg.length)
        const tabLength = tabImg.length;
        let randomNumber = Math.floor(Math.random() * tabLength);
        //console.log(randomNumber)
        let imgRandom = tabImg[randomNumber];
        // repertoire de l'image
        const imgRandomUrl =  dir + imgRandom;

        return imgRandomUrl;
    }

    // image de fond CSS
    let displayImgRandomHeader = 'url(';
    displayImgRandomHeader += imgRandomHeader(tabImgHeader, 'img/header/');
    displayImgRandomHeader += ")";
    if(document.getElementById('slider')) {
        const slider = document.getElementById('slider');
        slider.style.backgroundImage = displayImgRandomHeader;
    }




    ////////////////////////////////////////////////
    // 6) TRAITER LE FORMULAIRE
    ///////////////////////////////////////////////
    const formExo = document.forms["form-formation"];
    if(formExo) {
        formExo.addEventListener('submit', checkFormAvecBoucle);
    }

    function checkFormAvecBoucle(evt) {
        // mode debug
        evt.preventDefault();

        // reset icon error
        const errorIconClass = document.getElementsByClassName('form-alert');
        for(let element of errorIconClass) {
            element.classList.remove('form-alert');
        }

        // Regex
        const telRegex = /^0\d(\s|-)?(\d{2}(\s|-)?){4}$/;
        const emailRegex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
        const dptRegex = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;

        // tableau qui va recupérer les noms des champs qui ne sont pas conformes
        let tabError = [];
        // tableau qui recupere les noms des groupes de bt radio qui ont été cochés
        let tabCheckedRadio = [];
        // Propriétés des elements
        let typeElementForm, valueElementForm, nameElementForm;

        for (let elementForm of formExo) {

            //console.log(elementForm);
            typeElementForm = elementForm.type;
            //console.log(typeElementForm);
            valueElementForm = elementForm.value;
            //console.log(valueElementForm);
            nameElementForm = elementForm.name;
            //console.log(nameElementForm);
            let erreur;

            // on ne veux pas evaluer ces objets de formulaire
            if (typeElementForm == 'submit' || typeElementForm == 'fieldset' || nameElementForm == 'ip') {
                continue;
            }

            // on controle tous les champs qui renvoie une valeur: input, select, textarea
            if (valueElementForm == "") {
                // si un element n'est pas rempli ou selectionné,
                // on recupere son nom et on l'injecte dans le tableau des errieurs
                tabError.push(nameElementForm + " à renseigner");
                // icon error sur le label
                elementForm.previousElementSibling.classList.add('form-alert');

            } else {
                // ici on controle les formats des champs en Regex
                if (nameElementForm == 'tel' && !telRegex.test(valueElementForm)) {
                    erreur = "le numéro de téléphone n'est pas valide";
                    tabError.push(erreur);
                    elementForm.previousElementSibling.classList.add('form-alert');
                }

                if (nameElementForm == 'email' && !emailRegex.test(valueElementForm)) {
                    erreur = "l'email n'est pas valide";
                    tabError.push(erreur);
                    elementForm.previousElementSibling.classList.add('form-alert');
                }

                if (nameElementForm == 'departement' && !dptRegex.test(valueElementForm)) {
                    erreur = "Le département n'est pas valide";
                    tabError.push(erreur);
                    elementForm.previousElementSibling.classList.add('form-alert');
                }
            } // end for

            ///////////////////////////////////////////////
            // ici on controle les groupes de bt radio
            // quand un bt radio est coché on recupere le nom du groupe
            if (typeElementForm == 'radio') {
                if (elementForm.checked == true) {
                    tabCheckedRadio.push(nameElementForm);
                }
            }
            ///////////////////////////////////////////////
        } // end for


        ///////////////////////////////////////
        // controle des groupes de bt radio
        ///////////////////////////////////////
        // ici on recupère tous les noms des groupes de bt radio
        const btsRadio = document.querySelectorAll("[type=radio]");
        const tabGroupRadioName = [];
        for (let elementRadio of btsRadio) {
            let nameBtRadio = elementRadio.name;
            // si le tableau contient déjà le meme nom on l'evite
            // empeche de rentrer des doublons
            if (tabGroupRadioName.includes(nameBtRadio)) {
                continue;
            } else {
                tabGroupRadioName.push(nameBtRadio)
            }
        }

        // on compare les noms des groupes de bt radio avec ceux qui ont été coché
        for (let name of tabGroupRadioName) {
            // si un nom de groupe n'est pas dans le tableau tabGroupRadioName c'est que ce groupe n'a pas été coché
            if (!tabCheckedRadio.includes(name)) {
                tabError.push(name + " non renseigné");
                // pour affichage de l'icon erreur sur le label precedent l'input
                let attributeSelector = '[name=' + name + ']';
                let labelTag = document.querySelector(attributeSelector);
                labelTag.previousElementSibling.previousElementSibling.classList.add('form-alert');
            }
        }

        //////////////////////////////////////////////////////////
        // controle du groupe de bt checkbox // au moins 1 coché
        //////////////////////////////////////////////////////////
        const scientifique = document.getElementById('scientifique');
        const artistique = document.getElementById('artistique');
        if(!scientifique.checked && !artistique.checked) {
            tabError.push("Etes-vous plutôt scientifique ou artistique?");
            scientifique.previousElementSibling.previousElementSibling.classList.add('form-alert');
        // patch???
        } else {
            scientifique.previousElementSibling.previousElementSibling.classList.remove('form-alert');
        }


        ////////////////////////////////////////////////////
        // si le tableau des erreurs est vide donc pas d'erreur
        // on envoie le formulaire
        ////////////////////////////////////////////////////
        if (tabError.length == 0) {
            this.submit();
        } else {
            // sinon on affiche les erreurs
            let afficheErreur = "Veuillez corriger les erreurs svp: <br>";
            afficheErreur += tabError.join('<br>');
            openPopup(afficheErreur, 700, 400);
            window.scrollTo({top: 0, behavior: 'smooth'});
            // et on bloque l'envoi du formulaire
            evt.preventDefault();
        }
    }

    /////////////////////////
    // controle du textarea
    /////////////////////////
    let nbreCaractMax = 5;
    const textareaTag = document.getElementById('commentaires');
    // message texte restant
    const messageCaractTag = document.createElement('div');

    if(formExo) {
        // on attache la div du message  à la fin du 2e fieldset
        const caractTag = formExo.querySelector('fieldset:last-of-type').appendChild(messageCaractTag);
        // message caract max
        const messageCaractMax = document.createElement('span');
        const caractMaxTag = textareaTag.nextElementSibling.appendChild(messageCaractMax);
        // affichage du nbre de caracteres max
        caractMaxTag.innerHTML = '(' + nbreCaractMax + " caractères max)";

        // evenement sur les touches frappées
        textareaTag.addEventListener('keyup', function checkTextareaCall() {
            const myThis = this;
            checkTextarea(nbreCaractMax, myThis, caractTag)
        })
    }

    function checkTextarea(nbreCaractMax, myThis, caractTag) {
        let nbreCaract = myThis.value.length;
        let caractRestant = nbreCaractMax - nbreCaract;

        if (caractRestant <= 0) {
            caractRestant = 0;
            myThis.value = myThis.value.slice(0, nbreCaractMax);
        }
        let messageCaract = "Il vous reste " + caractRestant + ' catactère(s)';
        caractTag.innerHTML = messageCaract;
    }
    ////////////// fin formulaire //////////////////////





    /////////////////////////////
    // 7) PAGE PRODUITS
    ////////////////////////////
    const produitsSection = document.getElementById('produits');
    // Parametre pour le type d'affichage
    // productsDisplayMode; booleen  // false = vignettes, true = liste
    if(produitsSection) {
        displayProducts(false);
    }
    function displayProducts(productsDisplayMode) {
        // initialisation
        produitsSection.innerHTML = "";

        // creation du ul
        const ulElement = document.createElement("ul");
        // creation d'une nav
        const navElement = document.createElement('nav');
        // on attache le ul à la nav
        navElement.appendChild(ulElement);
        let liElement, ulElementSub, aElement;


        // iteration sur le JSON products
        // creation des li et ce qu'ils contiennent
        for(let obj in products) {
            //console.log(category[obj].subCategory);

            // creation des li de 1er niveau
            liElement = document.createElement('li');
            liElement = ulElement.appendChild(liElement);

            // le contenu des li (infos produits)
            // url de l'image
            let dir = 'img/products/';
            dir = dir + products[obj].category + '/' + products[obj].subCategory + '/';
            // id qui servira pour l'affichage du produit cliqué
            let id =  products[obj].id;
            // Prix avec 2 chiffres après la virgule
            let price = products[obj].price;
            price = price.toFixed(2);
            // description
            let description = products[obj].description;

            ///////////////////////////////////////////
            // Pour le mode liste on affiche une partie de la description
            // Extraction de n mots de la description
            ///////////////////////////////////////////
            // initialisation
            let tabDescription = [];
            // on transforme la string en array
            description = description.split(" ");
            // on recupère les n premiers mots et on le reinjecte dans un tableau
            const nbreMotsMax = 30; // aurait pu être definit comme parametre de la fonction
            for(let i=0; i <nbreMotsMax ;i++) {
                tabDescription.push(description[i])
            }
            // on retransforme le tableau en string
            description = tabDescription.join(" ") + "...";
            ////////////////////////////////////////////////////


            // affichage mode vignettes ou liste
            let loopBloc;
            // Affichage vignettes
            if(productsDisplayMode == false) {
                loopBloc = '<a href="' + id + '">';
                loopBloc += '<img src="' + dir + products[obj].image + '">';
                loopBloc += '</a>';
                loopBloc += '<a href="' + id + '">';
                loopBloc += '<h3>';
                loopBloc += products[obj].name;
                loopBloc += '</h3>';
                loopBloc += '<span>';
                loopBloc += price + '€';
                loopBloc += '</span>';
                loopBloc += '</a>';

            // affichage Liste
            } else {
                loopBloc = '<a href="' + id + '">';
                loopBloc += '<img src="' + dir + products[obj].image + '">';
                loopBloc += '</a>';
                loopBloc += '<div>';
                loopBloc += '<h3>';
                loopBloc += products[obj].name;
                loopBloc += '</h3>';
                loopBloc += '<p>';
                loopBloc += description;
                loopBloc += '</p>';
                loopBloc += '<span>';
                loopBloc += price + '€';
                loopBloc += '</span>';
                loopBloc += '<a class="bt-panier" href="panier.php?id=';
                loopBloc += id;
                loopBloc += '">';
                loopBloc += 'Ajouter au panier';
                loopBloc += '<a>';
                loopBloc += '</div>';
                // Pour gerer l'affichage en CSS
                navElement.setAttribute('class', 'display-products-list')
            }
            // on insere dans les li
            liElement.insertAdjacentHTML('beforeEnd', loopBloc);

            /////////////////////////////////////////////////
            // on attache des écouteurs sur le lien pour afficher le produit cliqué
            // En mode vignettes
            if(productsDisplayMode == false) {
                aElement = liElement.firstElementChild.nextElementSibling;
                // patch pour mobile
                if(window.innerWidth <= 768) {
                    aElement = liElement.firstElementChild;
                }
            // En mode liste
            } else {
                aElement = liElement.firstElementChild;
            }
            aElement.addEventListener('click', openProduct);
            // Pour mobile si besoin
            //aElement.addEventListener('touchstart', openProduct);
            // ou
            //aElement.addEventListener('touchend', openProduct);
        } // end for
        // on attache le menu à la div
        produitsSection.appendChild(navElement);
    }

    // Bouton qui permettent l'affichage en mode liste ou vignettes
    const btDisplayProductsList = document.querySelector('#bt-display-products :nth-child(1)');
    const btDisplayProductsThumb = document.querySelector('#bt-display-products :nth-child(2)');

    if(btDisplayProductsList) {
        btDisplayProductsList.addEventListener('click', function(){displayProducts(true)});
        btDisplayProductsThumb.addEventListener('click', function(){displayProducts(false)})
    }


    // fonction qui recupere l'id du produit qui a été cliqué
    function openProduct(evt) {
        evt.preventDefault();
        //console.log(this)

        // on récupère le id dans href pour afficher le produit
        let id = this.getAttribute('href');
        //console.log(id)

        // fonction qui affiche le produit cliqué
        displayProduct(id);
    }
    /////////////////////////////////////////////////////////////

    // fonction qui affiche les details du produit cliqué
    // le contenu de la liste des produits (section) sera remplacé par le produit
    function displayProduct(id) {
        // uniquement pour avoir le même design que la page blog (cool pas besoin de refaire tout le CSS)
        document.querySelector('body').setAttribute('id', 'blog');

        // on recherche le produit dans le JSON d'après son id
        for(let obj in products) {
            if(products[obj].id == id){
                // on recupere toute les infos du produit
                const productName = products[obj].name;
                const productDescription = products[obj].description;
                const productImage = products[obj].image;
                let productPrice = products[obj].price;
                productPrice = productPrice.toFixed(2);
                const productCategory = products[obj].category;
                const productSubcategory = products[obj].subCategory;

                let dir = 'img/products/';
                dir = dir + productCategory + '/' + productSubcategory + '/';

                // construction du HTML identique à la page article.html
                let blocProduct = '<article>';
                blocProduct += '<h3>' + productName + '</h3>';
                blocProduct += '<div><figure>';
                blocProduct += '<img src="' + dir +  productImage + '">';
                blocProduct += '</figure>';
                blocProduct += '<div>';
                blocProduct += '<p>';
                blocProduct += productDescription;
                blocProduct += '</p>';
                blocProduct += '<footer>';
                blocProduct += '<input type="number" min="1" step="1" value="1" id="price">';
                blocProduct +=  '<span id="calcul-price">' + productPrice + '€</span>';
                blocProduct += '<a class="bt-panier" href="panier.php?id=';
                blocProduct += id;
                blocProduct += '">';
                blocProduct += 'Ajouter au panier';
                blocProduct += '</a>';
                blocProduct += '</footer>';
                blocProduct += '</div>';
                blocProduct += '</div>';
                blocProduct += '</article>';
                blocProduct += '<div style="text-align: right;padding: 10px 20px; background:red; border-radius: 100rem;display: inline-block;float: right;">';
                blocProduct += '<a href="#" id="back-to-produits" onclick="document.location.href=\'produits.html\'">';
                blocProduct += 'Retour page produits';
                blocProduct += '</a>';
                blocProduct += '</div>';

                // on injecte le HTML dans la section
                const produitsSection = document.getElementById('produits');
                produitsSection.innerHTML = blocProduct;

                // on modifie l'id du body pour recuperer le meme design que la page article
                document.querySelector('body').setAttribute('id', 'article-page');

                // fonction qui va calculer le prix suivant le nombre de produits
                calculProductPrice(productPrice);

                break;
            }
        }
    } //

    // Pour calcul du prix suivant la quantité selectionnée
    function calculProductPrice(price) {
        //console.log(price);
        const inputPrice = document.getElementById('price');

        // evenement sur l'input changement de quantité
        inputPrice.addEventListener('change', function() {
            // quantité
            let quantity = this.value;
            calculNewPrice(quantity, price);
        });
    }

    function calculNewPrice(quantity, price) {
        //console.log(typeof (this.value))
        let newPrice = quantity * price;
        newPrice = newPrice.toFixed(2);
        newPrice = newPrice  + "€";
        //console.log(newPrice)
        const spanCalculPrice = document.getElementById('calcul-price');
        spanCalculPrice.innerHTML = newPrice;
    }



    /////////////////////////////////////////////
    // 8. Menu pleine page categories
    ////////////////////////////////////////////
    const divMenu = document.getElementById("menu-categories");
    const btOpenMenu = document.querySelector('#bt-categories');
    btOpenMenu.addEventListener('click', openMenu);
    createMenuCategories();

    // creation d'un menu à partir de category dans products.js
    function createMenuCategories() {
        // creation du ul
        const ulElement = document.createElement("ul");
        // creation d'une nav
        const navElement = document.createElement('nav');
        // on attache le ul à la nav
        navElement.appendChild(ulElement);
        let liElement, ulElementSub, aElement;

        // iteration sur le JSON category
        for(let obj in category) {
            //console.log(category[obj].subCategory);

            // creation des li de 1er niveau
            liElement = document.createElement('li');
            liElement = ulElement.appendChild(liElement);
            // insertion des liens et des données
            liElement.insertAdjacentHTML('beforeEnd', '<a href="' + category[obj].slug + '/">' + category[obj].name + '</a>');
            //console.log(liElement);

            // on attache des écouteurs au lien de 1er niveau
            aElement = liElement.firstElementChild;
            //console.log(aElement)
            // on appelle la fonction qui va ouvrir les sous menus
            aElement.addEventListener('click', openSubCategory);

            // creation des ul de 2e niveau
            ulElementSub = document.createElement('ul');
            // on attache les ul de 2e niv au li
            liElement.appendChild(ulElementSub);
            //console.log(liElement)

            // on recupere les ul de 2e niveau
            ulElementSub = liElement.lastElementChild;
            //console.log(ulElementSub);

            // iteration uniquement sur les tableaux sous categories
            let objSubCategorie = category[obj].subCategory;
            //console.log(objSubCategorie)

            // on itere sur les objets imbriqués de subCategory: propriétés
            // et on créée les li de 2e niveau
            for(let key in objSubCategorie) {
                //console.log(objSubCategorie[key]);
                ulElementSub.insertAdjacentHTML('beforeEnd', '<li><a href="' + category[obj].slug + '/' + objSubCategorie[key].slug + '/">' + objSubCategorie[key].name + '</a></li>');
            }
        }
        // on attache le menu à la div
        divMenu.appendChild(navElement);
    }

    ////////////////////////////////////////////
    // fonction qui affiche les sous categories
    ////////////////////////////////////////////
    let count = 0;
    function openSubCategory(evt) {
        // le this recupere l'élément a cliqué
        //console.log(this);

        // on empeche l'envoi vers l'URL
        evt.preventDefault();

        // on supprime l'image de droite 1 fois
        if(count == 0) {
            const imgAleatoireMenu = document.querySelector('#menu-categories div:last-of-type');
            // on la fait disparaitre
            imgAleatoireMenu.classList.add('animfadeOut');
            imgAleatoireMenu.style.zIndex = "-1";
            // ou on la supprime
            //divMenu.removeChild(imgAleatoireMenu);
        }

        // on initialise les sous menu (on les fait disparaitre)
        const ulElementsSub = document.querySelectorAll('#menu-categories nav:first-child > ul > li > ul');
        for(let ulElement of ulElementsSub) {
            ulElement.style.display = "none";
        }
        // on initialise le style du menu de 1er niveau (style des bt cliqués)
        const aElements = document.querySelectorAll('#menu-categories nav:first-child > ul > li > a');
        for(let aElement of aElements) {
            aElement.style.background = "darkgreen";
        }

        // on recupere le ul de 2e niveau frere du a pour le faire apparaite au clic
        let ulElement = this.nextElementSibling;
        //console.log(ulElement);
        ulElement.style.display = "block";

        // on stylise le a au clic
        this.style.background = "cornflowerblue";

        count++;
    }

    // Affichage de l'image aléatoire à droite
    function imgRandom(tabImg, dir) {
        //console.log(tabImg.length)
        const tabLength = tabImg.length;
        let randomNumber = Math.floor(Math.random() * (tabLength - 1)) + 1;
        console.log(randomNumber);
        let imgRandom = tabImg[randomNumber].image;

        // repertoire de l'image
        dir += tabImg[randomNumber].category + '/' + tabImg[randomNumber].subCategory + '/';
        const imgRandomUrl =  dir + imgRandom;

        let price = tabImg[randomNumber].price;
        price = price.toFixed(2);

        let imgRandomBloc = '<div>';
        imgRandomBloc += '<p>Nouveauté</p>';
        imgRandomBloc += '<img src="' + imgRandomUrl + '">';
        imgRandomBloc += '<span>' + tabImg[randomNumber].name + '</span>';
        imgRandomBloc += '<span>' + price + '€</span>';
        imgRandomBloc += '</div>';

        return imgRandomBloc;
    }
    // products est l'objet JSON du fichier products.js
    let imgRandomMenuCategories = imgRandom(products, 'img/products/');
    //console.log(imgRandomMenuCategories);
    // on attache le bloc image au menu
    divMenu.insertAdjacentHTML('beforeEnd', imgRandomMenuCategories);


    // fonction "allez-retour" pour ouverture/fermeture du menu
    let countOpenMenu = 0;
    function openMenu() {
        this.classList.toggle("change");
        if(countOpenMenu == 0) {
            divMenu.classList.add('animslideOn');
            divMenu.classList.remove('animslideOff');
            countOpenMenu++;
        } else {
            divMenu.classList.add('animslideOff');
            divMenu.classList.remove('animslideOn');
            countOpenMenu = 0
        }
    }
    //////////////////////fin Menu pleine page categories///////////////////////////////


} // fin ready
