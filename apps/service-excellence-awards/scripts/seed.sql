-- 2026 Service Excellence Award winners (generated)
delete from sea_winners where year = 2026;

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'deck-building'),
  'London Deck Builder', 'london-deck-builder-2026', 'Expand your outdoor living space.', 'London Deck Builder is a premier deck construction company serving London, St. Thomas, Woodstock, and surrounding areas of Southwestern Ontario. The company builds pressure-treated, cedar, composite, and PVC decks backed by a 5-year workmanship warranty. Known for transparent pricing, permit assistance, and consistent craftsmanship, they have earned a reputation as one of London''s most trusted outdoor builders.',
  '(519) 914-1663', null, 'https://londondeckbuilder.ca',
  '/images/winners/london-deck-builder-2026/photo-1.jpg', null, ARRAY['/images/winners/london-deck-builder-2026/photo-2.jpg','/images/winners/london-deck-builder-2026/photo-3.jpg']::text[],
  ARRAY['Pressure Treated Decks','Cedar Deck Building','Composite & PVC Decking','Deck Permit Assistance','Lighting & Features','Deck Repair & Maintenance']::text[], ARRAY['London, ON']::text[], '[{"author":"Ahmad","location":"Belmont, ON","text":"Kyle transformed our deck beyond our expectations. He skillfully doubled its size, blending the new seamlessly with the old. Our gatherings are bigger and better than ever!","rating":5},{"author":"John","location":"London, ON","text":"Working with London Deck Builder was a game-changer. Their expertise during planning was invaluable, ensuring our vision was both practical and beautiful. It''s rare to find a contractor so committed from start to finish.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'fence-construction'),
  'London Fence Installer', 'london-fence-installer-2026', 'Friendly, quick, and professional fences.', 'London Fence Installer is a full-service fencing contractor with 20 years of combined experience serving London, St. Thomas, Woodstock, and Southwestern Ontario. The company installs wood, vinyl, chainlink, metal, and aluminum fences for residential and commercial clients, backed by a 5-year limited warranty and quotes delivered within 48 hours. Organized project management and reliable cleanup have made them London''s go-to fence contractor.',
  '(519) 914-1909', 'info@londonfenceinstaller.ca', 'https://londonfenceinstaller.ca',
  '/images/winners/london-fence-installer-2026/photo-1.jpg', '/images/winners/london-fence-installer-2026/logo.png', ARRAY['/images/winners/london-fence-installer-2026/photo-2.jpg','/images/winners/london-fence-installer-2026/photo-3.jpg']::text[],
  ARRAY['Wood Fence Installation','Chainlink Fencing','Vinyl Fence Installation','Metal & Aluminum Fencing','Fence Repair','Fence Staining']::text[], ARRAY['London, ON']::text[], '[{"author":"Jose Hernandez","location":"London, ON","text":"From quote to cleanup, Kyle and his team were quick, organized, and focused on my backyard fence. 5/5.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'deck-fence-staining'),
  'DeckStain.ca', 'deckstain-2026', 'Send a photo, get a real quote in 2 business days.', 'DeckStain.ca is Southwestern Ontario''s specialist in professional deck and fence staining, cleaning, sealing, and restoration, having completed 500+ projects across 40+ cities. The company applies READY Seal premium oil-based stain in eight colours for a deep-penetrating, no-peel finish that outperforms standard water-based alternatives. With an innovative photo-quote process and a 100% satisfaction guarantee, DeckStain has built an 8-year track record and a 4.9-star rating across the region.',
  '(519) 914-3387', 'service@masterdecker.com', 'https://deckstain.ca',
  '/images/winners/deckstain-2026/photo-1.jpg', '/images/winners/deckstain-2026/logo.png', ARRAY['/images/winners/deckstain-2026/photo-2.jpg','/images/winners/deckstain-2026/photo-3.jpg']::text[],
  ARRAY['Deck Staining','Deck Cleaning','Deck Sealing','Deck Restoration','Deck Refinishing','Fence Staining']::text[], ARRAY['London, ON']::text[], '[{"author":"A. Keller","location":"London, ON","text":"Great team. It was quick and easy to get a quote back from a photo I uploaded. They charged exactly what they quoted and I''m thrilled.","rating":5},{"author":"Shirley & Jim Newton","location":"London, ON","text":"Deck staining in Canada is always an annual chore. I''m so glad these guys are operating — they do great work.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'retaining-walls'),
  'London Retaining Walls', 'london-retaining-walls-2026', 'Professional retaining wall installation & repair.', 'London Retaining Walls is a dedicated retaining wall contractor with over 8 years of experience serving London, Woodstock, Brantford, St. Thomas, and Southwestern Ontario. The company installs and repairs block, concrete, and wood retaining walls for residential and commercial clients, in full compliance with the Ontario Building Code. The team is recognized for thorough on-site consultations and a policy of accepting final payment only after exceeding client expectations.',
  '(519) 914-1908', 'info@londonretainingwalls.ca', 'https://londonretainingwalls.ca',
  '/images/winners/london-retaining-walls-2026/photo-1.jpg', '/images/winners/london-retaining-walls-2026/logo.png', ARRAY['/images/winners/london-retaining-walls-2026/photo-2.jpg','/images/winners/london-retaining-walls-2026/photo-3.jpg']::text[],
  ARRAY['Retaining Wall Installation','Concrete Retaining Walls','Block Retaining Walls','Wood & Timber Retaining Walls','Retaining Wall Repair']::text[], ARRAY['London, ON']::text[], '[{"author":"Sandra Rudy","location":"Byron, ON","text":"No other landscape contractor wanted to repair our retaining wall. This company stepped up and rebuilt our leaning wood retaining wall in three days. I recommend them.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'concrete-finishing'),
  'Concrete Driveways London', 'concrete-driveways-2026', 'Built to last. Poured to impress.', 'Concrete Driveways is a London-based concrete contractor with 15+ years of experience and 420+ driveway pours across Southwestern Ontario. The company delivers custom concrete driveways, patios, walkways, pool decks, and garage floors engineered for Ontario''s freeze-thaw climate, with every project backed by a written warranty. Serving London, St. Thomas, Strathroy, and Woodstock, the company is recognized for transparent pricing and a 4.9-star Google rating.',
  '(519) 264-5847', 'service@masterdecker.com', 'https://concretedriveways.ca',
  '/images/winners/concrete-driveways-2026/photo-1.jpg', null, ARRAY['/images/winners/concrete-driveways-2026/photo-2.jpg','/images/winners/concrete-driveways-2026/photo-3.jpg']::text[],
  ARRAY['Concrete Driveway Installation','Stamped Concrete Driveways','Exposed Aggregate Driveways','Driveway Repair & Resurfacing','Concrete Patios','Walkways & Sidewalks','Pool Decks','Garage Floor Pouring']::text[], ARRAY['London, ON']::text[], '[{"author":"Mark D.","location":"London, ON","text":"Best concrete crew we could have hired. The driveway is dead level, the broom finish is perfectly even, and they cleaned up like they were never here. Three winters in and not a single crack.","rating":5},{"author":"Sarah & Kevin P.","location":"St. Thomas, ON","text":"We chose stamped concrete to match our front entrance and couldn''t be happier. The slate pattern looks like custom flagstone but with no weeds to pull. Highly recommend.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'foundation-waterproofing'),
  'London Concrete Forming', 'london-concrete-forming-2026', 'Professional concrete forming, driveways, patios & pads.', 'London Concrete Forming is a trusted concrete contractor with over 20 years of combined experience and 500+ completed projects across London, St. Thomas, Woodstock, Stratford, Sarnia, and Chatham. The company specializes in residential forming and flatwork — foundations, driveways, patios, retaining walls, stamped concrete, and shed pads — at transparent rates. Premium concrete mixes, detailed site preparation, and a commitment to Ontario-winter durability have earned them a top reputation in Southwestern Ontario.',
  '(519) 914-1901', 'service@londonconcreteforming.ca', 'https://londonconcreteforming.ca',
  '/images/winners/london-concrete-forming-2026/photo-1.jpg', '/images/winners/london-concrete-forming-2026/logo.png', ARRAY['/images/winners/london-concrete-forming-2026/photo-2.jpg','/images/winners/london-concrete-forming-2026/photo-3.jpg']::text[],
  ARRAY['Concrete Forming','Concrete Driveway Installation','Concrete Patios','Concrete Retaining Walls','Stamped Concrete','Concrete Shed Pads']::text[], ARRAY['London, ON']::text[], '[]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'concrete-sealing'),
  'London Concrete Sealing', 'london-concrete-sealing-2026', 'Professional concrete sealing & repair.', 'London Concrete Sealing is a specialist concrete protection company founded in 2014, serving London, St. Thomas, Woodstock, and Stratford with over a decade of experience. The company seals and restores driveways, patios, walkways, and stamped concrete using eco-friendly, professional-grade sealants in matte, semi-gloss, and high-gloss finishes. From routine sealing to full driveway installation, the team is praised for punctual service, meticulous prep work, and results that impress.',
  '(519) 902-0011', 'service@londonconcretesealing.ca', 'https://londonconcretesealing.ca',
  '/images/winners/london-concrete-sealing-2026/photo-1.jpg', '/images/winners/london-concrete-sealing-2026/logo.png', ARRAY['/images/winners/london-concrete-sealing-2026/photo-2.jpg','/images/winners/london-concrete-sealing-2026/photo-3.jpg']::text[],
  ARRAY['Driveway Sealing','Concrete Sealing','Concrete Driveway Installation','Stamped Concrete Sealing','Concrete Finishing']::text[], ARRAY['London, ON']::text[], '[{"author":"Dave M.","location":"London, ON","text":"Had my concrete driveway sealed last fall and it still looks brand new. The team was punctual, professional, and the results exceeded my expectations. Highly recommend!","rating":5},{"author":"Sandra K.","location":"St. Thomas, ON","text":"Our stamped concrete patio looks incredible after the sealing service. The colour really pops now and it''s so much easier to keep clean. Great job!","rating":5}]'::jsonb,
  2014, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'kitchen-remodeling'),
  'Forever Cabinets', 'forever-cabinets-2026', 'Premium White Shaker kitchen cabinets for Ontario homes.', 'Forever Cabinets supplies plywood-box White Shaker kitchen cabinets to homeowners and contractors across Southern Ontario. Their catalog spans base, wall, tall, and specialty cabinets — including lazy Susans, microwave cabinets, and angled corners — with local freight delivery to London, Hamilton, Kitchener-Waterloo, Burlington, and Oakville. Customers can order a refundable sample door before committing to a full cabinet order, an approach that has built trust across the region.',
  '(519) 902-0123', 'service@masterdecker.com', 'https://forevercabinets.ca',
  '/images/winners/forever-cabinets-2026/photo-1.jpg', null, ARRAY['/images/winners/forever-cabinets-2026/photo-2.jpg','/images/winners/forever-cabinets-2026/photo-3.jpg']::text[],
  ARRAY['Base Cabinets','Wall Cabinets','Tall & Pantry Cabinets','Lazy Susans','Microwave Cabinets','Angled Corner Cabinets','Sample Door Program','Specialty Cabinets']::text[], ARRAY['London, ON']::text[], '[]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'holiday-christmas-lighting'),
  'Christmas Lights London', 'christmas-lights-london-2026', 'Professional Christmas light installation in London, ON.', 'Christmas Lights London is London, Ontario''s dedicated holiday lighting team, bringing 5+ years of experience and a 7-person crew with aerial-lift equipment to every installation. Known for custom-cut LED displays on rooflines, trees, and garlands — with no ladders required for the homeowner — the company has earned a reputation for seamless communication and neighbourhood-stopping results. Their full-service model covers design, installation, maintenance, takedown, and storage.',
  '(519) 471-1649', 'info@christmaslightslondon.ca', 'https://christmaslightslondon.ca',
  '/images/winners/christmas-lights-london-2026/photo-1.jpg', '/images/winners/christmas-lights-london-2026/logo.png', ARRAY['/images/winners/christmas-lights-london-2026/photo-2.jpg','/images/winners/christmas-lights-london-2026/photo-3.jpg']::text[],
  ARRAY['Residential Installation','Commercial Installation','Custom Design','Takedown & Storage','Wreath Installation','Garland Installation']::text[], ARRAY['London, ON']::text[], '[{"author":"Jessica Ferreira","location":"London, ON","text":"Our last installers left lights on our roof and never came back. Kyle and Cameron took the lights down, and their lights are way better! Professional from start to finish.","rating":5},{"author":"Linda Zimmerman","location":"London, ON","text":"Kyle and his team were absolute professionals. The installation in North London was seamless, and communication was top-notch. Our home was the talk of the neighbourhood.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'permanent-outdoor-lighting'),
  'Forever Lights', 'forever-lights-2026', 'Permanent LED lighting — installed once, enjoyed forever.', 'Forever Lights delivers permanent outdoor LED track lighting to homes and businesses across London, Ontario and the surrounding region, specializing in systems that are installed once and controlled forever from a smartphone. Precision colour-matching to soffits and fascia ensures the hardware disappears by day, revealing a stunning light show at night — from warm white ambiance to full holiday sequences. With a professional crew, a 50-foot boom lift, and a 5-year parts warranty, Forever Lights raises the bar for permanent residential lighting.',
  '(519) 914-3404', 'service@foreverlights.ca', 'https://foreverlights.ca',
  '/images/winners/forever-lights-2026/photo-1.jpg', '/images/winners/forever-lights-2026/logo.jpg', ARRAY['/images/winners/forever-lights-2026/photo-2.jpg','/images/winners/forever-lights-2026/photo-3.jpg']::text[],
  ARRAY['Permanent LED Lighting','Year-Round Accent Lighting','Holiday Colour Themes']::text[], ARRAY['London, ON']::text[], '[{"author":"Mike T.","location":"London, ON","text":"Having Forever Lights installed was a breeze thanks to their professional team and 50'' boom lift. Our home looks stunning year-round and we haven''t touched a ladder since!","rating":5},{"author":"Sarah K.","location":"Woodstock, ON","text":"We used to spend a whole weekend putting up Christmas lights. Now it takes 10 seconds on my phone. The lights match our soffit perfectly — neighbours constantly ask who did them.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'brantford'),
  (select id from sea_categories where slug = 'concrete-finishing'),
  'Total Brantford Concrete', 'total-brantford-concrete-2026', 'Solid foundations, superior finish.', 'Total Brantford Concrete is a premier concrete contractor serving Brantford, Paris, Cambridge, Hamilton, Caledonia, and Brant County with over 10 years of experience. They specialize in concrete driveways, stamped patios, walkways, steps, sealing, and repair — all engineered for Ontario''s harsh freeze-thaw winters. Every project comes with a free on-site estimate, permit handling, and a written warranty.',
  '(833) 244-3124', 'service@totalbrantfordconcrete.ca', 'https://totalbrantfordconcrete.ca',
  '/images/winners/total-brantford-concrete-2026/photo-1.png', '/images/winners/total-brantford-concrete-2026/logo.png', ARRAY['/images/winners/total-brantford-concrete-2026/photo-2.png','/images/winners/total-brantford-concrete-2026/photo-3.png']::text[],
  ARRAY['Concrete Driveways','Patios & Walkways','Steps & Porches','Stamped & Decorative Concrete','Concrete Sealing & Maintenance','Concrete Repair & Resurfacing']::text[], ARRAY['Brantford, ON']::text[], '[{"author":"Sarah M.","location":"West Brant, Brantford","text":"We hired Total Brantford Concrete to redo our driveway, and the difference is night and day. The crew was polite, cleaned up every day, and finished ahead of schedule. Highly recommend!","rating":5},{"author":"David K.","location":"Holmedale, Brantford","text":"Gave me a clear quote and stuck to it. The stamped concrete looks exactly like natural stone but was way more affordable. It''s now our favourite spot to host BBQs.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'brantford'),
  (select id from sea_categories where slug = 'foundation-waterproofing'),
  'Brantford Concrete Forming', 'brantford-concrete-forming-2026', 'Precision concrete forming for Brantford & area.', 'Brantford Concrete Forming specializes in high-strength 32 MPa concrete forming, driveways, stamped patios, broom-finish surfaces, and complete driveway replacements across Brantford, Paris, Burford, St. George, and Mount Pleasant. With transparent per-square-foot pricing, the company is known for steel-reinforced pours engineered to endure Canadian freeze-thaw cycles. Residential and commercial clients benefit from a one-business-day response time and clean, professional job sites.',
  '(519) 914-5697', 'service@brantfordconcreteforming.ca', 'https://brantfordconcreteforming.ca',
  '/images/winners/brantford-concrete-forming-2026/photo-1.png', null, ARRAY['/images/winners/brantford-concrete-forming-2026/photo-2.jpg','/images/winners/brantford-concrete-forming-2026/photo-3.jpg']::text[],
  ARRAY['Concrete Forming','Concrete Driveway Installation','Stamped Concrete','Concrete Patio Installation','Broom Finish Concrete','Driveway Replacement']::text[], ARRAY['Brantford, ON']::text[], '[{"author":"Mark T.","location":"Brantford, ON","text":"These guys did an amazing job on our new driveway. It looks clean, solid, super professional and finished on time!","rating":5},{"author":"Lisa R.","location":"Paris, ON","text":"We had a stamped concrete patio installed in our backyard and it looks beautiful and has totally transformed our outdoor space.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'brantford'),
  (select id from sea_categories where slug = 'retaining-walls'),
  'Brantford Retaining Walls', 'brantford-retaining-walls-2026', 'Strong. Durable. Built to last.', 'Brantford Retaining Walls designs and installs high-quality retaining wall systems across Brantford, Paris, Cambridge, Hamilton, St. George, and Brant County, with 120+ completed projects and a 50-year expected wall lifespan. Their scope covers residential armour stone, interlocking concrete block, engineered commercial walls, erosion-control drainage, and wall repair. Every wall includes proper drainage, geogrid reinforcement on walls over four feet, and a free on-site estimate.',
  '(519) 914-5697', 'sales@brantfordretainingwalls.ca', 'https://brantfordretainingwalls.ca',
  '/images/winners/brantford-retaining-walls-2026/photo-1.png', null, ARRAY['/images/winners/brantford-retaining-walls-2026/photo-2.png','/images/winners/brantford-retaining-walls-2026/photo-3.png']::text[],
  ARRAY['Residential Retaining Walls','Armour Stone Installation','Interlocking Concrete Blocks','Erosion Control & Drainage','Engineered & Commercial Walls','Wall Repair & Restoration']::text[], ARRAY['Brantford, ON']::text[], '[{"author":"James R.","location":"Brantford, ON","text":"The team was professional, on time, and very clean. Our yard looks completely transformed. Highly recommended!","rating":5},{"author":"Sarah M.","location":"Paris, ON","text":"From the first call to the final installation, everything was handled perfectly. Our retaining wall is strong, beautiful, and built to last.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'woodstock'),
  (select id from sea_categories where slug = 'deck-building'),
  'Woodstock Deck and Fence', 'woodstock-deck-and-fence-2026', 'Built to last. Designed to impress.', 'Woodstock Deck and Fence is Oxford County''s outdoor construction specialist, delivering custom cedar, composite, and pressure-treated decks alongside vinyl, wood, steel, and chain-link fences engineered to outlast Ontario''s harshest winters. With 600+ completed builds across Woodstock, Ingersoll, and Tillsonburg, the team backs every project with a 5-year workmanship warranty and pulls all required permits. Their disciplined approach — 4-foot frost-line footings, galvanized fasteners, and premium rot-resistant lumber — sets the standard for outdoor construction in the region.',
  '(519) 914-5697', 'service@woodstockdeckandfence.ca', 'https://woodstockdeckandfence.ca',
  null, null, '{}',
  ARRAY['Deck Building','Deck Restoration','Vinyl Fences','Wood Fences','Steel Decorative Fences','Chain-Link Fences']::text[], ARRAY['Woodstock, ON']::text[], '[{"author":"Mark T.","location":"Woodstock, ON","text":"Woodstock Deck & Fence did an amazing job building our new backyard deck. The craftsmanship is excellent, and the team was professional from start to finish. Highly recommend.","rating":5},{"author":"Ryan P.","location":"Woodstock, ON","text":"Our composite deck looks incredible. The quality of materials and attention to detail really show. If you''re looking for reliable deck builders in Woodstock, these are the guys to call.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'woodstock'),
  (select id from sea_categories where slug = 'heating-cooling'),
  'Optimum HVAC', 'optimum-hvac-2026', 'Oxford County''s TSSA-certified HVAC specialists.', 'Optimum HVAC is Oxford County''s premier heating and cooling contractor, founded by TSSA G2-certified technician Dino to deliver honest, high-quality service across Southwestern Ontario. Specializing in furnace repair and installation, heat pump conversions, ductless mini-splits, and indoor air quality systems, the company offers 24/7 emergency response and manages the full lifecycle of government rebate applications for clients switching to high-efficiency equipment. From Woodstock to London, Optimum HVAC combines certification, transparent pricing, and same-day service.',
  '(519) 902-0180', 'info@optimumhvac.ca', 'https://optimumhvac.ca',
  null, null, '{}',
  ARRAY['Furnace Repair & Installation','Air Conditioner Installation','Heat Pump Installation','Ductless Mini-Splits','Indoor Air Quality','Tankless Water Heaters','Smart Thermostats','HVAC Maintenance Plans']::text[], ARRAY['Woodstock, ON']::text[], '[{"author":"Homeowner","location":"Woodstock, ON","text":"Optimum HVAC installed a new high-efficiency furnace last fall. The team was professional, on time, and cleaned up completely. We''ve noticed a big difference in our heating bills already.","rating":5},{"author":"Homeowner","location":"Tillsonburg, ON","text":"We switched from oil heating to a heat pump. Optimum handled the installation, permits, and all the rebate applications. We received over $12,000 back. Highly recommend.","rating":5}]'::jsonb,
  2019, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'tillsonburg'),
  (select id from sea_categories where slug = 'concrete-finishing'),
  'Concrete Tillsonburg', 'concrete-tilsonburg-2026', 'High-strength concrete built for Ontario winters.', 'Concrete Tillsonburg is Oxford County''s trusted concrete contractor, bringing over 12 years of experience and 350+ completed projects to driveways, stamped patios, structural repairs, and garage floors across Tillsonburg and the surrounding region. The company''s mixes are air-entrained and engineered specifically for the area''s punishing freeze-thaw cycles, with every pour backed by a written warranty and reinforced with rebar or wire mesh as standard. Their meticulous approach makes them the go-to choice for concrete that lasts decades.',
  '(519) 878-6735', 'service@concretetilsonburg.ca', 'https://concretetilsonburg.ca',
  '/images/winners/concrete-tilsonburg-2026/photo-1.png', '/images/winners/concrete-tilsonburg-2026/logo.png', ARRAY['/images/winners/concrete-tilsonburg-2026/photo-2.png','/images/winners/concrete-tilsonburg-2026/photo-3.jpg']::text[],
  ARRAY['Custom Concrete Driveways','Stamped Patios & Walkways','Concrete Repair & Resurfacing','Garage & Basement Floors']::text[], ARRAY['Tillsonburg, ON']::text[], '[{"author":"Jason M.","location":"Tillsonburg, ON","text":"The resurfacing option saved me thousands. Looks completely brand new — you''d never know it was the same concrete underneath. Professional crew, clean job site, done in a day.","rating":5},{"author":"Emily R.","location":"Tillsonburg, ON","text":"We had a stamped walkway with a decorative border installed and couldn''t be happier. The pattern looks exactly like natural stone and the communication was excellent.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'kitchener'),
  (select id from sea_categories where slug = 'concrete-sealing'),
  'TriCity Concrete Sealing', 'tricity-concrete-sealing-2026', 'Protect and beautify your concrete — guaranteed.', 'TriCity Concrete Sealing is the Waterloo Region''s leading professional concrete sealing company, protecting driveways, patios, stamped surfaces, exposed aggregate, walkways, and commercial floors with premium UV-resistant sealers across Kitchener, Waterloo, Cambridge, and beyond. With 500+ completed projects and 8 years of experience, the team delivers flawless, streak-free results backed by a 5-year workmanship warranty. Their meticulous surface preparation ensures sealers bond properly and last years longer than DIY alternatives.',
  '(519) 902-0000', 'service@tricityconcretesealing.ca', 'https://tricityconcretesealing.ca',
  '/images/winners/tricity-concrete-sealing-2026/photo-1.jpg', '/images/winners/tricity-concrete-sealing-2026/logo.png', ARRAY['/images/winners/tricity-concrete-sealing-2026/photo-2.jpg','/images/winners/tricity-concrete-sealing-2026/photo-3.jpg']::text[],
  ARRAY['Driveway Sealing','Patio Sealing','Stamped Concrete Sealing','Walkway Sealing','Exposed Aggregate Sealing','Commercial Sealing']::text[], ARRAY['Kitchener, ON']::text[], '[{"author":"James T.","location":"Kitchener, ON","text":"TriCity sealed our driveway last spring and it still looks brand new. Zero staining and it survived a brutal winter without a single crack. Worth it.","rating":5},{"author":"Karen M.","location":"Waterloo, ON","text":"The crew was on time, professional, and the stamped concrete on our patio looks incredible now. The colour really popped after sealing. Highly recommend!","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'kitchener'),
  (select id from sea_categories where slug = 'kitchen-remodeling'),
  'Ready Kitchens', 'ready-kitchens-2026', 'Complete White Shaker kitchens — assembled and ready.', 'Ready Kitchens offers pre-configured White Shaker kitchen cabinet packages that are fully assembled and ready for same-week pickup at their Belmont, Ontario warehouse. Shoppers choose from galley, L-shape, U-shape, and island layouts, each sized to fit standard kitchen wall dimensions. Orders are confirmed and quoted before payment, making it easy for homeowners and renovators across the Waterloo Region to get a complete kitchen without the typical lead time.',
  '(519) 878-6735', 'service@masterdecker.com', 'https://readykitchens.ca',
  null, null, '{}',
  ARRAY['Galley Kitchen Packages','L-Shape Kitchen Packages','U-Shape Kitchen Packages','Island Kitchen Packages','Pre-Assembled Cabinet Kits','Warehouse Pickup']::text[], ARRAY['Kitchener, ON']::text[], '[]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'kitchener'),
  (select id from sea_categories where slug = 'deck-fence-staining'),
  'Restore My Deck', 'restore-my-deck-2026', 'Restore your wood without replacement.', 'Restore My Deck is the Kitchener-Waterloo region''s premier wood restoration company, specializing in deck staining, sanding, cleaning, sealing, power washing, and full deck and fence rebuilding across the Waterloo Region, Guelph, Hamilton, and Stratford. The company''s philosophy — restore rather than replace — saves homeowners thousands by reviving weathered, greyed wood to like-new condition through meticulous surface preparation and premium product selection.',
  '(226) 476-2055', 'service@restoremydeck.ca', 'https://restoremydeck.ca',
  '/images/winners/restore-my-deck-2026/photo-1.jpg', '/images/winners/restore-my-deck-2026/logo.png', ARRAY['/images/winners/restore-my-deck-2026/photo-2.jpg','/images/winners/restore-my-deck-2026/photo-3.jpg']::text[],
  ARRAY['Deck Restoration','Deck Staining','Deck Cleaning','Power Washing','Deck Sealing','Deck Sanding','Deck Rebuilding','Fence Staining']::text[], ARRAY['Kitchener, ON']::text[], '[]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'kitchener'),
  (select id from sea_categories where slug = 'holiday-christmas-lighting'),
  'Classic Christmas Lighting', 'classic-christmas-lighting-2026', 'Professional Christmas light installation in Kitchener-Waterloo.', 'Classic Christmas Lighting brings 15 years of family-owned expertise to Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Woodstock, and Stratford, establishing itself as the region''s most experienced holiday lighting company. Their full-service offering — custom residential displays, commercial storefront lighting, professional tree wrapping, BIA and municipal rental programs, and complete wreath and garland installation — is delivered with care for the property and a spotless record of on-time, damage-free service.',
  '(226) 476-2038', 'contact@classicchristmaslighting.ca', 'https://classicchristmaslighting.ca',
  '/images/winners/classic-christmas-lighting-2026/photo-1.jpg', '/images/winners/classic-christmas-lighting-2026/logo.png', ARRAY['/images/winners/classic-christmas-lighting-2026/photo-2.jpg','/images/winners/classic-christmas-lighting-2026/photo-3.webp']::text[],
  ARRAY['Christmas Lighting Installation','Residential Lighting','Commercial Lighting','Tree Lighting','Christmas Light Rental','Decoration Services']::text[], ARRAY['Kitchener, ON']::text[], '[{"author":"Jennifer M.","location":"Kitchener, ON","text":"Classic Christmas Lighting transformed our home into something straight out of a holiday movie. Ben and his team were professional, fast, and the result was stunning. Our neighbours keep asking who did it!","rating":5},{"author":"David T.","location":"Waterloo, ON","text":"We''ve used Classic for two years now and will never go back to doing it ourselves. The lights look a thousand times better than what we managed. Worth every penny.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'windsor'),
  (select id from sea_categories where slug = 'permanent-outdoor-lighting'),
  'We Install Govee Lights', 'we-install-govee-lights-2026', 'Permanent smart LED lighting for Ontario homes & businesses.', 'We Install Govee Lights is Southwestern Ontario''s specialist for professional Govee permanent outdoor LED installations, bringing the brand''s Elite and Pro product lines to residential and commercial properties across the region. Every system is app-controlled, Alexa and Google Assistant compatible, and rated for Canadian winters with CSA-approved weatherproof hardware — all colour-matched to the client''s fascia for a clean, invisible daytime profile. Single-day installs and a 5-year parts warranty have earned an enthusiastic five-star following.',
  null, 'info@weinstallgoveelights.ca', 'https://weinstallgoveelights.ca',
  '/images/winners/we-install-govee-lights-2026/photo-1.jpg', '/images/winners/we-install-govee-lights-2026/logo.jpeg', ARRAY['/images/winners/we-install-govee-lights-2026/photo-2.webp','/images/winners/we-install-govee-lights-2026/photo-3.jpg']::text[],
  ARRAY['Permanent Govee Outdoor Lighting','Govee Elite & Pro Installation','Commercial Property Lighting']::text[], ARRAY['Windsor, ON']::text[], '[{"author":"Melissa D.","location":"London, ON","text":"The team made our home look absolutely stunning. The lights are perfectly placed and I can control everything from my phone. We''ve already had three neighbours ask who did it!","rating":5},{"author":"Ryan T.","location":"Kitchener, ON","text":"After struggling with traditional Christmas lights every year, switching to permanent Govee lights was the best decision we made. One install and now we change colours with our voice.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'toronto'),
  (select id from sea_categories where slug = 'deck-fence-staining'),
  'Toronto Deck Stainers', 'toronto-deck-stainers-2026', 'The GTA''s deck restoration experts since 2008.', 'Toronto Deck Stainers has been the Greater Toronto Area''s most trusted deck staining, sealing, and restoration company since 2008, completing over 1,500 projects across Toronto, Richmond Hill, Vaughan, Markham, Mississauga, and Oakville. The company''s philosophy of honest assessment — recommending the correct level of preparation rather than shortcuts — has earned a perfect 5-star reputation. Their premium, low-VOC penetrating stains, engineered for Canadian freeze-thaw cycles, deliver rich colour and lasting protection that outperforms budget alternatives by years.',
  '(647) 478-7379', 'sales@torontodeckstainers.ca', 'https://torontodeckstainers.ca',
  '/images/winners/toronto-deck-stainers-2026/photo-1.webp', '/images/winners/toronto-deck-stainers-2026/logo.png', ARRAY['/images/winners/toronto-deck-stainers-2026/photo-2.webp','/images/winners/toronto-deck-stainers-2026/photo-3.webp']::text[],
  ARRAY['Deck Staining','Deck Sealing','Deck Refinishing','Deck Restoration','Fence Staining','Power Washing']::text[], ARRAY['Toronto, ON']::text[], '[{"author":"Sarah M.","location":"Richmond Hill, ON","text":"Our deck was grey and peeling after just three years. They did a full assessment, and now it looks better than when it was first built. The prep work was thorough — you could tell this wasn''t a rush job.","rating":5},{"author":"James K.","location":"Vaughan, ON","text":"Got three quotes. Toronto Deck Stainers was the only one who told me the truth — that my deck needed a full sand-down before staining. They were right. The result is stunning.","rating":5}]'::jsonb,
  2008, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'toronto'),
  (select id from sea_categories where slug = 'kitchen-remodeling'),
  'K&M Kitchen Renovations', 'km-kitchen-renovations-2026', 'Transforming kitchens across Southern Ontario.', 'K&M Kitchen Renovations delivers expert kitchen renovations, bathroom remodels, and basement finishing across the GTA and Southwestern Ontario, including Toronto, Hamilton, London, and Woodstock. With over 10 years of combined experience, the team completes most kitchen projects in as little as two weeks. Their work spans full kitchen overhauls with White Shaker cabinet installation through to basement kitchens and secondary bathrooms.',
  '(519) 914-3405', 'service@kmkitchenrenovations.ca', 'https://kmkitchenrenovations.ca',
  '/images/winners/km-kitchen-renovations-2026/photo-1.jpg', '/images/winners/km-kitchen-renovations-2026/logo.svg', ARRAY['/images/winners/km-kitchen-renovations-2026/photo-2.jpg','/images/winners/km-kitchen-renovations-2026/photo-3.jpg']::text[],
  ARRAY['Kitchen Renovations','Kitchen Remodels','Bathroom Remodels','White Shaker Cabinet Installation','Custom Kitchen Cabinets','Basement Finishing','Basement Kitchens','Basement Bathrooms']::text[], ARRAY['Toronto, ON']::text[], '[{"author":"Jennifer M.","location":"Toronto, ON","text":"They completely transformed our outdated 1990s kitchen. The white shaker cabinets look incredible and they finished ahead of schedule. I''ve already recommended them to three neighbours.","rating":5},{"author":"David & Sarah K.","location":"Hamilton, ON","text":"From first quote to final reveal, the experience was seamless. Our new kitchen increased our home''s value significantly. Couldn''t be happier with the craftsmanship.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'london'),
  (select id from sea_categories where slug = 'basement-finishing'),
  'Legal Basements London', 'legal-basements-london-2026', 'Make your basement legal. Add value. Generate income.', 'Legal Basements London is London, Ontario''s trusted specialist in legal basement apartment conversions, basement underpinning, waterproofing, egress windows, and full basement renovations, backed by 15 years of experience. The team handles every step from permit applications and 3D design renderings through to final inspections, ensuring full Ontario Building Code compliance. Their fixed-price model and two-year workmanship warranty make basement conversion projects predictable and stress-free across London, St. Thomas, and Woodstock.',
  '(519) 266-6796', 'service@masterdecker.com', 'https://getlegalbasements.ca',
  '/images/winners/legal-basements-london-2026/photo-1.jpg', '/images/winners/legal-basements-london-2026/logo.svg', ARRAY['/images/winners/legal-basements-london-2026/photo-2.jpg','/images/winners/legal-basements-london-2026/photo-3.jpg']::text[],
  ARRAY['Legal Basement Apartments','Basement Underpinning','Basement Waterproofing','Basement Finishing & Renovation','Egress Windows','Basement Bathrooms','Foundation Repair']::text[], ARRAY['London, ON']::text[], '[{"author":"Sarah M.","location":"London, ON","text":"They handled everything from permits to final inspection. Our legal basement apartment is now rented and generating great income. The whole process was smooth and professional.","rating":5},{"author":"James & Karen P.","location":"London, ON","text":"Our 1950s bungalow had a 6-foot basement ceiling. After underpinning, we have a full 8-foot ceiling and a beautiful legal apartment. Worth every penny.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'toronto'),
  (select id from sea_categories where slug = 'holiday-christmas-lighting'),
  'GTA Christmas Lighting', 'gta-christmas-lighting-2026', 'Professional Christmas light installation across the GTA.', 'GTA Christmas Lighting is the Greater Toronto Area''s go-to holiday lighting specialist, serving Toronto, Mississauga, Brampton, Vaughan, Markham, Oakville, and Burlington with custom seasonal and permanent LED installations. Offering a full-service model — from free design consultation and single-day installation to mid-season maintenance, January takedown, and secure storage — the company accommodates both rental and purchase programs, making professional displays accessible across a broad market.',
  '(289) 475-0433', 'info@gtachristmaslighting.ca', 'https://gtachristmaslighting.ca',
  '/images/winners/gta-christmas-lighting-2026/photo-1.jpg', '/images/winners/gta-christmas-lighting-2026/logo.png', ARRAY['/images/winners/gta-christmas-lighting-2026/photo-2.jpg','/images/winners/gta-christmas-lighting-2026/photo-3.jpg']::text[],
  ARRAY['Christmas Light Installation','Holiday Lighting','Permanent Lighting','Tree Lighting','Interior Decorations','Custom Displays','Commercial Installation']::text[], ARRAY['Toronto, ON']::text[], '[{"author":"Fernando Alzamora","location":"Richmond Hill, ON","text":"Working with GTA Christmas Lighting was super easy. They handle everything from installation to removal, making my holiday season stress-free. Totally worth it!","rating":5},{"author":"Barbara Goller","location":"Oakville, ON","text":"A joy to work with. They designed, installed, and removed the lights with no hassle. It made my Christmas decorations so simple and enjoyable.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'toronto'),
  (select id from sea_categories where slug = 'permanent-outdoor-lighting'),
  'Ontario Light Shows', 'ontario-light-shows-2026', 'Synchronized to music. Engineered to last.', 'Ontario Light Shows is the province''s premier designer of music-synchronized addressable LED experiences, delivering everything from roofline accent lighting to full-scale parade and festival productions with tens of thousands of individually controlled pixels. Operating with IP67/IP68-rated hardware and professional DMX/Art-Net controllers, their installations have powered 65+ live events and lit more than 1.2 million pixels across Ontario. From Chatham-Kent to Toronto, they transform ordinary buildings into unforgettable light spectacles.',
  '(519) 878-6735', 'service@masterdecker.com', 'https://ontariolightshows.ca',
  null, null, '{}',
  ARRAY['Experiential Lighting','Architectural Accenting','RGB Architectural Lighting','Immersive Light Displays','Permanent Holiday Lighting']::text[], ARRAY['Toronto, ON']::text[], '[{"author":"Blenheim Rotary Club","location":"Blenheim, ON","text":"Ontario Light Shows didn''t just hang lights — they choreographed our whole parade. The crowd reaction was unbelievable. It changed what a small-town Christmas parade can be.","rating":5},{"author":"Daniel R.","location":"Toronto, ON","text":"The roofline install is genuinely invisible from the curb during the day. At night I run warm white most of the year, then unlock the full RGB on holidays. Worth every dollar.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'mississauga'),
  (select id from sea_categories where slug = 'holiday-christmas-lighting'),
  'We Install Christmas Lights', 'we-install-christmas-lights-2026', 'Easy, custom holiday lighting in as little as 1 day.', 'We Install Christmas Lights is South-Western Ontario''s highest-volume holiday lighting company, with over 740 homes decorated, 921 residential trees lit, and a 96% client return rate that reflects their all-inclusive, stress-free service model. Operating with crews reaching Oakville, Hamilton, Brampton, and 18 other communities, the team completes most installs in a single day and handles every step from custom roofline design through mid-season maintenance to January takedown and secure storage. A 5.0-star rating across 80+ Google reviews makes them one of Ontario''s most trusted holiday lighting brands.',
  '(519) 266-6796', 'service@weinstallchristmaslights.ca', 'https://weinstallchristmaslights.ca',
  '/images/winners/we-install-christmas-lights-2026/photo-1.jpg', '/images/winners/we-install-christmas-lights-2026/logo.png', ARRAY['/images/winners/we-install-christmas-lights-2026/photo-2.jpg','/images/winners/we-install-christmas-lights-2026/photo-3.jpg']::text[],
  ARRAY['Residential Installation','Christmas Decorators','Full-Season Holiday Service','Light Takedown','Year-Long Storage','Govee Light Installation','Commercial Installation']::text[], ARRAY['Mississauga, ON']::text[], '[{"author":"John M.","location":"St. Thomas, ON","text":"Absolutely delighted with the service. They took the hassle out of our holiday preparations with professional, timely installation and takedown. Kyle''s team''s attention to detail was impressive.","rating":5},{"author":"Jonathan & Diane","location":"London, ON","text":"Matt and Kyle transformed our home into a winter wonderland with their expert touch. The team''s efficiency in both installation and takedown was commendable. An absolute pleasure.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'burlington'),
  (select id from sea_categories where slug = 'permanent-outdoor-lighting'),
  'Halton Glow Lighting', 'halton-glow-lighting-2026', 'Permanent outdoor LED lighting for Burlington & Oakville.', 'Halton Glow Lighting brings premium app-controlled permanent LED systems to Burlington, Oakville, and surrounding Halton communities, with installations engineered to withstand Canadian winters and backed by a lifetime warranty. Their colour-matched roofline and landscape lighting eliminates seasonal ladder work while delivering year-round curb appeal for every holiday and occasion. Recognized for flawless workmanship and attentive customer service, Halton Glow has earned a perfect 5.0 Google rating across the region.',
  '(519) 266-6796', null, 'https://haltonglowlighting.ca',
  '/images/winners/halton-glow-lighting-2026/photo-1.jpg', '/images/winners/halton-glow-lighting-2026/logo.png', ARRAY['/images/winners/halton-glow-lighting-2026/photo-2.jpg','/images/winners/halton-glow-lighting-2026/photo-3.jpg']::text[],
  ARRAY['Roofline Lighting','Landscape Feature Lighting','Pathway & Driveway Lighting','Holiday Displays','Permanent LED Installation','App-Controlled Colour Lighting']::text[], ARRAY['Burlington, ON']::text[], '[{"author":"Sarah M.","location":"Burlington, ON","text":"The installation was flawless and the lights look absolutely stunning. We can now enjoy beautiful lighting for every holiday without the hassle of putting up and taking down decorations.","rating":5},{"author":"Jennifer L.","location":"Burlington, ON","text":"Best investment we''ve made for our home! The app control is so convenient and the lights have held up perfectly through two Canadian winters.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'oakville'),
  (select id from sea_categories where slug = 'permanent-outdoor-lighting'),
  'Celebrate Lighting', 'celebrate-lighting-2026', 'Permanent outdoor LED lighting across Southern Ontario.', 'Celebrate Lighting serves homeowners and businesses across Southern Ontario with professionally installed permanent LED track lighting that is colour-matched to the building''s soffit and fascia. Every system is WiFi-connected, app-controlled, and backed by a 25-year warranty, giving clients a once-installed solution for every season and holiday. The company''s meticulous attention to detail and transparent quoting process have made them a trusted name across the region.',
  '(519) 266-6796', 'contact@celebratelighting.ca', 'https://celebratelighting.ca',
  '/images/winners/celebrate-lighting-2026/photo-1.jpg', '/images/winners/celebrate-lighting-2026/logo.png', ARRAY['/images/winners/celebrate-lighting-2026/photo-2.jpg','/images/winners/celebrate-lighting-2026/photo-3.jpg']::text[],
  ARRAY['New Installation','Repair Service','Free Consultation','Annual Maintenance','Existing Light Replacement']::text[], ARRAY['Oakville, ON']::text[], '[{"author":"Sarah M.","location":"Tillsonburg, ON","text":"The installation was flawless and the lights look absolutely stunning. We can now enjoy beautiful lighting for every holiday without the hassle of decorations.","rating":5},{"author":"Michael R.","location":"Brantford, ON","text":"Professional service from start to finish. The team was punctual, respectful, and the quality of work exceeded our expectations. Highly recommend!","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'hamilton'),
  (select id from sea_categories where slug = 'deck-fence-staining'),
  'Deck Medic', 'deck-medic-2026', 'Professional deck restoration & staining experts.', 'Deck Medic is the GTA and Southern Ontario''s trusted deck restoration and staining company, delivering precision wood preservation across Hamilton, Burlington, Oakville, Mississauga, and Toronto with proprietary Weather-Shield technology built for Canadian freeze-thaw cycles. The company''s four-step process — assessment, deep power washing, mechanical sanding, and premium penetrating stain — produces finishes that resist peeling and last 3-5 years. Their service roster, spanning full structural restoration through fence and pergola staining, makes them the one-call solution for outdoor wood protection.',
  '(519) 266-6796', 'service@deckmedic.ca', 'https://deckmedic.ca',
  '/images/winners/deck-medic-2026/photo-1.png', '/images/winners/deck-medic-2026/logo.png', ARRAY['/images/winners/deck-medic-2026/photo-2.png','/images/winners/deck-medic-2026/photo-3.webp']::text[],
  ARRAY['Deck Staining & Sealing','Full-Service Deck Restoration','Power Washing & Deep Cleaning','Fence Staining & Restoration']::text[], ARRAY['Hamilton, ON']::text[], '[{"author":"Homeowner","location":"Burlington, ON","text":"Deck Medic brought our weathered deck back to life. The sanding and prep work made all the difference — the finish is flawless and has held up beautifully.","rating":5},{"author":"Homeowner","location":"Hamilton, ON","text":"Punctual, tidy, and the results speak for themselves. Our deck looks better than new and the colour is exactly what we wanted.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'hamilton'),
  (select id from sea_categories where slug = 'concrete-finishing'),
  'Hot Tub Pads', 'hot-tub-pads-2026', 'Expert concrete pads for your spa, built to last.', 'Hot Tub Pads is Ontario''s dedicated specialist for hot tub and swim spa foundation installation, delivering custom concrete pads, gravel bases, and swim spa platforms engineered for the province''s demanding freeze-thaw conditions. Every concrete pad is poured at 32 MPa strength with rebar or wire mesh reinforcement on a compacted crushed-gravel sub-base, ensuring a level, stable surface that outlasts the spa above it. Serving Hamilton, London, Kitchener, and Woodstock, the company completes most installations within two days and backs every pad with a 2-year workmanship warranty.',
  '(905) 902-0044', 'sales@hottubpads.ca', 'https://hottubpads.ca',
  '/images/winners/hot-tub-pads-2026/photo-1.jpg', '/images/winners/hot-tub-pads-2026/logo.png', ARRAY['/images/winners/hot-tub-pads-2026/photo-2.webp','/images/winners/hot-tub-pads-2026/photo-3.jpg']::text[],
  ARRAY['Custom Concrete Pads','Swim Spa Pads','Gravel Hot Tub Pads']::text[], ARRAY['Hamilton, ON']::text[], '[{"author":"Homeowner","location":"Hamilton, ON","text":"Perfectly level pad poured in a single day. The crew knew exactly what the spa installer needed and the finish is rock solid. Couldn''t ask for more.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'hamilton'),
  (select id from sea_categories where slug = 'holiday-christmas-lighting'),
  'Festive Holiday Lighting', 'festive-holiday-lighting-2026', 'Professional holiday & permanent lighting for Southern Ontario.', 'Festive Holiday Lighting is Southern Ontario''s fully insured, WSIB-compliant holiday and permanent lighting company, backed by 10+ years of experience and a 5.0-star rating across 47+ verified reviews. Operating out of Hamilton, the team serves homes and businesses across Burlington, Oakville, Mississauga, Brampton, Ancaster, Grimsby, St. Catharines, and Niagara Falls with seasonal Christmas installations as well as year-round app-controlled RGBW permanent LED roofline systems. Their $5M liability coverage, mid-season maintenance, and interior holiday decorating distinguish them as one of the most comprehensive operations in the Hamilton-Niagara corridor.',
  '(289) 426-5764', 'info@festiveholidaylighting.ca', 'https://festiveholidaylighting.ca',
  null, '/images/winners/festive-holiday-lighting-2026/logo.png', '{}',
  ARRAY['Christmas Light Installation','Permanent Holiday Lighting','Residential Lighting','Commercial Lighting','Municipal & BIA Lighting','Tree Lighting','Interior Decorating']::text[], ARRAY['Hamilton, ON']::text[], '[{"author":"Sarah M.","location":"Ancaster, ON","text":"Absolutely stunning! Cameron and his team transformed our home. We had neighbours knocking on our door asking for their number. The whole process was so easy.","rating":5},{"author":"The Rossi Family","location":"Hamilton, ON","text":"This is our third year with Festive and we keep coming back. They always remember our preferences, arrive on time, and the display gets better every year.","rating":5}]'::jsonb,
  null, 'winner', true
);

