# Order Kaise Deliver Karna Hai (Claude Code ke saath)

Order aaya? Ghabrana nahi. Ye steps follow karo.

## Step 1: Requirements samjho
Buyer ka message aur files dekho. Agar kuch samajh na aaye to **buyer ka poora message Claude ko paste karo** aur poocho:
> "Ye Fiverr buyer ka message hai. Mujhe Roman Urdu mein samjhao ke ye kya chahta hai, aur kya cheez abhi clear nahi hai jo mujhe poochni chahiye."

**Kaam shuru karne se pehle har cheez clear kar lo.** Baad mein misunderstanding se bura review aata hai.

## Step 2: Claude Code se website banwao
Naya session kholo aur kuch aisa likho (apni details ke saath):

```
Build a restaurant website for a Fiverr client.

Business: [name], [city, country]
Type: [Pizza / BBQ / Cafe ...]
Colours: [their colours or "match the logo"]
Sections: hero, about, full menu with prices, deals, gallery, location map, contact
WhatsApp ordering: customers add dishes to a cart and send the order to WhatsApp number [+...]
Phone: [...]   Address: [...]   Hours: [...]

Menu (with prices):
[menu paste karo]

Files: logo and photos are in the /assets folder.

Requirements: plain HTML, CSS, JS (no frameworks), fully responsive,
fast loading, works when opened directly from the folder.
Take desktop and mobile screenshots when done so I can check it.
```

> 💡 Tumhari pehli 5 websites ka code tumhare GitHub pe hai. Claude ko keh sakte ho: *"Use the style of my Sultan Istanbul site as a reference."*

## Step 3: Khud check karo (sab se zaroori ✅)
Har delivery se pehle ye checklist poori karo:

- [ ] Website **laptop pe** khol ke poori scroll ki
- [ ] Website **apne phone pe** kholi (Claude se screenshots bhi maango)
- [ ] **Har button** daba ke dekha: menu, order, call, WhatsApp, map
- [ ] WhatsApp order **sahi number** pe ja raha hai aur message sahi hai
- [ ] **Business ka naam, phone, address, timings** buyer ki di hui info se match karte hain
- [ ] **Saari prices** buyer ke menu se match karti hain (ek ek kar ke check karo!)
- [ ] Koi spelling mistake nahi, aur koi "Lorem ipsum" ya dummy text nahi bacha
- [ ] Buyer ki di hui saari photos lagi hain
- [ ] Doosre restaurant (tumhare purane demo) ka naam ya photo **kahin nahi** aa rahi

Kuch galat ho to Claude ko seedha batao, jaise: *"Mobile pe menu button kaam nahi kar raha, theek karo."*

## Step 4: Deliver karo
1. Website ka folder **ZIP** karo.
2. Desktop aur mobile ke 2-3 screenshots lo.
3. Fiverr pe **"Deliver Now"** dabao, ZIP + screenshots attach karo, aur `4-messages.md` ka message #6 likho.
4. Premium package mein hosting bhi hai: Claude se kaho *"Help me deploy this site to Cloudflare Pages / Netlify for free and give me step-by-step instructions."* (Tumne Sultan Istanbul pehle bhi `pages.dev` pe dala tha, wahi tareeqa hai.)

## Step 5: Revisions
Buyer jo changes maange, wo Claude ko do, Step 3 wali checklist dobara chalao, aur phir deliver karo.

---

## Agar order mein kuch bohot mushkil maanga gaya ho
Jaise login system, payment gateway, admin panel ya database. Order accept karne se **pehle** Claude se poocho:
> "Fiverr buyer ye maang raha hai: [...]. Kya main ye Claude Code se reliably bana sakta hoon aur khud test kar sakta hoon? Honest batao."

Agar jawab "mushkil hai" ho to message #9 bhej ke politely mana kar do. **Ek cancelled order ya bura review, ek chhoote hue order se kahin zyada nuksaan karta hai.**
