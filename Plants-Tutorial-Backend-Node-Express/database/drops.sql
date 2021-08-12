--Functions and Store Procedures
drop function if exists plt_tut.sp_lnk_plant_records_get();
drop function if exists plt_tut.sp_lnk_plant_records_insert(p_name varchar, p_valuation int, p_name_species varchar, p_id_habitat int);
drop function if exists plt_tut.sp_ms_plant_habitats_get();
drop function if exists plt_tut.sp_lnk_plant_records_verify_plant(p_id_plant int);

--Views
drop view if exists plt_tut.v_lnk_plant_records_info;

--Tables
drop table if exists plt_tut.lnk_plant_records;
drop table if exists plt_tut.ms_plant_habitats;
drop table if exists plt_tut.ms_plant_species;

--Trigger Functions
drop function if exists plt_tut.tf_before_update_lnk_plant_records();
