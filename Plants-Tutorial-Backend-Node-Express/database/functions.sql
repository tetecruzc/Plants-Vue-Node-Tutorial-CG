--Functions and Stored Procedures
create or replace function plt_tut.sp_lnk_plant_records_insert(
    p_name                      varchar(30),
    p_valuation                 int,
    p_name_species              varchar(50),
    p_id_habitat                int
)
returns void
language plpgsql
as $$
declare
    v_id_species                int;
begin
    select id_species into v_id_species
    from plt_tut.ms_plant_species
    where name_species = p_name_species;
    if (v_id_species is null) then
        insert into plt_tut.ms_plant_species
            (name_species)
        values
            (p_name_species)
        returning id_species into v_id_species;
    end if;
    insert into plt_tut.lnk_plant_records
        (name_plant, plant_valuation, id_species, id_habitat)
    values
        (p_name, p_valuation, v_id_species, p_id_habitat);
end;
$$;

create or replace function plt_tut.sp_lnk_plant_records_get()
returns table (
    "idPlant"                   int,
    name                        varchar(30),
    verified                    boolean,
    species                     varchar(50),
    habitat                     varchar(30),
    valuation                   int
)
language plpgsql
as $$
begin
    return query
        select
            p.id_plant::int, p.name_plant, p.plant_verified,
            p.name_species, p.name_habitat, p.plant_valuation
        from plt_tut.v_lnk_plant_records_info p;
end;
$$;

create or replace function plt_tut.sp_ms_plant_habitats_get()
returns table (
    "idHabitat"                 int,
    name                        varchar(30)
)
language plpgsql
as $$
begin
    return query
        select
            h.id_habitat::int, h.name_habitat
        from plt_tut.ms_plant_habitats h;
end;
$$;

create or replace function plt_tut.sp_lnk_plant_records_verify_plant(
    p_id_plant                  int
)
returns void
language plpgsql
as $$
declare
    v_name_plant                varchar(30);
    v_plant_verified            boolean;
    v_name_species              varchar(50);
    v_name_habitat              varchar(20);
    v_valuation                 int;
    v_json_resp                 json;
begin
    update plt_tut.lnk_plant_records
    set plant_verified = true
    where id_plant = p_id_plant;
    select
        p.name_plant, p.plant_verified,
        p.name_species, p.name_habitat, p.plant_valuation
    into
        v_name_plant, v_plant_verified,
        v_name_species, v_name_habitat, v_valuation
    from plt_tut.v_lnk_plant_records_info p
    where id_plant = p_id_plant;
    v_json_resp := json_build_object(
        'idPlant', p_id_plant,
        'name', v_name_plant,
        'verified', v_plant_verified,
        'species', v_name_species,
        'habitat', v_name_habitat,
        'valuation', v_valuation
    );
    perform pg_notify('plant_verify', v_json_resp::text);
    return;
end
$$;

create or replace function plt_tut.sp_lnk_plant_records_update_valoration(
    p_id_plant                  int,
    p_valoration                int
)
returns void
language plpgsql
as $$
declare
    v_name_plant                varchar(30);
    v_plant_verified            boolean;
    v_name_species              varchar(50);
    v_name_habitat              varchar(20);
    v_valuation                 int;
    v_json_resp                 json;
begin
    if (p_valoration < 1 or p_valoration > 5) then
        raise exception 'Valuation must be between 1 and 5';
    end if;
    update plt_tut.lnk_plant_records
    set plant_valuation = p_valoration
    where id_plant = p_id_plant;
    select
        p.name_plant, p.plant_verified,
        p.name_species, p.name_habitat, p.plant_valuation
    into
        v_name_plant, v_plant_verified,
        v_name_species, v_name_habitat, v_valuation
    from plt_tut.v_lnk_plant_records_info p
    where id_plant = p_id_plant;
    v_json_resp := json_build_object(
        'idPlant', p_id_plant,
        'name', v_name_plant,
        'verified', v_plant_verified,
        'species', v_name_species,
        'habitat', v_name_habitat,
        'valuation', v_valuation
    );
    perform pg_notify('plant_verify', v_json_resp::text);
    return;
end
$$;
