# Mockup ↔ site comparison

Mockup: `docs/design/concept-03/prototipo.html`  
Site: `http://localhost:4173` (static export of `feat/redesign` at the end of Phase 11, built with the same font files as the mockup)  
Tolerance: ±max(2px, 6%). **Bold** = mismatch. `yInSheet` = distance from the top of the element's sheet.

## inicio @ 1440×900

Header 114 → 114px · scroll area 786 → 900px · page height 2130 → 1585px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | 416 | 12 | 412 | 20 |
| strip button | Space Grotesk | 12.8 | 400 | normal | normal | 0.4 | uppercase | rgb(255, 235, 214) | 848 | **7 → 0** | **176 → 209** | **30 → 44** |
| logo | **Anton → dmSans** | **32 → 16** | 400 | normal | **32 → 24** | 1.3 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | 51 | **57 → 63** | 104 | **44 → 32** |
| nav link | Source Serif 4 | 15.7 | 600 | normal | normal | -0.1 | none | rgb(255, 235, 214) | **431 → 356** | 57 | 94 | 44 |
| WhatsApp button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(255, 235, 214) | 1046 | 55 | 110 | 48 |
| Contáctanos button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(34, 26, 8) | 1166 | 55 | 136 | 48 |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 1312 | 57 | 36 | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| hero eyebrow | DM Sans | 11.5 | **700 → 400** | normal | 17.3 | 3.5 | uppercase | **rgb(201, 162, 122) → rgb(240, 232, 220)** | 131 | **160 → 112** | 1178 | 17 |
| hero h1 | DM Sans | 132.5 | 800 | normal | 119.2 | -3.3 | uppercase | rgb(240, 232, 220) | 131 | **225 → 152** | **1088 → 1176** | 358 |
| hero h1 accent | Cormorant Garamond | 137.8 | **400 → 800** | italic | **110.2 → 121.3** | 0 | none | rgb(224, 147, 138) | 131 | **202 → 269** | **892 → 1176** | **286 → 121** |
| hero lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | 131 | **647 → 539** | 576 | 58 |
| hero button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | 131 | **733 → 625** | **183 → 172** | 48 |
| hero meta | DM Sans | 12.5 | **700 → 400** | normal | 23.7 | 1.7 | uppercase | rgb(201, 162, 122) | 1011 | **733 → 625** | 298 | 47 |
| footer title | DM Sans | **72 → 48.5** | 800 | normal | **64.8 → 48.5** | -1.8 | uppercase | rgb(14, 10, 10) | 131 | 80 | **465 → 411** | **65 → 48** |
| footer lead | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(240, 232, 220) | 131 | **224 → 148** | **183 → 161** | 48 |
| footer column heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(14, 10, 10) | **628 → 583** | 80 | **206 → 343** | 14 |
| footer link | DM Sans | 16 | **500 → 400** | normal | normal | 0 | none | rgb(14, 10, 10) | **628 → 583** | 104 | **140 → 126** | 44 |
| footer nav link | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer wordmark | Cormorant Garamond | **445.6 → 316.8** | 500 | **normal → italic** | **713 → 228.1** | **-13.4 → -7.9** | none | rgb(14, 10, 10) | **0 → 132** | 381 | **1440 → 1176** | **713 → 228** |
| footer legal link | DM Sans | 12.8 | 400 | normal | normal | 0 | none | rgb(14, 10, 10) | 1046 | **1054 → 625** | 115 | 44 |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | El cuidado de tu piel, como  · 1016 / 160 / 235.8 · rgb(14, 10, 10) · 0px | El cuidadode tu piel,como un · 786 / 112 / 64 · rgb(14, 10, 10) · 0px |
| 2 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](inicio-1440-0.jpg) [1](inicio-1440-1.jpg) [2](inicio-1440-2.jpg) [3](inicio-1440-3.jpg) 

## inicio @ 390×844

Header 108 → 108px · scroll area 736 → 844px · page height 1714 → 1720px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | **63 → 57** | **12 → 0** | 264 | **20 → 44** |
| logo | **Anton → dmSans** | **28 → 16** | 400 | normal | **28 → 24** | 1.1 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | **20 → 26** | **54 → 62** | **91 → 97** | **44 → 28** |
| nav link | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| WhatsApp button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| Contáctanos button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 239 | 54 | 36 | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| hero eyebrow | DM Sans | 11.5 | **700 → 400** | normal | 17.3 | 3.5 | uppercase | **rgb(201, 162, 122) → rgb(240, 232, 220)** | **20 → 26** | **64 → 80** | 350 | 17 |
| hero h1 | DM Sans | **41.6 → 37.5** | 800 | normal | **37.4 → 33.8** | -1 | uppercase | rgb(240, 232, 220) | **20 → 26** | **105 → 120** | 350 | **112 → 103** |
| hero h1 accent | Cormorant Garamond | **43.3 → 39** | **400 → 800** | italic | 34.6 | 0 | none | rgb(224, 147, 138) | **20 → 26** | **97 → 154** | **280 → 339** | **89 → 35** |
| hero lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | **20 → 26** | 250 | 350 | 86 |
| hero button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **20 → 26** | 364 | **183 → 172** | 48 |
| hero meta | DM Sans | 12.5 | **700 → 400** | normal | 23.7 | 1.7 | uppercase | rgb(201, 162, 122) | **20 → 26** | 444 | 350 | 47 |
| footer title | DM Sans | **35.2 → 30.6** | 800 | normal | 31.7 | -0.9 | uppercase | rgb(14, 10, 10) | **20 → 26** | **48 → 80** | 350 | 32 |
| footer lead | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(240, 232, 220) | **20 → 26** | **159 → 131** | **183 → 161** | 48 |
| footer column heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(14, 10, 10) | **20 → 26** | **239 → 219** | 350 | 14 |
| footer link | DM Sans | 16 | **500 → 400** | normal | normal | 0 | none | rgb(14, 10, 10) | **20 → 26** | **262 → 243** | **140 → 126** | 44 |
| footer nav link | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer wordmark | Cormorant Garamond | **120.6 → 85.8** | 500 | **normal → italic** | **193 → 61.8** | -3.6 | none | rgb(14, 10, 10) | **0 → 26** | **876 → 686** | **390 → 339** | **193 → 62** |
| footer legal link | DM Sans | 12.8 | 400 | normal | normal | 0 | none | rgb(14, 10, 10) | **20 → 26** | **1122 → 816** | 115 | 44 |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | El cuidado de tu piel, como  · 531 / 64 / 40 · rgb(14, 10, 10) · 0px | El cuidadode tu piel,como un · 736 / 80 / 64 · rgb(14, 10, 10) · 0px |
| 2 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](inicio-390-0.jpg) [1](inicio-390-1.jpg) [2](inicio-390-2.jpg) [3](inicio-390-3.jpg) 

