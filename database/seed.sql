INSERT INTO admins (
    name,
    email,
    password_hash
)
VALUES (
    'Administrador',
    'admin@admin.com',
    '$2a$12$c1vPlRx6/dkpzMCAJ3L9zOljS.3CBhidkRneG6EZ2wla.V9fRf0ye'
);

------------------------------------------------------------

INSERT INTO events (
    slug,
    title,
    subtitle,
    description,
    event_date,
    venue_name,
    address,
    maps_url,
    maps_embed,
    pix_key,
    pix_name,
    whatsapp
)

VALUES (
    'day-40-anos',
    'Day Muniz - 40 anos',
    'Você está convidado(a)',
    'Uma celebração especial para comemorar 40 anos de história e tradição.',
    '2026-10-02T20:00:00-03:00',
    'Espaço Zarifi',
    'Rua das Margaridas, 335 — Vila Valqueire, Rio de Janeiro',
    'https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Zarifi+Rua+das+Margaridas+335+Vila+Valqueire+Rio+de+Janeiro',
    'https://www.google.com/maps?q=Espa%C3%A7o%20Zarifi%2C%20Rua%20das%20Margaridas%20335%2C%20Vila%20Valqueire%2C%20Rio%20de%20Janeiro&output=embed',
    '+55 21 98708-6134',
    'Day Muniz',
    '+55 21 98708-6134'
);

------------------------------------------------------------

INSERT INTO gifts (
    event_id,
    name,
    description,
    image,
    price
)
SELECT
    e.id,
    g.name,
    g.description,
    g.image,
    g.value
FROM events e
CROSS JOIN (
    VALUES
        ('Air Fryer', 'Air Fryer 4L', '/images/gifts/airfryer.jpg', 450.00),
        ('Jogo de Panelas', 'Jogo com 5 peças', '/images/gifts/panelas.jpg', 600.00),
        ('Cafeteira', 'Cafeteira elétrica', '/images/gifts/cafeteira.jpg', 320.00),
        ('Vale Presente', 'Contribuição livre', '/images/gifts/presente.jpg', 100.00)
) AS g(name, description, image, value)
WHERE e.slug = 'day-40-anos';

------------------------------------------------------------

INSERT INTO rsvps (
    event_id,
    name,
    phone,
    companions,
    attendance,
    message
)
SELECT
    id,
    'Israel Nazareth',
    '21988887777',
    1,
    true,
    'Parabéns Day! Estarei presente.'
FROM events
WHERE slug = 'day-40-anos';

INSERT INTO rsvps (
    event_id,
    name,
    phone,
    companions,
    attendance,
    message
)
SELECT
    id,
    'Rachel Oliveira',
    '21977776666',
    0,
    true,
    'Ansiosa pela festa!'
FROM events
WHERE slug = 'day-40-anos';

------------------------------------------------------------

INSERT INTO gift_confirmations (
    event_id,
    gift_id,
    name,
    phone,
    paid_value,
    observation
)
SELECT
    e.id,
    g.id,
    'Israel Nazareth',
    '21988887777',
    450.00,
    'Comprovante enviado pelo WhatsApp.'
FROM events e
JOIN gifts g
ON g.event_id = e.id
WHERE e.slug = 'day-40-anos'
AND g.name = 'Air Fryer';