# Catastro Research Summary

Date: 2026-04-22

## Recommended approach

The best approach is a hybrid one:

- Use `.CAT` as the authoritative bulk source for apartment-level alphanumeric cadastral data.
- Use INSPIRE `AD/BU/CP` feeds for geometry and spatial joins.
- Use the public Catastro JSON services for search/autocomplete and on-demand refresh.

Building only a `.CAT` parser would give us addresses and inmueble metadata, but not the full geometry layer. Using WMS or per-request services as the bulk importer would be the wrong tool.

## Why `.CAT` matters

- `.CAT` is the official bulk source for municipal non-protected inmueble data.
- The current CAT spec PDF is revised `2022-11-16`.
- The CAT user manual was updated `2023-12-28`.
- The file is fixed-width text with `1000`-character records.

For Realista, the key record types are:

- `11`: finca/parcela
- `13`: unidad constructiva
- `14`: construccion
- `15`: inmueble
- `16`: reparto
- `17`: cultivos

Record `15` is the core one for apartment ingestion. It carries:

- `20`-char cadastral reference
- street code, type, and name
- street number
- block, staircase, floor, door
- postal code and district
- year/antiquity
- use group
- area
- ownership coefficient

Record `11` adds parcel surface plus `X/Y/SRS`, so `.CAT` includes some coordinates, but not the full parcel/building geometry.

## Download constraints

- Bulk `.CAT` download is authenticated.
- The official SEC flow requires certificate or `Cl@ve` plus license acceptance.

That means we should treat `.CAT` download as a manual or semi-manual ingestion step unless we later qualify for a more formal registered-user integration.

If we need unattended public-only sync, INSPIRE `ATOM/WFS` is easier to automate, but it is not a full replacement for `.CAT` at inmueble detail.

## Geometry and spatial data

INSPIRE is the right spatial companion:

- `AD` = addresses
- `BU` = buildings
- `CP` = cadastral parcels

Official behavior:

- `WFS` is continuously updated but limited by bbox and feature counts.
- `ATOM` gives full municipal snapshots and is updated twice a year.

This is the clean way to store parcel/building geometries and richer geo layers.

Do not use Catastro `WMS` for ingestion. Catastro explicitly says not to perform mass cartography downloads via successive WMS requests.

## Live lookup path

The public lookup path is viable for the app UX.

Verified on `2026-04-22`:

- `ObtenerProvincias` returns province JSON.
- `Consulta_DNPLOC` returns JSON for lookup by address.
- `Consulta_DNPRC` returns JSON for lookup by cadastral reference.

Those responses include:

- cadastral reference
- address
- use
- surface
- participation coefficient
- age
- construction list

Important implementation detail:

- The real JSON route names are `ObtenerProvincias`, `ObtenerMunicipios`, `ObtenerCallejero`, and `ObtenerNumerero`.
- `Consulta_DNPLOC` expects `Sigla` and `Calle` separately, plus optional `Bloque`, `Escalera`, `Planta`, and `Puerta`.

## Implications for this repo

The current model is too lossy for direct Catastro ingestion:

- `backend/src/main/java/com/realista/realista/entities/Apartment.java`
- `backend/src/main/java/com/realista/realista/repositories/ApartmentRepository.java`
- `backend/src/main/java/com/realista/realista/Controller.java`
- `frontend/src/app/buscar-piso/SearchAddressForm.tsx`

Right now apartments are keyed by free-text province/municipality/street/number/floor/door. I would not import `.CAT` straight into that table.

Instead:

- add separate cadastral tables keyed by `refcat14` parcel and `refcat20` inmueble
- link the reviewable `Apartment` entity to the authoritative cadastral unit

## Suggested implementation order

1. Add `cadastral_parcels`, `cadastral_properties`, and `cadastral_constructions`.
2. Build a streaming `.CAT` importer for record types `11`, `14`, and `15` first, with raw-line retention and idempotent upserts by cadastral reference.
3. Add INSPIRE `CP/AD/BU` ingestion for geometry and standardized address/building layers.
4. Replace the free-text search flow with Catastro-backed `provincia -> municipio -> callejero -> numero -> inmueble` lookup.

## Sources

- https://www.catastro.hacienda.gob.es/ayuda/ayuda_descarga_cat.htm
- https://www.catastro.hacienda.gob.es/documentos/formatos_intercambio/catastro_fin_cat_2006.pdf
- https://www.catastro.hacienda.gob.es/ayuda/manual_descargas_cat.pdf
- https://www.catastro.hacienda.gob.es/documentos/preguntas_frecuentes_formato_CAT.pdf
- https://www.catastro.hacienda.gob.es/ws/Webservices_Libres.pdf
- https://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero/COVCCallejero.svc/json/help
- https://www.catastro.hacienda.gob.es/webinspire/index.html
- https://www.catastro.hacienda.gob.es/webinspire/documentos/inspire-ad-WFS.pdf
- https://www.catastro.hacienda.gob.es/webinspire/documentos/inspire-bu-wfs.pdf
- https://www.catastro.hacienda.gob.es/webinspire/documentos/inspire-cp-WFS.pdf
- https://www.catastro.hacienda.gob.es/es-ES/wms.html
