<?php
$pageTitle = 'Emerytura honorowa: kto może otrzymać ponad 5 tys. zł?';
$today = date('j.m.Y');
?>
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sprawdź, komu przysługuje emerytura honorowa, ile wynosi i jak jest wypłacana.">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?> | Dzień Seniora</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="site.php" aria-label="Dzień Seniora — strona główna"><span class="brand-mark">DS</span><span>Dzień Seniora<small>Wiadomości i sprawy ważne</small></span></a>
      <nav aria-label="Nawigacja główna"><a href="#artykul">Świadczenia</a><a href="#zasady">Poradnik</a><a href="privacy.php">Prywatność</a><a class="contact-button" href="contacts.php">Kontakty</a></nav>
    </div>
  </header>
  <main class="page-wrap" id="artykul">
    <div class="breadcrumbs"><a href="site.php">Strona główna</a><span>›</span><span>Emerytury</span></div>
    <div class="article-grid">
      <article>
        <p class="eyebrow">EMERYTURY <span>•</span> PORADNIK</p>
        <h1>Emerytura honorowa: kto może otrzymać ponad 5 tys. zł?</h1>
        <p class="dek">Specjalne świadczenie przysługuje po ukończeniu 100 lat. Sprawdź, kto je wypłaca, jak wygląda wniosek i dlaczego kwota zależy od daty przyznania.</p>
        <div class="byline"><span class="avatar">DS</span><span><strong>Redakcja Dzień Seniora</strong><small>Aktualizacja: <?= htmlspecialchars($today, ENT_QUOTES, 'UTF-8') ?></small></span><span class="read-time">5 min czytania</span></div>
        <figure class="hero">
          <img src="https://fieldbrook.info/images/news/rectangular/0acf800eeac69a3a0f595f7ccc24bd2c.png" alt="Uśmiechnięta starsza para podczas spaceru" fetchpriority="high">
          <figcaption>Emerytura honorowa jest związana z ukończeniem setnego roku życia. Fot. materiał ilustracyjny</figcaption>
        </figure>
        <div class="article-body">
          <p class="lead">Nagłówek o dodatkowych 5 tysiącach złotych może przyciągać uwagę, ale świadczenie honorowe nie jest dodatkiem dla wszystkich emerytów. Przysługuje osobom, które ukończyły 100 lat, i jest wypłacane dożywotnio.</p>
          <div class="notice"><strong>Najważniejsze:</strong> samo pobieranie emerytury nie wystarczy. Podstawowym warunkiem jest ukończenie 100 lat. Wysokość świadczenia zależy od przepisów obowiązujących w dniu przyznania.</div>
          <h2 id="zasady">Czym jest emerytura honorowa?</h2>
          <p>To szczególne świadczenie przyznawane stulatkom, niezależne od długości stażu pracy i wysokości zwykłej emerytury. Mogą je otrzymać także osoby, które nigdy nie pracowały zawodowo. Świadczenie jest wypłacane co miesiąc.</p>
          <h2>Kto wypłaca świadczenie?</h2>
          <p>Wypłatą zajmuje się instytucja, która obsługuje daną osobę. Może to być Zakład Ubezpieczeń Społecznych (ZUS) albo Kasa Rolniczego Ubezpieczenia Społecznego (KRUS). W przypadku osób nieobjętych ubezpieczeniem w tych instytucjach potrzebne jest złożenie wniosku wraz z dokumentem potwierdzającym wiek.</p>
          <h2>Jak ustalana jest kwota?</h2>
          <p>Wysokość emerytury honorowej jest powiązana z datą jej przyznania. Kwota może wzrosnąć w ramach corocznej waloryzacji, ale podwyżka dotyczy osób, którym świadczenie zostanie przyznane po nowej stawce. Dlatego osoby, które otrzymują je od wcześniejszej daty, mogą mieć inną kwotę.</p>
          <p>W przytoczonych danych wskazano 4944,70 zł dla osób, które ukończyły 100 lat przed 1 marca 2026 r., oraz 5440,25 zł brutto dla osób, które osiągnęły ten wiek po tej dacie. Przed podjęciem decyzji warto sprawdzić aktualną stawkę i indywidualną sytuację bezpośrednio w ZUS lub KRUS.</p>
          <h2>Czy trzeba składać wniosek?</h2>
          <p>Osoby pobierające świadczenie z ZUS lub KRUS zazwyczaj nie muszą składać dodatkowego wniosku — przyznanie następuje z urzędu. Osoba, która nie podlegała ubezpieczeniu w żadnej z tych instytucji, powinna skontaktować się z właściwym organem i przedstawić dokument potwierdzający ukończenie 100 lat.</p>
          <h2>Coraz więcej stulatków</h2>
          <p>Liczba osób pobierających emeryturę honorową rośnie wraz ze zmianami demograficznymi. Zestawienia ZUS nie muszą obejmować wszystkich uprawnionych — osobne dane dotyczą m.in. osób obsługiwanych przez KRUS oraz części emerytowanych służb mundurowych.</p>
          <div class="source-note">Informacje mają charakter ogólny i redakcyjny. Szczegóły dotyczące prawa do świadczenia oraz jego aktualnej wysokości należy potwierdzić w ZUS, KRUS lub właściwej instytucji.</div>
        </div>
      </article>
      <aside class="sidebar">
        <div class="side-card"><p class="side-label">W SKRÓCIE</p><h2>Komu przysługuje świadczenie?</h2><ul><li>Osobom po ukończeniu 100 lat</li><li>Niezależnie od stażu pracy</li><li>Zwykle przyznawane automatycznie przez ZUS lub KRUS</li></ul><a href="#zasady" class="text-link">Poznaj zasady <span>→</span></a></div>
        <div class="side-quote"><span>„</span><p>Warto potwierdzić swoją sytuację w instytucji wypłacającej świadczenie.</p><small>PORADNIK DLA SENIORÓW</small></div>
      </aside>
    </div>
  </main>
  <footer class="site-footer"><div class="footer-inner"><a class="brand footer-brand" href="site.php"><span class="brand-mark">DS</span><span>Dzień Seniora<small>Wiadomości i sprawy ważne</small></span></a><p>Przystępnie o świadczeniach i codziennych sprawach.</p><a href="privacy.php">Polityka prywatności</a><small>© <?= date('Y') ?> Dzień Seniora</small></div></footer>
</body>
</html>
