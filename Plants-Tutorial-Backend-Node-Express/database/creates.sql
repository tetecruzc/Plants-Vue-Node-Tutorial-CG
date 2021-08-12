--Schemas
create schema if not exists plt_tut;

--Extensions
create extension if not exists "uuid-ossp" schema plt_tut;

--Timezone
set TIMEZONE = 'America/Caracas';

--Tables
create table plt_tut.ms_plant_species (
    id_species                  serial          primary key,
    name_species                varchar(50)     not null
);

create table plt_tut.ms_plant_habitats (
    id_habitat                  serial          primary key,
    name_habitat                varchar(20)     not null
);

create table plt_tut.lnk_plant_records (
    id_plant                    bigserial,
    uuid_plant                  uuid            default public.uuid_generate_v4(),
    name_plant                  varchar(30)     not null,
    plant_valuation             int             not null
        check ( plant_valuation >= 1 and plant_valuation <= 5 ),
    plant_verified              boolean         not null default false,
    creation_date               timestamptz     not null default now(),
    modification_date           timestamptz     not null default now(),
    id_species                  int             not null
        references plt_tut.ms_plant_species (id_species),
    id_habitat                  int             not null
        references plt_tut.ms_plant_habitats (id_habitat),
    primary key (id_plant, uuid_plant)
);

--Views
create or replace view plt_tut.v_lnk_plant_records_info as (
    select
        pr.id_plant, pr.name_plant, pr.plant_verified,
        ps.name_species, ph.name_habitat, pr.plant_valuation
    from plt_tut.lnk_plant_records pr
    inner join plt_tut.ms_plant_species ps on pr.id_species = ps.id_species
    inner join plt_tut.ms_plant_habitats ph on pr.id_habitat = ph.id_habitat
);