## servicios @ 1440×900

Header 161 → 159px · scroll area 739 → 900px · page height 2445 → 2054px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | 416 | 12 | 412 | 20 |
| strip button | Space Grotesk | 12.8 | 400 | normal | normal | 0.4 | uppercase | rgb(255, 235, 214) | 848 | **7 → 0** | **176 → 209** | **30 → 44** |
| logo | **Anton → dmSans** | **32 → 16** | 400 | normal | **32 → 24** | 1.3 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | 51 | **57 → 63** | 104 | **44 → 32** |
| nav link | Source Serif 4 | 15.7 | 600 | normal | normal | -0.1 | none | rgb(255, 235, 214) | **431 → 356** | 57 | 94 | 44 |
| WhatsApp button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(255, 235, 214) | 1046 | 55 | 110 | 48 |
| Contáctanos button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(34, 26, 8) | 1166 | 55 | 136 | 48 |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 1312 | 57 | 36 | 44 |
| crumb | Source Serif 4 | 14.7 | 600 | normal | normal | 0 | none | rgb(156, 145, 125) | 51 | 116 | **43 → 39** | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| column (first) | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | 0 | 0 | 480 | 739 |
| column count | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(201, 162, 122) | **35 → 28** | 639 | 411 | 14 |
| column title | DM Sans | 46.1 | 800 | normal | **43.8 → 48.5** | -0.7 | uppercase | rgb(240, 232, 220) | **35 → 28** | 661 | 411 | **44 → 48** |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **192 → 159.8** | 800 | normal | **172.8 → 143.8** | -4.8 | uppercase | rgb(240, 232, 220) | 131 | **229 → 96** | 1178 | **173 → 144** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | 131 | **426 → 264** | 576 | 29 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | 131 | **487 → 325** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Servicios · 739 / 0 / 0 · rgb(14, 10, 10) · 0px | Servicios · 741 / 0 / 0 · rgb(14, 10, 10) · 0px |
| 2 | ¿Hablamos? · 593 / 128 / 128 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 469 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 3 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](servicios-1440-0.jpg) [1](servicios-1440-1.jpg) [2](servicios-1440-2.jpg) [3](servicios-1440-3.jpg) 

## servicios @ 390×844

Header 155 → 153px · scroll area 689 → 844px · page height 2241 → 2116px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | **63 → 57** | **12 → 0** | 264 | **20 → 44** |
| logo | **Anton → dmSans** | **28 → 16** | 400 | normal | **28 → 24** | 1.1 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | **20 → 26** | **54 → 62** | **91 → 97** | **44 → 28** |
| nav link | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| WhatsApp button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| Contáctanos button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 239 | 54 | 36 | 44 |
| crumb | Source Serif 4 | 14.7 | 600 | normal | normal | 0 | none | rgb(156, 145, 125) | **20 → 26** | 110 | **43 → 39** | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| column (first) | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | 0 | 0 | 390 | 230 |
| column count | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(201, 162, 122) | 20 | 159 | 350 | 14 |
| column title | DM Sans | 30.4 | 800 | normal | 28.9 | -0.5 | uppercase | rgb(240, 232, 220) | 20 | 181 | 350 | 29 |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **54.6 → 45.8** | 800 | normal | **49.1 → 41.3** | -1.4 | uppercase | rgb(240, 232, 220) | **20 → 26** | **165 → 96** | 350 | **49 → 41** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | **20 → 26** | **238 → 161** | 350 | 58 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **20 → 26** | **328 → 252** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Servicios · 689 / 0 / 0 · rgb(14, 10, 10) · 0px | Servicios · 691 / 0 / 0 · rgb(14, 10, 10) · 0px |
| 2 | ¿Hablamos? · 370 / 64 / 64 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 396 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 3 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](servicios-390-0.jpg) [1](servicios-390-1.jpg) [2](servicios-390-2.jpg) [3](servicios-390-3.jpg) 

## faciales @ 1440×900

