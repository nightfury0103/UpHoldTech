CREATE TABLE alerts
(
    id SERIAL PRIMARY KEY,
    timestamp int8,
    time VARCHAR(40),
    diffrate float8,
    currate float8,
    pair VARCHAR(10),
    interval int4,
    pop float4
);