insert into sea_winners (year, city_id, category_id, business_name, slug, tagline, description, phone, email, website, photo_url, logo_url, gallery, services, service_areas, reviews, established_year, award_tier, is_published) values (
  2026,
  (select id from sea_cities where slug = 'burlington'),
  (select id from sea_categories where slug = 'deck-fence-staining'),
  'Deck Revitalize', 'deck-revitalize-2026', 'Ontario''s expert deck & fence restoration.', 'Deck Revitalize is Southern Ontario''s trusted outdoor wood restoration specialist, offering over 70 years of combined team experience in deck staining, cleaning, sanding, resurfacing, fence staining and painting, and pergola and gazebo treatments. The company''s commitment to deep surface preparation — proper cleaning, sanding, and drying before any product is applied — ensures finishes adhere correctly and deliver lasting colour and protection across Burlington, Hamilton, Oakville, and Mississauga. Their wide service menu and colour-matching expertise make them the natural choice for a consistent, beautiful finish.',
  '(519) 914-1908', 'service@deckrevitalize.ca', 'https://deckrevitalize.ca',
  '/images/winners/deck-revitalize-2026/photo-1.jpg', '/images/winners/deck-revitalize-2026/logo.png', ARRAY['/images/winners/deck-revitalize-2026/photo-2.jpg','/images/winners/deck-revitalize-2026/photo-3.jpg']::text[],
  ARRAY['Deck Staining','Deck Cleaning & Power Washing','Deck Sanding','Deck Resurfacing','Fence Staining','Fence Painting','Pergola & Gazebo Staining']::text[], ARRAY['Burlington, ON']::text[], '[{"author":"Jordan Ammerall","location":"Burlington, ON","text":"Deck Revitalize transformed our dilapidated deck into the highlight of our home! Their attention to detail and professionalism were unmatched.","rating":5},{"author":"Sarah M.","location":"Burlington, ON","text":"Absolutely thrilled with the results. Our 15-year-old deck looks brand new. They were punctual, clean, and the finish is gorgeous.","rating":5}]'::jsonb,
  null, 'winner', true
);

select count(*) as inserted from sea_winners where year = 2026;