Header 161 → 159px · scroll area 739 → 900px · page height 7472 → 7049px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | 416 | 12 | 412 | 20 |
| strip button | Space Grotesk | 12.8 | 400 | normal | normal | 0.4 | uppercase | rgb(255, 235, 214) | 848 | **7 → 0** | **176 → 209** | **30 → 44** |
| logo | **Anton → dmSans** | **32 → 16** | 400 | normal | **32 → 24** | 1.3 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | 51 | **57 → 63** | 104 | **44 → 32** |
| nav link | Source Serif 4 | 15.7 | 600 | normal | normal | -0.1 | none | rgb(255, 235, 214) | **431 → 356** | 57 | 94 | 44 |
| WhatsApp button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(255, 235, 214) | 1046 | 55 | 110 | 48 |
| Contáctanos button | Space Grotesk | **14.4 → 12** | 400 | normal | normal | **0.3 → 2.4** | uppercase | rgb(34, 26, 8) | 1166 | 55 | 136 | 48 |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 1312 | 57 | 36 | 44 |
| crumb | Source Serif 4 | 14.7 | 600 | normal | normal | 0 | none | rgb(156, 145, 125) | 51 | 116 | **43 → 39** | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| intro chip (active) | DM Sans | 11.5 | **700 → 400** | normal | normal | 2.1 | uppercase | rgb(14, 10, 10) | 131 | **112 → 362** | **115 → 106** | 44 |
| intro eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(201, 162, 122) | 131 | **188 → 64** | 1178 | 15 |
| intro h1 | DM Sans | **208 → 159.8** | 800 | normal | **187.2 → 143.8** | -5.2 | uppercase | rgb(240, 232, 220) | 131 | **223 → 104** | 1178 | **187 → 144** |
| intro lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(201, 162, 122) | 131 | **434 → 272** | 576 | 58 |
| intro scroll cue | DM Sans | 11.5 | **700 → 400** | normal | normal | 2.3 | uppercase | **rgb(132, 122, 111) → rgb(201, 162, 122)** | **1236 → 132** | 446 | **73 → 1176** | **34 → 16** |
| window 1 counter | DM Sans | 16 | **900 → 400** | normal | normal | **1 → 3.2** | uppercase | rgb(224, 147, 138) | **131 → 721** | **125 → 106** | **19 → 22** | **21 → 24** |
| window 1 title | DM Sans | 89.3 | 800 | normal | 80.4 | -2.2 | uppercase | rgb(240, 232, 220) | **131 → 721** | **166 → 146** | **667 → 587** | 161 |
| window 1 description | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | **rgba(240, 232, 220, 0.82) → rgb(240, 232, 220)** | **131 → 721** | 347 | 544 | 58 |
| window 1 list heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(224, 147, 138) | **131 → 721** | 428 | 576 | 14 |
| window 1 list item | DM Sans | 15.2 | 400 | normal | 20.5 | 0 | none | rgb(240, 232, 220) | **131 → 721** | 450 | 276 | **39 → 20** |
| window 1 button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **131 → 721** | **635 → 587** | 182 | 48 |
| window 1 image | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | **855 → 132** | **120 → 101** | 453 | 567 |
| window 3 title (long word) | DM Sans | **57.3 → 89** | 800 | normal | **51.6 → 84.6** | -1.4 | uppercase | rgb(14, 10, 10) | **131 → 721** | **235 → 138** | **667 → 587** | **52 → 169** |
| window 4 badge | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.2 | uppercase | rgb(224, 147, 138) | **642 → 132** | **151 → 104** | **221 → 587** | **29 → 16** |
| window 4 recommendation | DM Sans | 12.5 | **500 → 400** | normal | normal | **0.2 → 2.4** | **none → uppercase** | rgb(240, 232, 220) | **657 → 132** | **493 → 404** | **100 → 265** | **16 → 44** |
| others heading | **DM Sans → cormorant** | 11.5 | **700 → 300** | normal | normal | 3.5 | uppercase | rgb(224, 147, 138) | 131 | **166 → 80** | 1178 | 15 |
| others link | DM Sans | **112 → 48.5** | 800 | normal | **100.8 → 48.5** | -2.8 | uppercase | rgb(240, 232, 220) | 131 | **214 → 128** | **503 → 572** | **101 → 48** |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **192 → 159.8** | 800 | normal | **172.8 → 143.8** | -4.8 | uppercase | rgb(240, 232, 220) | 131 | **229 → 96** | 1178 | **173 → 144** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | 131 | **426 → 264** | 576 | 29 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | 131 | **487 → 325** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Faciales · 572 / 112 / 80 · rgb(14, 10, 10) · 0px | Faciales · 741 / 64 / 64 · rgb(14, 10, 10) · 0px |
| 2 | Facial hidratante · 739 / 40 / 80 · rgb(107, 20, 20) · 18px | FACIAL HIDRATANTE · 741 / 64 / 64 · rgb(107, 20, 20) · 18px |
| 3 | Anti acné o piel grasa · 739 / 40 / 80 · rgb(21, 16, 16) · 18px | ANTI ACNÉ O PIEL GRASA · 741 / 64 / 64 · rgb(21, 16, 16) · 18px |
| 4 | Hidrodermoabrasión · 739 / 40 / 80 · rgb(201, 162, 122) · 18px | HIDRODERMOABRASIÓN · 741 / 64 / 64 · rgb(201, 162, 122) · 18px |
| 5 | Facial HannaH · 949 / 40 / 221.7 · rgb(61, 26, 26) · 18px | FACIAL HANNAH · 753 / 64 / 64 · rgb(61, 26, 26) · 18px |
| 6 | Facial rejuvenecedor · 739 / 40 / 80 · rgb(107, 20, 20) · 18px | FACIAL REJUVENECEDOR · 987 / 64 / 270 · rgb(107, 20, 20) · 18px |
| 7 | Microdermoabrasión · 739 / 40 / 80 · rgb(21, 16, 16) · 18px | MICRODERMOABRASIÓN · 741 / 64 / 64 · rgb(21, 16, 16) · 18px |
| 8 | — · 551 / 96 / 96 · rgb(61, 26, 26) · 18px | Otras categorías · 291 / 80 / 80 · rgb(61, 26, 26) · 18px |
| 9 | ¿Hablamos? · 593 / 128 / 128 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 469 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 10 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](faciales-1440-0.jpg) [1](faciales-1440-1.jpg) [2](faciales-1440-2.jpg) [3](faciales-1440-3.jpg) 

