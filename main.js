// Fonction pour rafraîchir la page manuellement et stocker une information dans sessionStorage
function refreshPage() {
    sessionStorage.setItem("refresh", "true"); // Enregistre qu'un rafraîchissement manuel a eu lieu
    location.reload(); // Rafraîchit la page
}

// Vérifie si la page a été rechargée
window.onload = function () {
    // Si "refresh" est dans sessionStorage, affiche le pop-up
    if (sessionStorage.getItem("refresh") === "true") {
        showNotification(); // Appelle la fonction pour afficher la notification
        sessionStorage.removeItem("refresh"); // Supprime la variable
    } else if (performance.navigation.type === 1) {
        // Détecte un rechargement de page (1 correspond à un reload)
        showNotification(); // Affiche aussi la notification si le rechargement est dû au navigateur
    }
};

// Fonction pour afficher et masquer le pop-up avec un effet de fondu
function showNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "block"; // Affiche le pop-up
    setTimeout(() => {
        notification.style.opacity = "1"; // Apparition avec transition
    }, 100); // Légère pause pour appliquer la transition

    // Cache la notification après 3 secondes
    setTimeout(function () {
        notification.style.opacity = "0"; // Commence la disparition en fondu
    }, 5000);
}

// Sélection des éléments HTML
const menuButton = document.querySelector(".menu-button");
const menuOverlay = document.getElementById("menu-overlay");
const closeMenuButton = document.querySelector(".close-menu");

// Ouvrir le menu
menuButton.addEventListener("click", () => {
    menuOverlay.classList.add("active");
});

// Fermer le menu
closeMenuButton.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
});

// Fermer le menu en cliquant en dehors du contenu
menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove("active");
    }
});

/* --------------------------------------------------------- */
/* --------------------------------------------------------- */
/* --------------------------------------------------------- */

// Fonction pour remonter en haut de la page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Défilement fluide vers le haut
    });
}

// Ajouter l'événement de clic au bouton "scroll-top-button"
document.querySelector(".scroll-top-button").onclick = scrollToTop;

/* --------------------------------------------------------- */
/* --------------------------------------------------------- */
/* --------------------------------------------------------- */

function goBack() {
    window.history.back(); // Retourne à la page précédente
}

document.getElementById("CopyIBAN").addEventListener("click", function() {
        // Le texte à copier
        const texte = this.innerText;

        // Copier le texte dans le presse-papiers
        navigator.clipboard.writeText(texte)
            .then(() => {
                alert("Texte copié dans le presse-papiers !");
            })
            .catch(err => {
                console.error("Erreur lors de la copie : ", err);
            });
    });


// Fonction pour générer un flocon de neige
function createSnowflake() {
    const snowflake = document.createElement("i");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄"; // Utilisation du symbole de flocon de neige

    // Position et style aléatoires
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Durée aléatoire
    snowflake.style.opacity = Math.random();

    document.querySelector(".snow-container").appendChild(snowflake);

    // Supprimer le flocon après l'animation
    setTimeout(() => {
        snowflake.remove();
    }, 5000); // Durée de vie d'un flocon
}

// Génère un nouveau flocon toutes les 300 ms
setInterval(createSnowflake, 300);
