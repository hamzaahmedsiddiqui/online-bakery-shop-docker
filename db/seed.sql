-- Sample products, loaded once on the first start of an empty database.
-- Images are served by the frontend from /images (frontend/public/images).

INSERT INTO products (name, description, price, calories, protein, category, is_featured, image_url) VALUES
  ('Oat & Flaxseed Lactation Cookies', 'Soft-baked cookies with oats, flaxseed and brewer''s yeast. Made for new mothers.', 8.90, 180, 5, 'Lactation', true,  '/images/lactation-cookies.jpg'),
  ('Chocolate Chip Lactation Bites',  'Small oat bites with dark chocolate chips. A quick snack for busy days.',         7.50, 150, 4, 'Lactation', false, '/images/lactation-cookies.jpg'),
  ('Double Chocolate Protein Brownies','Fudgy brownies with whey protein and cocoa. Less sugar, more protein.',          9.90, 210, 15, 'High Protein', true,  '/images/protein-brownies.jpg'),
  ('Peanut Butter Protein Squares',    'Chewy squares with peanut butter, oats and protein.',                             8.50, 220, 14, 'High Protein', false, '/images/protein-brownies.jpg'),
  ('Classic Egg-Free Butter Cookies',  'Crisp butter cookies made without eggs.',                                         6.90, 140, 2, 'Egg-Free', true,  '/images/egg-free-cookies.jpg'),
  ('Egg-Free Oatmeal Raisin Cookies',  'Oatmeal cookies with raisins and cinnamon, no eggs.',                             6.50, 130, 3, 'Egg-Free', false, '/images/egg-free-cookies.jpg'),
  ('Vegan Banana Bread',               'Moist banana bread with walnuts. 100% plant-based.',                              11.90, 260, 5, 'Vegan', true,  '/images/vegan-banana-bread.jpg'),
  ('Vegan Chocolate Banana Loaf',      'Banana loaf with cocoa and dark chocolate. No dairy, no eggs.',                   12.50, 280, 5, 'Vegan', false, '/images/vegan-banana-bread.jpg');