## faciales @ 390×844

Header 155 → 153px · scroll area 689 → 844px · page height 9200 → 9474px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| strip text | Source Serif 4 | 14.7 | 400 | normal | normal | 0 | none | rgb(34, 26, 8) | **63 → 57** | **12 → 0** | 264 | **20 → 44** |
| logo | **Anton → dmSans** | **28 → 16** | 400 | normal | **28 → 24** | 1.1 | **uppercase → none** | **rgb(255, 235, 214) → rgba(0, 0, 0, 0)** | **20 → 26** | **54 → 62** | **91 → 97** | **44 → 28** |
| nav link | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| WhatsApp button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| Contáctanos button | *(not in mockup)*  |  |  |  |  |  |  |  |  |  |  |
| ES switch | Space Grotesk | 14.4 | 400 | normal | normal | 0 | none | rgb(255, 235, 214) | 239 | 54 | 36 | 44 |
| crumb | Source Serif 4 | 14.7 | 600 | normal | normal | 0 | none | rgb(156, 145, 125) | **20 → 26** | 110 | **43 → 39** | 44 |
| progress bar | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| intro chip (active) | DM Sans | 11.5 | **700 → 400** | normal | normal | 2.1 | uppercase | rgb(14, 10, 10) | **20 → 26** | **48 → 260** | **115 → 106** | 44 |
| intro eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(201, 162, 122) | **20 → 26** | **176 → 64** | 350 | 15 |
| intro h1 | DM Sans | **58.5 → 45.8** | 800 | normal | **52.7 → 41.3** | -1.5 | uppercase | rgb(240, 232, 220) | **20 → 26** | **211 → 104** | 350 | **53 → 41** |
| intro lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(201, 162, 122) | **20 → 26** | **288 → 169** | 350 | 58 |
| intro scroll cue | DM Sans | 11.5 | **700 → 400** | normal | normal | 2.3 | uppercase | **rgb(132, 122, 111) → rgb(201, 162, 122)** | **20 → 26** | 381 | **73 → 339** | **34 → 16** |
| window 1 counter | DM Sans | 16 | **900 → 400** | normal | normal | **1 → 3.2** | uppercase | rgb(224, 147, 138) | **20 → 26** | **87 → 64** | **19 → 22** | **21 → 24** |
| window 1 title | DM Sans | 38.4 | 800 | normal | 34.6 | -1 | uppercase | rgb(240, 232, 220) | **20 → 26** | **128 → 104** | 350 | 69 |
| window 1 description | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | **rgba(240, 232, 220, 0.82) → rgb(240, 232, 220)** | **20 → 26** | **218 → 197** | 350 | 86 |
| window 1 list heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(224, 147, 138) | **20 → 26** | 328 | 350 | 14 |
| window 1 list item | DM Sans | 15.2 | 400 | normal | 20.5 | 0 | none | rgb(240, 232, 220) | **20 → 26** | 350 | 350 | **39 → 20** |
| window 1 button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **20 → 26** | **652 → 550** | 182 | 48 |
| window 1 image | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | **20 → 26** | **728 → 630** | 350 | 263 |
| window 3 title (long word) | DM Sans | **30.4 → 38.4** | 800 | normal | **27.4 → 36.5** | -0.8 | uppercase | rgb(14, 10, 10) | **20 → 26** | **151 → 104** | 350 | **27 → 73** |
| window 4 badge | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.2 | uppercase | rgb(224, 147, 138) | **20 → 26** | **151 → 104** | **221 → 339** | **29 → 16** |
| window 4 recommendation | DM Sans | 12.5 | **500 → 400** | normal | normal | **0.2 → 2.4** | **none → uppercase** | rgb(240, 232, 220) | **34 → 26** | **396 → 329** | **100 → 265** | **16 → 44** |
| others heading | **DM Sans → cormorant** | 11.5 | **700 → 300** | normal | normal | 3.5 | uppercase | rgb(224, 147, 138) | **20 → 26** | **118 → 80** | 350 | 15 |
| others link | DM Sans | **38.4 → 30.6** | 800 | normal | **34.6 → 30.6** | -1 | uppercase | rgb(240, 232, 220) | **20 → 26** | **166 → 128** | **170 → 339** | **35 → 31** |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **54.6 → 45.8** | 800 | normal | **49.1 → 41.3** | -1.4 | uppercase | rgb(240, 232, 220) | **20 → 26** | **165 → 96** | 350 | **49 → 41** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | **20 → 26** | **238 → 161** | 350 | 58 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **20 → 26** | **328 → 252** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Faciales · 466 / 48 / 40 · rgb(14, 10, 10) · 0px | Faciales · 691 / 64 / 64 · rgb(14, 10, 10) · 0px |
| 2 | Facial hidratante · 1149 / 40 / 206.7 · rgb(107, 20, 20) · 18px | FACIAL HIDRATANTE · 1137 / 64 / 253.2 · rgb(107, 20, 20) · 18px |
| 3 | Anti acné o piel grasa · 1121 / 40 / 206.7 · rgb(21, 16, 16) · 18px | ANTI ACNÉ O PIEL GRASA · 1137 / 64 / 253.2 · rgb(21, 16, 16) · 18px |
| 4 | Hidrodermoabrasión · 1138 / 40 / 206.7 · rgb(201, 162, 122) · 18px | HIDRODERMOABRASIÓN · 1182 / 64 / 253.2 · rgb(201, 162, 122) · 18px |
| 5 | Facial HannaH · 1244 / 40 / 206.7 · rgb(61, 26, 26) · 18px | FACIAL HANNAH · 1226 / 64 / 253.2 · rgb(61, 26, 26) · 18px |
| 6 | Facial rejuvenecedor · 1166 / 40 / 206.7 · rgb(107, 20, 20) · 18px | FACIAL REJUVENECEDOR · 1177 / 64 / 253.2 · rgb(107, 20, 20) · 18px |
| 7 | Microdermoabrasión · 1040 / 40 / 206.7 · rgb(21, 16, 16) · 18px | MICRODERMOABRASIÓN · 1084 / 64 / 253.2 · rgb(21, 16, 16) · 18px |
| 8 | — · 322 / 48 / 48 · rgb(61, 26, 26) · 18px | Otras categorías · 416 / 80 / 80 · rgb(61, 26, 26) · 18px |
| 9 | ¿Hablamos? · 370 / 64 / 64 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 396 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 10 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](faciales-390-0.jpg) [1](faciales-390-1.jpg) [2](faciales-390-2.jpg) [3](faciales-390-3.jpg) 

