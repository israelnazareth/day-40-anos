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
'Day Nazareth - 40 anos',
'Você está convidado(a)',
'Uma celebração especial para comemorar 40 anos de história e tradição.',
'2026-10-02T20:00:00-03:00',
'Espaço Zarifi',
'Rua das Margaridas, 335 — Vila Valqueire, Rio de Janeiro',
'https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Zarifi+Rua+das+Margaridas+335+Vila+Valqueire+Rio+de+Janeiro',
'https://www.google.com/maps?q=Espa%C3%A7o%20Zarifi%2C%20Rua%20das%20Margaridas%20335%2C%20Vila%20Valqueire%2C%20Rio%20de%20Janeiro&output=embed',
'+55 21 98708-6134',
'Day Nazareth',
'+55 21 98708-6134'
);

INSERT INTO gifts (
    event_id,
    name,
    suggested_value
)
SELECT
    id,
    'Air Fryer',
    450.00
FROM events
WHERE slug = 'day-40-anos';