# Changelog

 ## [3.5.2] - 20/02/2026

 ### Corrections
 - Fix onglets **FontAwesome** et **Instruments géométriques** vides : un `</div>` manquant à la fin de l'onglet `#doc` causait l'imbrication de `#geom` et `#fontawesome` à l'intérieur de `#doc` — ces onglets étaient invisibles car leur parent était masqué par `openTab()`

 ## [3.5.1] - 20/02/2026
- Fix liens morts documentation

 ## [3.5.0] - 20/02/2026

 ### Panneau snippets — Nouvel onglet PGF/TikZ Géométrie pure
 - Onglet dédié aux constructions géométriques en TikZ pur (sans package externe)
 - **Environnement** : `tikzpicture` avec `usetikzlibrary{calc,intersections,through,angles,quotes}` + grille `help lines`
 - **Points & Étiquettes** : `\coordinate`, marques de point `+` et `×` (croix droite/oblique via `+`), `\node` étiquette
 - **Bibliothèque `calc`** : milieu `!0.5!`, point intermédiaire `!t!`, distance fixe `!1cm!`, rotation `!1!90:`, distance via `veclen`
 - **Bibliothèque `intersections`** : chemins nommés segment/cercle/générique (`\draw[name path=]`, `\path[name path=]`), calcul d'intersection
 - **Tracés** : segment, demi-droite `[->]`, droite prolongée — variantes nommées inline `[name path=]`
 - **Cercles** : `circle [radius]`, `\node circle through` avec nommage inline `(name) [name path=name, ...]`
 - **Triangles** : par 3 sommets, par côté + 2 angles (intersection de demi-droites), par coordonnées
 - **Angles** : `\pic {angle}`, `\pic` avec étiquette α (bibliothèques `angles` + `quotes`), angle droit via `calc`
 - **Droites remarquables** : bissectrice (barycentre des vecteurs unitaires + angles égaux), médiatrice (perpendiculaire + marques d'égalité AM=MB + angle droit), hauteur (projection orthogonale `(B)!(A)!(C)` + angle droit)

 ### Panneau snippets — Onglet TeX3R
 - Ajout des templates **Nouveau Cours** et **Nouveau Devoir** dans la catégorie Général

 ### Corrections et améliorations
 - Infobulles (`title=`) sur tous les boutons de la barre d'onglets
 - Correction des marques de points : utilisation de `+` (relatif fixe) au lieu de `++` (déplaçant le point courant)

 ## [3.3.8] - 15/03/2024

 - Modification de `propriété` par `propriete` dans le panel. 

 ## [3.3.7] - 20/02/2024

  - Changement de version du viewer pdf.
 
 ## [3.3.6] - 20/02/2024

 - Ajout du bloc Scratch ```dire () pendant (2) secondes```
 - Ajout du bloc Scratch ```quand la touche espace est pressée```
 - Suppression de `montitre` dans la structure.

 ## [3.3.5] - 12/02/2024

 - Réorganisation du changelog
 - Test de reupload : problème de mise à jour

 ## [3.3.4] - 02/02/2024

 - Correction du snippet document1
 - Correction du snippet enonce
 - Changement du miroir de la documentation ProfCollege (souci pare-feu pédagogique avec l'ancienne adresse)
 - Raccourci center rajouté à centré dans les snippets
 - Modification des deux blocs repeat dans le panel (ajustements)
 - Double quotes rajoutées pour le nom du chapitre afin de permettre des apostrophes dans le nom du chapitre dans les snippets et le panel

 ## [3.3.3] - 24-01-2024
 - Correction d'une erreur dans le snippet document
 - Changement de la commande ```exercice``` en ```structure```
 - Snippets modifiés pour faire apparaître structure ou structure*
 - Snippets enonce/correction corrigés
 - ```\Circled``` ajouté dans snippets/panel

## [3.3.2] - 17-01-2024
 - Modification du logo
 - Ajout du Œ et du œ
 - Ajout de  \text dans les snippets
 - Ajout du paysage dans le  panel et les snippets
 - Paramètres complets dans nouveau document du panel au lieu de paramères simplifiés
 - Snippets document1/document2 pour les paramètres normaux ou simplifiés
 - Modification du commentaire pour le snippet/panel de montitre
 - Modification du snippet/panel de tasks
 - Ajout de interLL et interLC dans le panel tkz-euclide
 - Ajout de ```exercice``` pour se repérer dans la structure d'un document dans snippet/panel de ```enonce```

## [3.3.1] - 23-12-2023
 - Corrections mineures
 - Snippets de paramétrage modifiés.
 - Onglet documentations modifié
 - Snippet ```parametres``` déplacé dans lua-snippet.json

## [3.3.0] - 19-12-2023
 - Refonte visuelle des onglets du panel
 - Ajouts mineurs dans le panel principal
 - Modification des snippets clavier
 - Ajout de l'onglet documentations dans le panel

## [3.2.0] - 19-12-2023
 - Ajout de l'onglet scratch3 dans le panel

## [3.1.0] - 10-12-2023
 - Ajout de l'onglet tkz-euclide dans le panel

## [3.0.0] - 16-11-2023
 - Mise à jour moteur Latex-Workshop [9.15.0]
 - Conversion extension en html, TeXR est accessible dans un onglet du Snippet-View
 - Modification des snippets clavier