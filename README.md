# task-manager

1. Naslov projekta

# Task Management App

2. Opis projekta

Ovaj projekat je jednostavna aplikacija za upravljanje zadacima koja omogucava korisnicima kreiranje, uredjivanje, filtriranje, sortiranje, brisanje i oznacavanje zadataka kao zavrsenih. Aplikacija koristi moderni dizajn i omogucava jednostavnu interakciju sa zadacima kroz intuitivni korisnicki interfejs.

3. **Tehnologije koriscene u projektu**

- HTML5: Struktura aplikacije
- CSS3: Stilizacija i dizajn aplikacije
- JavaScript (ES6+): Funkcionalnosti aplikacije, manipulacija DOM-a, upravljanje zadacima
- Bootstrap 5: Korisnicki interfejs, modali, stilizacija dugmadi
- LocalStorage API: Skladistenje podataka u pretrazivacu

4. **Struktura projekta**

/project-root
│
├── index.html
├── /css
│   └── styles.css
├── /js
│   ├── main.js
│   ├── events.js
│   ├── storage.js
│   ├── ui.js
│   ├── task.js
│   └── taskUtils.js
└── /assets
    └── images, icons, etc.

5. **Opis funkcionalnosti**

- Kreiranje zadataka: Korisnici mogu uneti naziv zadatka i otvoriti modalni prozor za dalje uredjivanje i dodeljivanje prioriteta.
- Izmena zadataka: Korisnici mogu otvoriti postojece zadatke i izmeniti njihovo ime, opis i prioritet.
- Brisanje zadataka: Korisnici mogu obrisati zadatak.
- Oznacavanje zadataka kao zavrsenih: Korisnici mogu oznaciti zadatke kao zavrsene ili ih reaktivirati.
- Filtriranje i sortiranje zadataka: Korisnici mogu filtrirati zadatke po statusu (svi, zavrseni, nezavrseni) i sortirati ih po datumu i prioritetu.
- Pretraga zadataka: Korisnici mogu pretrazivati zadatke po imenu ili opisu.

**Prioriteti zadataka: Zadaci su vizualno diferencirani na osnovu prioriteta koji im je dodeljen**:

- Visoki prioritet: Oznacen crvenom bojom.
- Srednji prioritet: Oznacen narandzastom bojom.
- Niski prioritet: Oznacen zelenom bojom.
- Bez prioriteta: Oznacen sivom bojom.

Ove boje omogucavaju brz pregled i lakse upravljanje zadacima

6. **Opis modula (JavaScript fajlova)**

**main.js**

- Zaduzen za inicializaciju aplikacije.
- Sadrzi DOMContentLoaded event koji pokrece inicialno ucitavanje zadataka.

**events.js**

- Sadrzi sve event listenere potrebne za interakciju sa aplikacijom.
- Obuhvata dogadjaje za kreiranje, uredjivanje, brisanje, oznacavanje zadataka i rad sa modalnim prozorima.
- Upravljanje filtriranjem, sortiranjem i pretragom zadataka.

**storage.js**

- Zaduzen za upravljanje zadacima u Local Storage-u.
- Sadrzi funkcije za dodavanje, uzimanje, azuriranje i brisanje zadataka.

**ui.js**

- Zaduzen za upravljanje korisnickim interfejsom.
- Sadrzi funkcije za kreiranje i prikazivanje zadataka na ekranu.
- Sadrzi funkcije za upravljanje modalnim prozorima.

**task.js**

- Sadrzi klasu Task koja predstavlja model zadatka.
- Klasa definise strukturu zadatka sa svim potrebnim atributima.

**taskUtils.js**

- Sadrzi pomocne funkcije za filtriranje, sortiranje, formatiranje datuma i isticanje teksta.
- Ove funkcije olaksavaju manipulaciju i prikaz zadataka u aplikaciji.

7. Uputstvo za instalaciju i pokretanje projekta

**Pokretanje projekta**

- Otvori index.html fajl u pretrazivacu.

**Zavrsne napomene:**

- Aplikacija koristi Local Storage za cuvanje zadataka, sto znaci da podaci ostaju sacuvani cak i nakon zatvaranja pretrazivaca.

8. Potencijalna poboljsanja i dalje smernice

- Implementacija back-end servera: Trenutno se zadaci cuvaju u Local Storage-u. Moze se implementirati back-end server za skladistenje zadataka i omogucavanje sinhronizacije izmedju razlicitih uredjaja.
- Napredna validacija unosa: Dodavanje dodatnih pravila za validaciju unosa korisnika u formama.
- Podrska za vise korisnika: Omogucavanje kreiranja i upravljanja zadacima za vise korisnika sa razlicitim nalozima.
- Dodavanje notifikacija i obavestenja: Implementacija sistema obavestenja za podsecanje na rokove ili promene zadataka.