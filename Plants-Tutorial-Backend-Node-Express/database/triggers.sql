--Trigger Functions
create or replace function plt_tut.tf_before_update_lnk_plant_records()
returns trigger
language plpgsql
as $$
begin
    new.modification_date := now();
    return new;
end;
$$;

--Triggers
create trigger t_modification_date_lnk_plant_records
before update on plt_tut.lnk_plant_records
for each row
execute procedure plt_tut.tf_before_update_lnk_plant_records();
