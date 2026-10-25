# Объявление Facebook / Instagram (польский)

Картинки: `kreacja-1080x1080.png` (лента, квадрат) и `kreacja-1080x1350.png` (лента 4:5).
Ссылка объявления ведёт на `index.html` (лендинг-статья).

## Вариант A (основной)

**Основной текст (Primary text):**
Po waloryzacji o 5,3% zmieniły się kwoty z ZUS. Rocznik 1951 dostaje w tym roku nowy dodatek: 366,68 zł miesięcznie, bez wniosku. Stulatkowie: 6938,92 zł. Zobacz kwoty dla każdego rocznika.

**Заголовок (Headline):**
Rocznik 1951: +366,68 zł co miesiąc z ZUS

**Описание (Description):**
Kwoty dla każdego rocznika na 2026 r.

**Кнопка:** Dowiedz się więcej

## Вариант B (для теста)

**Основной текст:**
Seniorzy urodzeni w 1951 roku i wcześniej dostają w 2026 r. dodatek 366,68 zł miesięcznie. ZUS dolicza go sam. Zobacz też, ile wynoszą trzynastka, czternastka i świadczenie dla stulatków.

**Заголовок:**
Dodatki z ZUS 2026: kwoty według rocznika

**Описание:**
Trzynastka, czternastka, dodatek pielęgnacyjny

**Кнопка:** Dowiedz się więcej

## Что нельзя писать в объявлении (отклонят)

- Обращение к возрасту или деньгам читателя: «Jesteś emerytem?», «Twój rocznik», «Masz ponad 65 lat?». Это нарушает правило Meta о личных характеристиках.
- Скрытые детали: «w tych latach», «ten rocznik», «sprawdź, czy jesteś na liście». Это кликбейт. На самой странице такой заголовок можно, в объявлении нельзя.
- «Wszyscy dostaną 5000 zł» и любые обещания денег, которых нет в статье.
- Логотип ZUS и оформление «под ZUS».

## Перед запуском

1. В `script.js` в строке `const MORE_NEWS_URL = '#';` поставить свою ссылку (поток ван профит). Метки из адреса (utm, fbclid) добавятся к ней сами.
2. Сделать страницы «Polityka prywatności» и «Kontakt» (ссылки в подвале сейчас пустые). Без политики конфиденциальности Meta может отклонить.
3. Если нужен пиксель, вставить его код в `index.html` на место комментария в `<head>`.
4. Фото подгружаются с Unsplash (лицензия бесплатная, для рекламы можно).