## masajes @ 1440×900

Header 161 → 159px · scroll area 739 → 900px · page height 5785 → 5309px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| intro h1 | DM Sans | **208 → 159.8** | 800 | normal | **187.2 → 143.8** | -5.2 | uppercase | rgb(240, 232, 220) | 131 | **223 → 104** | 1178 | **187 → 144** |
| window 2 title | DM Sans | 89.3 | 800 | normal | 80.4 | -2.2 | uppercase | rgb(240, 232, 220) | **642 → 132** | **215 → 154** | **667 → 587** | 241 |
| window 1 duration chip | DM Sans | 12.5 | **700 → 400** | normal | normal | 1 | **none → uppercase** | rgb(240, 232, 220) | **131 → 721** | **497 → 464** | **78 → 87** | **36 → 44** |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Masajes · 572 / 112 / 80 · rgb(14, 10, 10) · 0px | Masajes · 741 / 64 / 64 · rgb(14, 10, 10) · 0px |
| 2 | Masaje relajante · 739 / 40 / 80 · rgb(107, 20, 20) · 18px | MASAJE RELAJANTE · 741 / 64 / 64 · rgb(107, 20, 20) · 18px |
| 3 | Masaje piedras calientes · 739 / 40 / 80 · rgb(21, 16, 16) · 18px | MASAJE PIEDRAS CALIENTES · 741 / 64 / 64 · rgb(21, 16, 16) · 18px |
| 4 | Masaje deportivo · 739 / 40 / 80 · rgb(201, 162, 122) · 18px | MASAJE DEPORTIVO · 741 / 64 / 64 · rgb(201, 162, 122) · 18px |
| 5 | Masaje modelador · 739 / 40 / 80 · rgb(61, 26, 26) · 18px | MASAJE MODELADOR · 741 / 64 / 64 · rgb(61, 26, 26) · 18px |
| 6 | — · 551 / 96 / 96 · rgb(61, 26, 26) · 18px | Otras categorías · 291 / 80 / 80 · rgb(61, 26, 26) · 18px |
| 7 | ¿Hablamos? · 593 / 128 / 128 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 469 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 8 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](masajes-1440-0.jpg) [1](masajes-1440-1.jpg) [2](masajes-1440-2.jpg) [3](masajes-1440-3.jpg) 

## masajes @ 390×844

Header 155 → 153px · scroll area 689 → 844px · page height 5797 → 6329px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| intro h1 | DM Sans | **58.5 → 45.8** | 800 | normal | **52.7 → 41.3** | -1.5 | uppercase | rgb(240, 232, 220) | **20 → 26** | **211 → 104** | 350 | **53 → 41** |
| window 2 title | DM Sans | 38.4 | 800 | normal | 34.6 | -1 | uppercase | rgb(240, 232, 220) | **20 → 26** | **151 → 104** | 350 | 69 |
| window 1 duration chip | DM Sans | 12.5 | **700 → 400** | normal | normal | 1 | **none → uppercase** | rgb(240, 232, 220) | **20 → 26** | **298 → 275** | **78 → 87** | **36 → 44** |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Masajes · 495 / 48 / 40 · rgb(14, 10, 10) · 0px | Masajes · 691 / 64 / 64 · rgb(14, 10, 10) · 0px |
| 2 | Masaje relajante · 857 / 40 / 206.7 · rgb(107, 20, 20) · 18px | MASAJE RELAJANTE · 935 / 64 / 253.2 · rgb(107, 20, 20) · 18px |
| 3 | Masaje piedras calientes · 857 / 40 / 206.7 · rgb(21, 16, 16) · 18px | MASAJE PIEDRAS CALIENTES · 935 / 64 / 253.2 · rgb(21, 16, 16) · 18px |
| 4 | Masaje deportivo · 857 / 40 / 206.7 · rgb(201, 162, 122) · 18px | MASAJE DEPORTIVO · 964 / 64 / 253.2 · rgb(201, 162, 122) · 18px |
| 5 | Masaje modelador · 857 / 40 / 206.7 · rgb(61, 26, 26) · 18px | MASAJE MODELADOR · 964 / 64 / 253.2 · rgb(61, 26, 26) · 18px |
| 6 | — · 322 / 48 / 48 · rgb(61, 26, 26) · 18px | Otras categorías · 416 / 80 / 80 · rgb(61, 26, 26) · 18px |
| 7 | ¿Hablamos? · 370 / 64 / 64 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 396 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 8 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](masajes-390-0.jpg) [1](masajes-390-1.jpg) [2](masajes-390-2.jpg) [3](masajes-390-3.jpg) 

