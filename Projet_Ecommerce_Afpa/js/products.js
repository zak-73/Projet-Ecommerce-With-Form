const category = [
    {
        "name":"Almentaire",
        "slug":"alimentaire",
        subCategory:[
            {
                "name":"Apéritifs",
                "slug":"aperitifs",
            },
            {
                "name":"Huiles d'olive",
                "slug":"huile-olive",
            },
            {
                "name":"Miels",
                "slug":"miels",
            }
        ]
    },
    {
        "name":"Bien-être",
        "slug":"bien-etre",
        subCategory:[
            {
                "name":"Cheveux",
                "slug":"cheveux",
            },
            {
                "name":"Corps",
                "slug":"corps",
            },
            {
                "name":"Visage",
                "slug":"visage",
            }
        ]
    },
    {
        "name":"Vrac",
        "slug":"vrac",
        subCategory:[
            {
                "name":"Herbes aromatiques",
                "slug":"herbes-aromatiques",
            },
            {
                "name":"Infusions",
                "slug":"infusions",
            },
        ]
    }

];






const products = [
    {
        "id": 1,
        "category":"alimentaire",
        "subCategory":"aperitifs",
        "name": "Dolmades (Feuille de vigne farcie au riz) 200g",
        "description": "<p>Tendres feuilles de vigne croquantes farcies de riz aromatisées aux herbes à l’huile d’olive extra vierge.<br>Fabriqué à la main à partir d’une recette familiale et d’ingrédients frais. Ajout essentiel à tout plateau d’apéritif.<br> A déguster seul en collation ou en accompagnement d’une boisson. Un produit typique de la Grèce.</p>",
        "image":"dolmades-feuille-de-vignes-traditionelles.jpg",
        "price": 7.70
    },
    {
        "id": 2,
        "category":"alimentaire",
        "subCategory":"huiles-olive",
        "name": "Huile d’olive extra vierge 0.2 Liokarpi 500ml",
        "description": "<p>Fidèle à une tradition de transformation et de production d’huile d’olive depuis 1930, Liokarpi prend les mesures nécessaires pour s’adapter et surpasser les besoins de l’époque, grâce à la modernisation continue de ses installations et à l’amélioration constante de ses procédures et méthodes de transformation des olives .</p><p>Fidèle à une tradition de transformation et de production d’huile d’olive depuis 1930, Liokarpi prend les mesures nécessaires pour s’adapter et surpasser les besoins de l’époque, grâce à la modernisation continue de ses installations et à l’amélioration constante de ses procédures et méthodes de transformation des olives .</p>",
        "image":"Huile-olive-02-extra-500ml.jpg",
        "price": 11.90
    },
    {
        "id": 3,
        "category":"alimentaire",
        "subCategory":"miels",
        "name": "Miel de Thym 270g",
        "description": "<p>Le miel de thym «TOPLOU» est un miel de thym de haute qualité avec un arôme distinctif et doux. C’est un produit naturel, plein de saveur, avec des et des caractéristiques exceptionnelles.</p><p>Profitez de ce miel pur et non raffiné à la texture soyeuse directement produit par les abeilles vivant dans les zones les plus sauvages et les plus rugueuses des montagnes SITIA. Le miel riche et savoureux « TOPLOU» est collecté avec soin selon des méthodes traditionnelles et emballé selon des procédures d’hygiène strictes, vous offrant ses propriétés nutritionnelles uniques et saines directement à partir des ruches. Notre miel qui se distingue par son arôme, sa saveur et sa densité vous donne une énergie faible en calories tout en renforçant votre système immunitaire. « TOPLOU»le miel provient des meilleures qualités de miel de Crète en raison de la grande variété d’herbes fraîches et aromatiques, rassemblant une sélection d’oligo-éléments, de protéines et d’acides aminés bénéfiques. Un miel de première qualité d’une qualité exceptionnelle avec une superbe couleur vive, un goût doux agréable et des caractéristiques alimentaires vivifiantes</p>",
        "image":"miel-de-thym.jpg",
        "price": 8.50
    },
    {
        "id": 4,
        "category":"bien-etre",
        "subCategory":"cheveux",
        "name": "Shampoing Bio tous types de cheveux (250 ml)",
        "description": "<p>La composition aux agents nettoyants doux d’origine naturelle, rajeunit les cheveux et respecte la couche hydrolipidique de la peau.&nbsp;Enrichi en eau de rose, il stabilise l’équilibre du pH des cheveux tout en laissant de beaux cheveux odorants.&nbsp;Il est d’origine naturelle, facilement biodégradable et donc respectueux de l’environnement.</p><p>UTILISATION: Lavez vos cheveux aussi souvent que nécessaire, une fois par jour si nécessaire. Appliquez le shampoing en étalant une petite quantité sur la paume des deux mains et en appliquant uniformément sur les cheveux mouillés. Massez doucement dans les cheveux et le cuir chevelu en utilisant un mouvement circulaire pour éviter que les cheveux ne s’emmêlent. Rincer abondamment à l’eau tiède puis répéter pour optimiser l’effet nettoyant.</p>",
        "image":"shampoing-bio-dictame-ciste-eau-de-rose.jpg",
        "price": 21.00
    },
    {
        "id": 5,
        "category":"bien-etre",
        "subCategory":"corps",
        "name": "Sérum corporel Bio hydratant en profondeur (250 ml)",
        "description": "<p>Avec aloès, ciste (aladania) et ambre</p><p>Il raffermit la peau et procure une&nbsp; d’hydratation unique. Il rafraîchit et hydrate la peau en profondeur. Le sérum pour le corps à l’aloès, au ciste et à l’ambre est récompensé comme le meilleur produit de soins corporels en 2017 en Suède. Les ingrédients hydratants de l’aloès hydratent la peau, tandis que les composants antioxydants des huiles végétales contribuent à une apparence jeune et éclatante de l’épiderme. Ses ingrédients naturels sont reconnus par l’épiderme et sont immédiatement absorbés par la peau. Il ne laisse pas de traces de gras et ne colle pas.</p>",
        "image":"serum-corporel-hydratant-en-profondeur.jpg",
        "price": 32.00
    },
    {
        "id": 6,
        "category":"bien-etre",
        "subCategory":"visage",
        "name": "Crème régénératrice au mucus d’escargot",
        "description": "<p>Produit 100% naturel</p><p>70% de mucus d’escargot, ce qui en fait l’un des meilleurs produits sur le marché du fait de sa forte concentration en Allantoïne. “Vous ne pourrez plus vous en passer !”.</p>",
        "image":"creme-mucus-escargot.jpg",
        "price": 59.00
    },
    {
        "id": 7,
        "category":"vrac",
        "subCategory":"herbes-aromatiques",
        "name": "Origan Bio (20g)",
        "description": "<p>Une herbe aromatique avec une saveur intense pour accompagner vos plats, pizzas, salade de féta.</p><p>Le père de la médecine, Hippocrate, recommandait l’origan pour les problèmes oculaires ” inflammation de l’œil’, les rages de dents, les difficultés respiratoires, les rhumes et les troubles gynécologiques.</p>",
        "image":"origan.jpg",
        "price": 2.60
    },
    {
        "id": 8,
        "category":"vrac",
        "subCategory":"infusions",
        "name": "Dictame de Crète (20g)",
        "description": "<p>Les premières représentations du dictame datent de 1 500 av. J.C. dans une fresque située sur le mur d’un palais Minoen.<br>Premier antiseptique en usage externe cité dans les tablettes en linéaire B circa 1 300 av. J.-C., le dictame est connu par les peuples de l’Antiquité, de Grèce et d’Égypte (où il était exporté) pour ses vertus médicinales. La littérature médicale antique prescrit le dictame en infusion pour les maux d’estomac, les problèmes intestinaux, les grossesses à risque et les menstruations douloureuses. En utilisation externe il sert d’antiseptique et de coagulant.</p>",
        "image":"dictame.jpg",
        "price": 5.00
    },

]

//console.log(category)