## nosotros @ 1440×900

Header 161 → 159px · scroll area 739 → 900px · page height 4111 → 4251px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| intro eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(201, 162, 122) | 131 | **112 → 96** | 1178 | 15 |
| intro h1 | DM Sans | **32 → 159.8** | 800 | normal | **28.8 → 143.8** | **-0.8 → -4** | uppercase | rgb(240, 232, 220) | 131 | **147 → 136** | **992 → 1176** | **29 → 437** |
| intro h1 accent | Cormorant Garamond | **33.3 → 166.2** | **400 → 800** | italic | **26.6 → 149.5** | 0 | none | rgb(224, 147, 138) | **317 → 132** | **141 → 280** | **184 → 1176** | **41 → 150** |
| intro lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | 131 | **208 → 605** | 576 | 86 |
| philosophy eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(224, 147, 138) | 131 | **67 → 96** | 1178 | 15 |
| philosophy heading 1 | **DM Sans → cormorant** | **13.6 → 24** | **800 → 300** | **normal → italic** | normal | 1.9 | **uppercase → none** | rgb(240, 232, 220) | **400 → 432** | **98 → 152** | **640 → 576** | **17 → 32** |
| philosophy text 1 | DM Sans | 16 | 400 | normal | **25.6 → 29.3** | 0 | none | **rgba(240, 232, 220, 0.85) → rgb(240, 232, 220)** | **400 → 432** | **122 → 200** | **640 → 576** | **51 → 88** |
| big word 1 | DM Sans | 165.6 | 800 | normal | **149 → 159.8** | -4.1 | uppercase | rgb(240, 232, 220) | **197 → 132** | **253 → 344** | **1046 → 1176** | **149 → 160** |
| collage centre image | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| big word 2 | DM Sans | 165.6 | 800 | normal | **149 → 159.8** | -4.1 | uppercase | rgb(240, 232, 220) | **463 → 132** | **655 → 706** | **514 → 1176** | **149 → 160** |
| team statement | DM Sans | **64 → 48.5** | 800 | normal | **62.7 → 47.5** | -1.6 | uppercase | rgb(240, 232, 220) | 131 | **245 → 136** | **990 → 748** | **125 → 97** |
| team card | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | 131 | **410 → 273** | 385 | **380 → 256** |
| team card title | DM Sans | **38.4 → 48.5** | 800 | normal | **34.6 → 48.5** | -1 | uppercase | rgb(240, 232, 220) | 163 | **574 → 297** | 321 | **35 → 97** |
| team card text | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **192 → 159.8** | 800 | normal | **172.8 → 143.8** | -4.8 | uppercase | rgb(240, 232, 220) | 131 | **229 → 96** | 1178 | **173 → 144** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | 131 | **426 → 264** | 576 | 29 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | 131 | **487 → 325** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Un espacio para el cuidado,  · 374 / 112 / 80 · rgb(14, 10, 10) · 0px | Un espaciopara el cuidado,si · 963 / 96 / 270 · rgb(14, 10, 10) · 0px |
| 2 | Nada de fórmulas genéricas · 1117 / 32 / 221.7 · linear-gradient(160deg, rgb(13 · 18px | Nada de fórmulas genéricas · 1298 / 96 / 270 · rgb(107, 20, 20) · 18px |
| 3 | Especialistas en estética fa · 914 / 112 / 221.7 · rgb(21, 16, 16) · 18px | Especialistas en estética fa · 677 / 96 / 96 · rgb(21, 16, 16) · 18px |
| 4 | ¿Hablamos? · 593 / 128 / 128 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 469 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 5 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](nosotros-1440-0.jpg) [1](nosotros-1440-1.jpg) [2](nosotros-1440-2.jpg) [3](nosotros-1440-3.jpg) 

## nosotros @ 390×844

Header 155 → 153px · scroll area 689 → 844px · page height 3756 → 4652px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| intro eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(201, 162, 122) | **20 → 28** | **48 → 89** | 350 | 15 |
| intro h1 | DM Sans | **32 → 45.8** | 800 | normal | **28.8 → 41.3** | -0.8 | uppercase | rgb(240, 232, 220) | **20 → 28** | **83 → 128** | 350 | **58 → 124** |
| intro h1 accent | Cormorant Garamond | **33.3 → 47.7** | **400 → 800** | italic | **26.6 → 42.9** | 0 | none | rgb(224, 147, 138) | **20 → 28** | **77 → 169** | **265 → 335** | **70 → 42** |
| intro lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **20 → 28** | **173 → 284** | 350 | **144 → 174** |
| philosophy eyebrow | DM Sans | 11.5 | **700 → 400** | normal | normal | 3.5 | uppercase | rgb(224, 147, 138) | **20 → 26** | **68 → 96** | 350 | 15 |
| philosophy heading 1 | **DM Sans → cormorant** | **13.6 → 24** | **800 → 300** | **normal → italic** | normal | 1.9 | **uppercase → none** | rgb(240, 232, 220) | **20 → 26** | **99 → 152** | 350 | **17 → 32** |
| philosophy text 1 | DM Sans | 16 | 400 | normal | **25.6 → 29.3** | 0 | none | **rgba(240, 232, 220, 0.85) → rgb(240, 232, 220)** | **20 → 26** | **123 → 200** | 350 | **102 → 176** |
| big word 1 | DM Sans | 48 | 800 | normal | **43.2 → 45.8** | -1.2 | uppercase | rgb(240, 232, 220) | **43 → 26** | **265 → 432** | **303 → 339** | **43 → 46** |
| collage centre image | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| big word 2 | DM Sans | 48 | 800 | normal | **43.2 → 45.8** | -1.2 | uppercase | rgb(240, 232, 220) | **120 → 26** | **441 → 787** | **150 → 339** | **43 → 46** |
| team statement | DM Sans | 30.4 | 800 | normal | 29.8 | -0.8 | uppercase | rgb(240, 232, 220) | **20 → 26** | **197 → 136** | 350 | 89 |
| team card | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | **20 → 26** | **326 → 267** | 350 | 260 |
| team card title | DM Sans | **25.6 → 30.6** | 800 | normal | **23 → 30.6** | -0.6 | uppercase | rgb(240, 232, 220) | **40 → 50** | **436 → 291** | **310 → 291** | **23 → 31** |
| team card text | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk eyebrow | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| talk title | DM Sans | **54.6 → 45.8** | 800 | normal | **49.1 → 41.3** | -1.4 | uppercase | rgb(240, 232, 220) | **20 → 26** | **165 → 96** | 350 | **49 → 41** |
| talk lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(240, 232, 220) | **20 → 26** | **238 → 161** | 350 | 58 |
| talk button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **20 → 26** | **328 → 252** | **183 → 169** | 48 |
| talk WhatsApp button | **missing on site**  |  |  |  |  |  |  |  |  |  |  |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | Un espacio para el cuidado,  · 357 / 48 / 40 · rgb(14, 10, 10) · 0px | Un espaciopara el cuidado,si · 565 / 96 / 96 · rgb(14, 10, 10) · 0px |
| 2 | Nada de fórmulas genéricas · 608 / 32 / 48 · linear-gradient(160deg, rgb(13 · 18px | Nada de fórmulas genéricas · 1278 / 96 / 253.2 · rgb(107, 20, 20) · 18px |
| 3 | Especialistas en estética fa · 1239 / 64 / 206.7 · rgb(21, 16, 16) · 18px | Especialistas en estética fa · 1384 / 96 / 253.2 · rgb(21, 16, 16) · 18px |
| 4 | ¿Hablamos? · 370 / 64 / 64 · rgb(107, 20, 20) · 18px | ¿Hablamos? · 396 / 96 / 96 · rgb(107, 20, 20) · 18px |
| 5 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](nosotros-390-0.jpg) [1](nosotros-390-1.jpg) [2](nosotros-390-2.jpg) [3](nosotros-390-3.jpg) 

## contacto @ 1440×900

Header 161 → 159px · scroll area 739 → 900px · page height 2603 → 2431px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| eyebrow | Cormorant Garamond | 25.6 | 400 | italic | normal | 0 | none | rgb(224, 147, 138) | 131 | **112 → 287** | 501 | 31 |
| h1 | DM Sans | **76 → 159.8** | 800 | normal | **68.4 → 143.8** | **-1.9 → -4** | uppercase | rgb(240, 232, 220) | 131 | **151 → 335** | 501 | **68 → 144** |
| lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(201, 162, 122) | 131 | **243 → 503** | 501 | 58 |
| quick link WhatsApp | DM Sans | 16 | **700 → 400** | normal | normal | 1 | none | rgb(240, 232, 220) | 131 | **333 → 593** | **416 → 111** | 56 |
| form card | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **696 → 745** | **80 → 184** | **613 → 531** | 772 |
| form title | **DM Sans → cormorant** | **41.6 → 24** | **800 → 300** | **normal → italic** | **37.4 → 32** | -1 | **uppercase → none** | rgb(240, 232, 220) | 736 | **120 → 128** | 533 | **37 → 32** |
| field label | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.2 | uppercase | **rgb(240, 232, 220) → rgb(201, 162, 122)** | 736 | 181 | **533 → 62** | 14 |
| input | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | 736 | 203 | 533 | 48 |
| submit | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | 736 | **764 → 864** | **183 → 531** | 48 |
| info heading | **DM Sans → cormorant** | **11.2 → 24** | **700 → 300** | **normal → italic** | normal | **2.7 → 0** | **uppercase → none** | **rgb(201, 162, 122) → rgb(240, 232, 220)** | 131 | **166 → 96** | 328 | **14 → 32** |
| map | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **850 → 903** | **166 → 96** | **459 → 405** | **350 → 304** |
| footer title | DM Sans | **72 → 48.5** | 800 | normal | **64.8 → 48.5** | -1.8 | uppercase | rgb(14, 10, 10) | 131 | 80 | **465 → 411** | **65 → 48** |
| footer lead | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(240, 232, 220) | 131 | **224 → 148** | **183 → 161** | 48 |
| footer column heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(14, 10, 10) | **628 → 583** | 80 | **206 → 343** | 14 |
| footer link | DM Sans | 16 | **500 → 400** | normal | normal | 0 | none | rgb(14, 10, 10) | **628 → 583** | 104 | **140 → 126** | 44 |
| footer nav link | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer wordmark | Cormorant Garamond | **445.6 → 316.8** | 500 | **normal → italic** | **713 → 228.1** | **-13.4 → -7.9** | none | rgb(14, 10, 10) | **0 → 132** | 381 | **1440 → 1176** | **713 → 228** |
| footer legal link | DM Sans | 12.8 | 400 | normal | normal | 0 | none | rgb(14, 10, 10) | 1046 | **1054 → 625** | 115 | 44 |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | ¿Hablamos? · 948 / 80 / 96 · rgb(14, 10, 10) · 0px | ¿Hablamos? · 1040 / 96 / 96 · rgb(14, 10, 10) · 0px |
| 2 | Visítanos · 542 / 96 / 96 · rgb(21, 16, 16) · 18px | Visítanos · 548 / 96 / 96 · rgb(21, 16, 16) · 18px |
| 3 | ¿Hablamos? · 1114 / 80 / 0 · rgb(201, 162, 122) · 18px | — · 685 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](contacto-1440-0.jpg) [1](contacto-1440-1.jpg) [2](contacto-1440-2.jpg) [3](contacto-1440-3.jpg) 

## contacto @ 390×844

Header 155 → 153px · scroll area 689 → 844px · page height 3542 → 3461px · horizontal overflow 0 → 0

| element | font | size | weight | style | leading | tracking | transform | color | x | yInSheet | w | h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| eyebrow | Cormorant Garamond | 25.6 | 400 | italic | normal | 0 | none | rgb(224, 147, 138) | **20 → 26** | **40 → 96** | 350 | 31 |
| h1 | DM Sans | **51.2 → 45.8** | 800 | normal | **46.1 → 41.3** | -1.3 | uppercase | rgb(240, 232, 220) | **20 → 26** | **79 → 144** | 350 | **46 → 41** |
| lead | DM Sans | 18 | 400 | normal | 28.8 | 0 | none | rgb(201, 162, 122) | **20 → 26** | **149 → 209** | 350 | 58 |
| quick link WhatsApp | DM Sans | 16 | **700 → 400** | normal | normal | 1 | none | rgb(240, 232, 220) | **20 → 26** | **239 → 300** | **350 → 111** | 56 |
| form card | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **20 → 50** | **391 → 548** | **350 → 291** | 746 |
| form title | **DM Sans → cormorant** | **28.8 → 24** | **800 → 300** | **normal → italic** | **25.9 → 32** | -0.7 | **uppercase → none** | rgb(240, 232, 220) | **40 → 50** | **411 → 492** | **310 → 291** | **52 → 32** |
| field label | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.2 | uppercase | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **40 → 50** | **486 → 548** | **310 → 62** | 14 |
| input | DM Sans | 16 | 400 | normal | normal | 0 | none | rgb(240, 232, 220) | **40 → 50** | **508 → 572** | **310 → 291** | 48 |
| submit | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(14, 10, 10) | **40 → 50** | **1069 → 1227** | **183 → 291** | 48 |
| info heading | **DM Sans → cormorant** | **11.2 → 24** | **700 → 300** | **normal → italic** | normal | **2.7 → 0** | **uppercase → none** | **rgb(201, 162, 122) → rgb(240, 232, 220)** | **20 → 26** | **118 → 96** | 350 | **14 → 32** |
| map | DM Sans | 16 | 400 | normal | normal | 0 | none | **rgb(240, 232, 220) → rgb(201, 162, 122)** | **20 → 26** | **758 → 634** | 350 | **280 → 254** |
| footer title | DM Sans | **35.2 → 30.6** | 800 | normal | 31.7 | -0.9 | uppercase | rgb(14, 10, 10) | **20 → 26** | **48 → 80** | 350 | 32 |
| footer lead | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer button | DM Sans | 12 | **700 → 400** | normal | normal | 2.4 | uppercase | rgb(240, 232, 220) | **20 → 26** | **159 → 131** | **183 → 161** | 48 |
| footer column heading | DM Sans | 11.2 | **700 → 400** | normal | normal | 2.7 | uppercase | rgb(14, 10, 10) | **20 → 26** | **239 → 219** | 350 | 14 |
| footer link | DM Sans | 16 | **500 → 400** | normal | normal | 0 | none | rgb(14, 10, 10) | **20 → 26** | **262 → 243** | **140 → 126** | 44 |
| footer nav link | **missing on site**  |  |  |  |  |  |  |  |  |  |  |
| footer wordmark | Cormorant Garamond | **120.6 → 85.8** | 500 | **normal → italic** | **193 → 61.8** | -3.6 | none | rgb(14, 10, 10) | **0 → 26** | **876 → 686** | **390 → 339** | **193 → 62** |
| footer legal link | DM Sans | 12.8 | 400 | normal | normal | 0 | none | rgb(14, 10, 10) | **20 → 26** | **1122 → 816** | 115 | 44 |

**Sheets** (height / padding-top / padding-bottom / ground / radius)

| # | mockup | site |
|---|---|---|
| 1 | ¿Hablamos? · 1185 / 40 / 48 · rgb(14, 10, 10) · 0px | ¿Hablamos? · 1395 / 96 / 96 · rgb(14, 10, 10) · 0px |
| 2 | Visítanos · 1175 / 48 / 206.7 · rgb(21, 16, 16) · 18px | Visítanos · 1036 / 96 / 96 · rgb(21, 16, 16) · 18px |
| 3 | ¿Hablamos? · 1182 / 48 / 0 · rgb(201, 162, 122) · 18px | — · 876 / 0 / 0 · rgb(201, 162, 122) · 18px |

Screens: [0](contacto-390-0.jpg) [1](contacto-390-1.jpg) [2](contacto-390-2.jpg) [3](contacto-390-3.jpg) 

